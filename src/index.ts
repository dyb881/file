// 在body插入一个input[type="file"]用于文件上传使用
let input: HTMLInputElement;

/**
 * 文件类型
 */
export const accepts = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  image: 'image/*',
};

/**
 * 上传文件
 */
export const getFile = (props?: HTMLInputElement['attributes']): Promise<FileList> =>
  new Promise((resolve, reject) => {
    if (!input) {
      input = document.createElement('input');
      window.document.body.appendChild(input);
    }
    Object.assign(input, {
      accept: 'image/*',
      multiple: false,
      ...props,
      onchange: () => resolve(input.files!),
      onerror: reject,
      type: 'file',
      hidden: true,
      value: null,
    });
    input.click();
  });

/**
 * 获取图片对象
 */
export const getImg = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    Object.assign(img, {
      src,
      onload: () => resolve(img),
      onerror: reject,
    });
  });

/**
 * 文件转Base64
 */
export const fileToBase64 = (file: File): Promise<string> =>
  new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

/**
 * Base64转文件
 */
export const base64ToFile = async (base64: string, fileName = 'file') => {
  const data = base64.split(',');
  const type = data[0].slice(5, -7);
  const ext = type.split('/')[1];
  const bstr = atob(data[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${fileName}.${ext}`, {
    type,
  });
};

/**
 * 图片处理配置
 */
interface ICropConfig {
  quality?: number; // 图片质量
  x?: number; // 裁剪起点
  y?: number; // 裁剪起点
  width?: number; // 裁剪尺寸
  height?: number; // 裁剪尺寸
  zoom?: number; // 缩放
}

/**
 * 图片处理
 * 当配置 quality 图片质量，图片将自动转为 jpg 格式
 */
export const pictureProcessing = async (image: File | string, config: number | ICropConfig) => {
  const base64 = image instanceof File ? await fileToBase64(image) : image;
  const img = await getImg(base64);
  if (typeof config === 'number') config = { quality: config };
  const { quality, x = 0, y = 0, width = img.width, height = img.height, zoom = 1 } = config;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, x, y, width, height, 0, 0, (canvas.width = width * zoom), (canvas.height = height * zoom));
  return canvas.toDataURL(quality ? base64.split(',')[0].slice(5, -7) : 'image/jpeg', quality);
};
