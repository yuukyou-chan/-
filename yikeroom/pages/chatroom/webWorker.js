onmessage = function(e){
  const{ imgBase64, quality, myType } = e.data
  // webWorker中不能访问 document 等对象
  let canvas = new OffscreenCanvas(img.width, img.height)
  let img = new Image()
  img.src = imgBase64
  img.onload = () => {
    // 创建 2d 画布
    let ctx = canvas.getContext('2d')
    // 将图片画在画布上
    ctx.drawImage(img, 0, 0, img.width, img.height)
    // 压缩方法
    let newImgBase = canvas.toDataURL(quality / 100, myType)
    postMessage(newImgBase); // 向主线程发送消息
  }
}

// self.addEventListener('message', e => { // 接收到消息
//     console.log(e.data); // Greeting from Main.js，主线程发送的消息
//     const{ imgBase64, quality, myType } = e.data
//     let canvas = document.createElement('canvas')
//     let img = document.createElement('img')
//     img.src = imgBase64
//     img.onload = () => {
//       // 创建 2d 画布
//       let ctx = canvas.getContext('2d')
//       // 将图片画在画布上
//       ctx.drawImage(img, 0, 0, img.width, img.height)
//       // 压缩方法
//       let newImgBase = canvas.toDataURL(quality / 100, myType)
//     self.postMessage(newImgBase); // 向主线程发送消息
//     }
// });
