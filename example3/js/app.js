const { Application, Container, Text } = PIXI; // 解構

/**
 * Dat GUI
 */

const datGuiData = function () {
  this.alpha = 1;
  this.containerX = 0;
  this.containerY = 0;
  this.scaleX = 1;
  this.scaleY = 1;
};

const datGuiTools = new datGuiData();
const gui = new dat.GUI();
gui.add(datGuiTools, "alpha", 0, 1);
gui.add(datGuiTools, "containerX", 0, 512);
gui.add(datGuiTools, "containerY", 0, 512);
gui.add(datGuiTools, "scaleX", 0, 10);
gui.add(datGuiTools, "scaleY", 0, 10);

const app = new Application({
  view: document.getElementById("main"), // 指定在某個 canvas 元素上
  width: window.innerWidth,
  height: 768,
  antialias: true, // 反鋸齒
  backgroundColor: 0x00cc99,
});

const container = new Container();

app.stage.addChild(container);

const text = new Text("老背少幹老");

container.addChild(text);

container.x = 100;
container.y = 100;

container.interactive = true;
container.buttonMode = true;

// container.click = () => {
//   container.scale.x -= 0.1;
//   container.scale.y -= 0.1;
// };

app.ticker.add(() => {
  container.x = datGuiTools.containerX;
  container.y = datGuiTools.containerY;
  container.scale.x = datGuiTools.scaleX;
  container.scale.y = datGuiTools.scaleY;
});
