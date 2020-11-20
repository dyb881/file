# ！！已经停止更新，并迁移到 [Seasoning](https://dyb881.github.io/seasoning/common/tools/file-tool)

# file

文件处理工具，获取上传文件，文件转 base64，base64 转文件

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
