
const playGround = document.querySelector(".ground");
const scoreBoard = document.querySelector(".score");
const record = document.querySelector(".high-score");
const controlArrow = document.querySelectorAll(".controlArrow i");

let stopSetInterVal;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let isGameOver = false;
let score = 0;

// let highRecord = localStorage.getItem("high-score") || 0;     <remove this comment when you add high score>
// record.innerText = `High Score: ${highRecord}`;

const foodPosition = () => {
    foodX = Math.trunc(Math.random()*30) + 1;
    foodY = Math.trunc(Math.random()*30) + 1;
}

const gameOver = () => {
    clearInterval(stopSetInterVal);
    alert("Game Over! Click Ok to Play Again...");
    location.reload();
}

const controls = (e) => {
    if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    
}
controlArrow.forEach(button => button.addEventListener("click", () => controls({ key: button.dataset.key })));

const playGame = () =>{
    if(isGameOver) return gameOver();
    let htmlCreate = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

        if(snakeX === foodX && snakeY === foodY){
            foodPosition();
            snakeBody.push([foodY, foodX]); // push food into snake body
            score++;

            // highRecord = score >= highRecord ? score: highRecord;
            // localStorage.setItem("high-score", highRecord); <remove this comment when you add high score>

            scoreBoard.innerText = `Score: ${score}`;  
            
        }

        for(let i=snakeBody.length-1; i>0; i--){
            // adding food into the snake body
            snakeBody[i] = snakeBody[i-1];
        }
        
        snakeBody[0] = [snakeX, snakeY];

        snakeX += velocityX;
        snakeY += velocityY; 

        if(snakeX <=0 || snakeX >30 || snakeY <=0 || snakeY >30){
            isGameOver = true;
        }

        for(let i=0; i<snakeBody.length; i++){

            htmlCreate += `<div class="snake-head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
            if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
                isGameOver = true;
            }
        }

    playGround.innerHTML=htmlCreate;
}
foodPosition();
stopSetInterVal = setInterval(playGame,200);
document.addEventListener("keydown", controls);
