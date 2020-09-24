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
export const getFile = (props?: any): Promise<FileList> =>
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
  new Promise((resolve) => {
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
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

/**
 * base64 转 blob
 */
export const base64ToBlob = (base64: string) => {
  const arr = base64.split(',');
  const type = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type });
};

/**
 * blob 转 文件
 */
export const blobToFile = (blob: Blob, fileName: string) => {
  const file: any = blob;
  file.lastModifiedDate = new Date();
  file.name = fileName;
  return file as File;
};

/**
 * base64 转 文件
 */
export const base64ToFile = (base64: string, fileName = 'file') => {
  const blob = base64ToBlob(base64);
  const ext = blob.type.split('/')[1];
  const file = blobToFile(blob, `${fileName}.${ext}`);
  return file;
};
