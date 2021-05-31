# PixiJS 練習

## Example1

## 先 new 一個 app

```js
const app = new PIXI.Application();

document.body.appendChild(app.view);
```

這樣就可以起最基本的環境了

##

![](./static/imgs/study/01.png)

這一塊黑色的本身就是 canvas

或者你也可以改為這樣寫，先創建一個 canvas，然後帶入參數到 `PIXI.Application` ：

```js
const app = new PIXI.Application({
  view: document.getElementById("main"),
});
```

```html
<body>
  <div id="container">
    <canvas id="main"></canvas>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.1.3/pixi.min.js"></script>
  <script src="js/app.js"></script>
</body>
```

有指定和沒指定的差異，在於我們新創 Canvas 本身是空的，而我們 new 出來的 `app` 預設背景是黑色，代表我們有把其塞入我們剛剛創建的 `canvas`

比較建議哪一種？

如果你的畫面，需要特定指定在一個絕對位置，就建議使用 `<canvas>` 賦予 `id`，指定位置

使用相對位置可能就比較不建議，因為它可能會隨著 HTML 元素變動而有其他狀況

另外可以看到我們創造出來的 `canvas` 本身大小是 `800 * 600`，這邊建議不要使用 css 做直接修改，我們可以帶入更多參數在初始化的時候：

```js
const app = new PIXI.Application({
  view: document.getElementById("main"), // 指定在某個 canvas 元素上
  width: 1024,
  height: 768,
});
```

另外有常玩遊戲的，也有反鋸齒的參數可以加入：

```js
const app = new PIXI.Application({
  view: document.getElementById("main"), // 指定在某個 canvas 元素上
  width: 1024,
  height: 768,
  antialias: true, // 反鋸齒
});
```

另外也有背景設置，比如說 `backgroundColor`，但是他使用的顏色格式和我們寫的 CSS 參數可能不太一樣：

```js
const app = new PIXI.Application({
  view: document.getElementById("main"), // 指定在某個 canvas 元素上
  width: 1024,
  height: 768,
  antialias: true, // 反鋸齒
  backgroundColor: 0xff0000, // 注意值，原則上就是前面補 0x 就好
});
```

可以看到背景變成紅色了：

![](./static/imgs/study/02.png)

再順便提一次，預設背景是黑色哦！

## WebGL

這邊先提一下 WebGL，它可以幫我們把網頁上的畫面，動畫交給顯示卡去渲染

PIXI 本身支援兩種模式，一種是原生 canvas 渲染，另一種就是 WebGL 渲染，這邊其實滿建議選擇 WebGL 做渲染，若你不要，我們可以再加上一個屬性：`forceCanvas: false` (預設就是 `false`，不用特別設定)

至於我們要怎麼看我們當下的 PIXI APP 是支援 canvas 還是 WebGL 呢？在 devtool console 就可以知道了

![](./static/imgs/study/03.png)

另外補充一下，如果要關掉 Console 的那些提示，可以在程式最初執行時，加入：

```js
PIXI.utils.skipHello();
```

這樣就可以了，有些產品類型的專案會考慮關掉

## 更方便的初始化

我們一開始寫 `new PIXI` 似乎有點繁雜，其實還可以用解構寫法：

```js
const { Appliction } = PIXI; // 解構

const app = new Application({
  view: document.getElementById("main"),
  width: 1024,
  height: 768,
  antialias: true,
});
```

## Example2

如同我們對基本 HTML 結構的了解，比如說 body 底下會有 div，h1，footer 等標籤，PIXI 其實也有類似的概念

- Stage -> body
- container -> Stage 底下的各個元素
- container -> container，可以繼續包裹

先有這個概念之後，我們就可以在原本創建的 `app` 裏面，再繼續創建 `container` 並將其塞入:

```js
const { Application, Container, Text } = PIXI; // 解構

const app = new Application({
  view: document.getElementById("main"), /
  width: 1024,
  height: 768,
  antialias: true,
});

const container = new Container();

app.stage.appChild(container);
```

當然，在畫面上時不會變的，因為 `Container` 裡面我們沒有帶什麼參數，這時候我們可以繼續創建一些文字 (因為預設文字也是黑色，所以加個背景色)：

```js
const { Application, Container, Text } = PIXI; // 解構

const app = new Application({
  view: document.getElementById("main"),
  width: 1024,
  height: 768,
  antialias: true,
  backgroundColor: 0x00cc99, // 加個背景色吧
});

const container = new Container();

app.stage.addChild(container);

const text = new Text("老背少幹老");

container.addChild(text);
```

![](./static/imgs/study/04.png)

## 開始移動

現在 container 裡面包著一個 text，我們現在如果要讓這段話移動，就可以選擇讓 `container` 作動。

這邊要移動也很簡單，這邊 PIXI 的 API 提供 X 軸與 Y 軸，所以我們可以：

```js
container.x = 100;
```

![](./static/imgs/study/05.png)

可以看到老背少幹老往右移動了 100 了，單位應該是 px

## 畫面滿版

只要在初始化時指定寬為 `window.innerWidth` 即可

## 鍵盤事件

因為遊戲大多會使用到鍵盤來玩，所以就需要做一些畫面監聽，來做事件監聽鍵盤觸發，我們掛在 `body`

```js
const body = document.querySelector("body");

body.addEventListener("keydown", (evt) => {
  console.log(evt.key);
});
```

由於 `evt.keyCode` 已經被淘汰，所以這邊不使用 `keyCode`，使用 `key`：

```js
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
```

如此，按下方向鍵之後，老背少幹老就會移動了
