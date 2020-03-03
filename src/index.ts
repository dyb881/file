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
      document.body.appendChild(input);
    }
    Object.assign(input, {
      accept: accepts.image,
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
 * img 标签转 base64
 */
export const imgToBase64 = (img: HTMLImageElement) =>
  new Promise(resolve => {
    img.onload = () => {
      const { width, height } = img;
      const canvas = document.createElement('canvas');
      Object.assign(canvas, { width, height });
      const ctx = canvas.getContext('2d');
      ctx!.drawImage(img, 0, 0, width, height);
      const dataURL = canvas.toDataURL('image/png');
      resolve(dataURL);
    };
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
  return new File([u8arr], `${fileName}.${ext}`, { type });
};
