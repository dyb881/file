# file

文件处理工具，获取上传文件，文件转 base64，base64 转文件，图片裁剪压缩等

## 获取上传文件

无需创建 input[type="file"] 标签，直接函数异步获取上传文件

```
import { getFile } from '@dyb881/file';

getFile().then(files => {
  files // 上传文件列表 FileList(类数组)
});
```

## 获取图片对象 <img src="">/new Image()

传入 url 或 base64 字符串，返回图片对象

```
import { getImg } from '@dyb881/file';

getImg(url/base64).then(img => {
  img // 图片对象 <img src="">/new Image()
});
```

## 文件 & base64 互转

```
import { fileToBase64, base64ToFile } from '@dyb881/file';

fileToBase64(File).then(base64 => {
  base64
});
base64ToFile(base64).then(file => {
  file // 文件对象 new File()
})
```

## 图片处理

传入图片对象或 base64 进行：图片质量调整，图片缩放，图片裁剪

```
import { pictureProcessing } from '@dyb881/file';

const image = File/base64;

// 快捷调整图片质量为 0.1
pictureProcessing(image, 0.1).then(base64 => {
  base64 // 处理后的图片
});

// 使用参数调整
pictureProcessing(image, {
  quality?: 0.3; // 图片质量调整为 0.3
  x?: number; // 裁剪起点
  y?: number; // 裁剪起点
  width?: number; // 裁剪尺寸
  height?: number; // 裁剪尺寸
  zoom?: 0.8; // 缩放为 80%
}).then(base64 => {
  base64 // 处理后的图片
});
```
