const { Application } = PIXI; // 解構

const app = new Application({
  view: document.getElementById("main"), // 指定在某個 canvas 元素上
  width: 1024,
  height: 768,
  antialias: true, // 反鋸齒
  backgroundColor: 0xff0000, // 注意值，原則上就是前面補 0x 就好
});
