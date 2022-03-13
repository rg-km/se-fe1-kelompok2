const CELL_SIZE = 20
const CANVAS_SIZE = 600
const CANVAS_SIZE_NYAWA = 600
const CELL_SIZE_NYAWA = 20
const REDRAW_INTERVAL = 50
const WIDTH = CANVAS_SIZE / CELL_SIZE
const HEIGHT = CANVAS_SIZE / CELL_SIZE
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
}
let MOVE_INTERVAL = 100

function initPosition () {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT)
  }
}

function initHeadAndBody () {
  let head = initPosition()
  let body = [{ x: head.x, y: head.y }]
  return {
    head: head,
    body: body
  }
}

function initDirection () {
  return Math.floor(Math.random() * 4)
}

function initSnake (sorce, bdn) {
  return {
    src: sorce,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    badan: bdn,
    nyawa1 :3,
    level : 1,
  }
}
let snake1 = initSnake(
  'assets/head-snake.png',
  'assets/body-snake.png'
)

let apple = {
  color: 'red',
  position: initPosition()
}

let app2 = {
  color: 'red',
  position: initPosition()
}

let nyawa = {
  position: initPosition(),
  status : false
}
let balok = {
  position: {x:9,y:10},
}


function drawCell (ctx, x, y, color) {
  ctx.fillStyle = color
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}
function drawUlar (ctx, x, y, sorce) {
  const image = new Image()
  image.src = sorce
  ctx.drawImage(image, x * CELL_SIZE , y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}
function drawlipe (ctx, x, y,stat) {
  const image = new Image()
  image.src = "assets/heart.png"
  if(stat == true){     
      ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
  }

}

function naiklevel(snake){
  if(snake.score % 5 == 0){
    MOVE_INTERVAL = MOVE_INTERVAL - 10
    snake.level = snake.level + 1
  }
}
function drawtembok(ctx,x,y){
  const image = new Image()
  // const image1 = new Image()
  image.src = "assets/block.png"
  // let a = balok.position.x
  for(let i =0 ; i <=5; i++){
          ctx.drawImage(image,(x+i)*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE)
        }
}
function drawNilai (snake) {
  let scoreCanvas
  scoreCanvas = document.getElementById('score1Board')
  let scoreCtx = scoreCanvas.getContext('2d')
  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  scoreCtx.font = '20px Arial'
  scoreCtx.fillStyle = 'red'
  scoreCtx.fillText("Level: "+snake.level, 10,30)
  scoreCtx.fillStyle = 'blue'
  scoreCtx.fillText(snake.score, 5, scoreCanvas.scrollHeight/1.2)
}
function drawDarah (snake) {
  let life = document.getElementById('life')
  const scoreCanvas = document.getElementById('nyawa1')
  let scoreCtx = scoreCanvas.getContext('2d')
  scoreCtx.clearRect(0, 0, CANVAS_SIZE_NYAWA,CELL_SIZE_NYAWA)
  let lebar = 1;
  let tinggi = 1;
  let a = snake.nyawa1;
  for(let i = 0; i < a; i++){
    scoreCtx.drawImage(life,lebar,tinggi,20,20)
    lebar = lebar +29
  }
}


function draw(){
  setInterval(function () {
    let snakeCanvas = document.getElementById('snakeBoard')
    let ctx = snakeCanvas.getContext('2d')
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    drawUlar(ctx, snake1.head.x, snake1.head.y, snake1.src)
    for (let i = 1; i < snake1.body.length; i++) {
      drawUlar(ctx, snake1.body[i].x, snake1.body[i].y, snake1.badan)
    }

    let app = document.getElementById('apple')
    ctx.drawImage(
      app,
      apple.position.x * CELL_SIZE,
      apple.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
      )
    ctx.drawImage(
      app,
      app2.position.x * CELL_SIZE,
      app2.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
      )
      drawtembok(ctx,balok.position.x, balok.position.y) 
      drawNilai(snake1)
      drawDarah(snake1)
      setInterval(function () {
        drawlipe(ctx, nyawa.position.x, nyawa.position.y,nyawa.status)
      },1000)
      
    }, REDRAW_INTERVAL)
  }

  function pindah (snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0
  }
  
}

