const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
// getContext 會回傳一個canvas的drawing context(繪畫環境)，可在canvas內畫圖

const unit = 20;
const row = canvas.height / unit; // 500/20 = 25
const coloum = canvas.width / unit; // 360/20 = 18

// 創造蛇
let snake = []; // 透過Array 儲存蛇的身體x, y 座標
function creatSnake() {
  snake[0] = {
    x: 80,
    y: 0,
  };
  snake[1] = {
    x: 60,
    y: 0,
  };
  snake[2] = {
    x: 40,
    y: 0,
  };
  snake[3] = {
    x: 20,
    y: 0,
  };
}

// 創造果實
class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * 25) * unit; // (0~1)*16 = 0~15...., 透過Math.floor可以轉換為(0~15)*unit = 位置
    this.y = Math.floor(Math.random() * 18) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }

  pickALocation() {
    // 確認是否有重疊到蛇的身體並更新果實位置
    let overLapping = false;
    let new_x;
    let new_y;

    function checkOverLap(a, b) {
      for (let i = 0; i < snake.length; i++) {
        if (a == snake[i].x && b == snake[i].y) {
          overLapping = true;
          return;
        } else {
          overLapping = false;
        }
      }
    }

    do {
      new_x = Math.floor(Math.random() * 25) * unit;
      new_y = Math.floor(Math.random() * 18) * unit;
      checkOverLap(new_x, new_y);
    } while (overLapping); // 當有重疊就再跑一圈
    {
      this.x = new_x;
      this.y = new_y;
    }
  }
}

// 初始設定
creatSnake();
let myFruit = new Fruit();
window.addEventListener("keydown", changeDirection);
let d = "Right"; // 設定移動方向
// 根據鍵盤方向鍵改變移動方向
function changeDirection(e) {
  if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowRight" && d != "Left") {
    d = "Right";
  } else if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  }

  // 有可能在0.1秒內按下三個按鍵導致蛇的頭吃自己 -> 設定在下一幀出來前不改變
  window.removeEventListener("keydown", changeDirection);
}

let score = 0;
let highestScore;
loadHighestScore();
document.getElementById("point").innerHTML = "遊戲分數為：" + score;
document.getElementById("hightest-point").innerHTML =
  "最高分數為：" + highestScore;

function draw() {
  //每次畫圖前確認是否有吃到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      clearInterval(myGame);
      alert("遊戲結束");
      return;
    }
  }

  ctx.fillStyle = "black"; // 重設背景
  ctx.fillRect(0, 0, canvas.width, canvas.height); // 重新畫出canvas

  myFruit.drawFruit();

  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white"; // 外框顏色

    // 超出邊界(Canvas) 的機制設計, 在畫出下一次蛇之前確定是否還在邊界中
    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }

    // 畫出四方形(蛇身)：使用參數(x, y, width, height)
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  // 依目前d 變數方向，決定下一幀要放在哪個座標
  let snakeX = snake[0].x; // snake[0].x 是一個Number
  let snakeY = snake[0].y;
  if (d == "Right") {
    snakeX += unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Down") {
    snakeY += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  //確認蛇是否有吃到果實
  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.pickALocation();
    score += 1;
    setHighestScore(score);
    document.getElementById("point").innerHTML = "遊戲分數為：" + score;
    document.getElementById("hightest-point").innerHTML =
      "最高分數為：" + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}

// 讓蛇動起來
// 刪除最後一個元素，在移動方向上增加一個元素（新的頭）
let myGame = setInterval(draw, 100);

function loadHighestScore() {
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}

function setHighestScore(score) {
  if (score >= highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
