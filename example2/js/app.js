const { Application, Container, Text } = PIXI; // 解構

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

const body = document.querySelector("body");

body.addEventListener("keydown", (evt) => {
  // console.log(evt.key);
  move(evt.key);
});

// event helper:
function move(key) {
  const arrows = {
    ArrowUp: () => (container.y -= 20),
    ArrowLeft: () => (container.x -= 20),
    ArrowDown: () => (container.y += 20),
    ArrowRight: () => (container.x += 20),
  };

  arrows[key]();
}