function cekbalok(snake){
  for(let i = 0; i <= 5; i++){
  if (snake.head.x == (balok.position.x+i) && snake.head.y == balok.position.y){
    for(let j = 1; j < snake.body.length; j++){
    snake.body.pop()
    if(snake.body.length > 1){
      snake.body.pop() 
      }
    }
}
}
}
function eat (snake, apple) {
cekbalok(snake)
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition()
    snake.score++
    naiklevel(snake)
    snake.body.push({ x: snake.head.x, y: snake.head.y })
    if((snake.score % 2 != 0 && snake.score >1) || snake.score == 2){
      nyawa.status = true
      if(nyawa.status == true){
      setTimeout(function(){
      cekbalok(snake)
      nyawa.position = initPosition()
        nyawa.status = false
      },3000)
    }
    }else{
      setTimeout(function(){
        nyawa.status = false  
    }) 
  }
  } else if (
    (snake.head.x == nyawa.position.x && snake.head.y == nyawa.position.y) && nyawa.status == true
  ) {
    nyawa.position = initPosition()
    nyawa.status = false
    snake.nyawa1++
  }else if (
    snake.head.x == app2.position.x && snake.head.y == app2.position.y
  ) {
    app2.position = initPosition()
    snake.score++
    naiklevel(snake)
    snake.body.push({ x: snake.head.x, y: snake.head.y })
    if((snake.score % 2 != 0 && snake.score >1) || snake.score == 2){
    nyawa.status = true
    if(nyawa.status == true){
    setTimeout(function(){
      nyawa.status = false
      nyawa.position = initPosition()
      cekbalok(snake)
    },3000)
  }
  }else{
    setTimeout(function(){
      nyawa.status = false  
  }) 
}
  }

}
function moveLeft (snake) {
  snake.head.x--
  pindah(snake)
  eat(snake, apple)
}

function moveRight (snake) {
  snake.head.x++
  pindah(snake)
  eat(snake, apple)
}

function moveDown (snake) {
  snake.head.y++
  pindah(snake)
  eat(snake, apple)
}

function moveUp (snake) {
  snake.head.y--
  pindah(snake)
  eat(snake, apple)
}

function checkCollision (snakes) {
  let isCollide = false
  let isWin = false;
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          (snakes[i].head.x == snakes[j].body[k].x &&
          snakes[i].head.y == snakes[j].body[k].y )
        ) {
          snakes[i].nyawa1--
          if(snakes[i].nyawa1 == 0){
            isCollide = true
          }
         }
      }
    }
  }
for(let i = 0; i <= 5; i++){
    if (snakes[0].head.x == (balok.position.x+i) && snakes[0].head.y == balok.position.y){
      cekbalok(snakes[0])
      snakes[0].nyawa1--
      snakes[0].head = initPosition()
      if(snakes[0].nyawa1 == 0){
        isCollide = true
      }
    }
  }

  for(let i = 0 ; i < snakes.length; i++){
    if(snakes[i].level == 5){
      isWin = true
      MOVE_INTERVAL =100
    }
  }

  if (isCollide) {
    
    alert('Game over')

    snake1 = initSnake(
        'assets/head-snake.png',
        'assets/body-snake.png'
      )
      return isCollide
  }else if(isWin){
    alert('Selamat Anda Menang')
    snake1 = initSnake(
        'assets/head-snake.png',
        'assets/body-snake.png'
      )
    return isWin
  }

}

function move (snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake)
      break
    case DIRECTION.RIGHT:
      moveRight(snake)
      break
    case DIRECTION.DOWN:
      moveDown(snake)
      break
    case DIRECTION.UP:
      moveUp(snake)
      break
  }
  moveBody(snake)
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake)
    }, MOVE_INTERVAL)
  } else {
    balok.position = initPosition()
    initGame()
  }
}

function moveBody (snake) {
snake.body.unshift({ x: snake.head.x, y: snake.head.y })
snake.body.pop()
}

function turn (snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN
  }

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    turn(snake1, DIRECTION.LEFT)
  } else if (event.key === 'ArrowRight') {
    turn(snake1, DIRECTION.RIGHT)
  } else if (event.key === 'ArrowUp') {
    turn(snake1, DIRECTION.UP)
  } else if (event.key === 'ArrowDown') {
    turn(snake1, DIRECTION.DOWN)
  }
})

function initGame () {
  move(snake1)
}

initGame()