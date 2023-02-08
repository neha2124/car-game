// alert("hello")
const score = document.getElementById("score")
const startScreen = document.getElementById("start-screen")
const gameArea = document.getElementById("game-area")
const playerName = document.getElementById("player")
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)
startScreen.addEventListener("click", start)
let player = { speed: 5 , score : 0 }
// let enemyCarColor =["blue","red","purple","black","green","white","#434169","#0e1537"]
let controls = {
    ArrowUp: false,
    ArrowLeft: false,

    ArrowDown: false,
    ArrowRight: false

}

let Name = localStorage.getItem("notes")
let b = JSON.parse(Name)
let play = (b[b.length-1].user)
playerName.innerHTML = ` : ${play}`

let Score = localStorage.getItem("Score");
let data;
if(Score== null){
   data = []
}else{
  data= JSON.parse(Score)
}






console.log(controls)
function keyDown(e) {
    e.preventDefault()
    controls[e.key] = true;
    // console.log(controls)
}
function keyUp(e) {
    e.preventDefault()
    controls[e.key] = false;
}
function isCollision(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) ||(aRect.right < bRect.left) || (aRect.left > bRect.right))
}
function endgame(){
   
        player.start = false;
        let obj = {
            user : play,
            score : player.score
        }
        data.push(obj)
        localStorage.setItem("score",JSON.stringify(data))
        // startScreen.classList.remove('hide')
        // startScreen.innerHTML = `Game Over `
    
        let div = document.createElement('div')
        div.innerHTML= `Your Score : ${player.score}
        <br> <button> Restart Game </button>
        `
        div.setAttribute('class','restart')
        gameArea.append(div)
        div.querySelector('button').addEventListener('click', ()=>{
           location.reload()
        })
        
        
    
}
function moveLines (){
    let lines = document.querySelectorAll('.line')
    lines.forEach((item) => {
        if (item.y > 700) {
            item.y -= 750
        }
        item.y += player.speed;
        item.style.top = item.y + "px"
    })
}
function moveEnemy (car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((item)=>{
        if(isCollision(car,item)){
               endgame()
            //    reStart()
              
        }
        if (item.y > 750) {
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) +"px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px"

        // let index= Math.floor(Math.random()* 10)   
        // item.style.background =enemyCarColor[index]
    })
}
function gameplay() {
    
    let car = document.querySelector('.car')
    let road = gameArea.getBoundingClientRect()
    // console.log(road)

    if (player.start) {
        requestAnimationFrame(gameplay)
        moveLines()
        moveEnemy(car)
        
        if (controls.ArrowDown && player.y < (road.bottom - 100)) { player.y += player.speed };
        if (controls.ArrowUp && player.y > (road.top + 100)) { player.y -= player.speed };
        if (controls.ArrowLeft && player.x > 0) { player.x -= player.speed };
        if (controls.ArrowRight && player.x < (road.width - 64)) { player.x += player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px"
        player.score ++;
        score.innerText = ` : ${player.score-1}`
       
    }
}
function start() {
    player.start = true;
    startScreen.classList.add("hide")
    requestAnimationFrame(gameplay)
    let car = document.createElement('div')
    car.setAttribute('class', 'car')
    gameArea.removeAttribute('class', 'hide')
    // score.removeAttribute('class','hide')
    for (let x = 0; x < 5; x++) {
        let roadLines = document.createElement('div')
        roadLines.setAttribute('class', 'line')
        roadLines.y = (x * 150)
        roadLines.style.top = roadLines.y + "px"
        gameArea.appendChild(roadLines)

    }
    for  (let x = 0; x < 3; x++) {
        let enemy = document.createElement('div')
        enemy.setAttribute('class', 'enemy')
        // enemy.style.background = 'blue'
        enemy.y = ((x+1) * 300) * -1;
        enemy.style.top = enemy.y + "px"
        enemy.style.left = Math.floor(Math.random() * 350) +"px";
        // enemy.style.background ="blue"
         gameArea.appendChild(enemy)
    }


    gameArea.append(car)
    player.x = car.offsetLeft
    console.log(player.x)
    player.y = car.offsetTop
   
   

}
// function reStart(){
//     if(!(player.start)){
//         startScreen.removeAttribute("class",'hide')

//     }
// }