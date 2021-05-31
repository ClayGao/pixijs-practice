const { Application, Container, Text, Graphics } = PIXI; // 解構

const app = new Application({
  view: document.getElementById("main"), // 指定在某個 canvas 元素上
  width: window.innerWidth,
  height: 768,
  antialias: true, // 反鋸齒
  backgroundColor: 0x00cc99,
});

// 圓形

const container = new Container();
app.stage.addChild(container);

const graphics1 = new Graphics();
graphics1.lineStyle(5, 0x000000, 1);
graphics1.drawCircle(0, 0, 50);

container.addChild(graphics1);

container.x = 100;
container.y = 100;

// 處理

const container2 = new Container();
app.stage.addChild(container2);

const graphics2 = new Graphics();
graphics2.lineStyle(5, 0x000000, 1);
graphics2.drawRoundedRect(0, 0, 90, 50, 15);

container2.addChild(graphics2);

container2.x = 200;
container2.y = 200;
