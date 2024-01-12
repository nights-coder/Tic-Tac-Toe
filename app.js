const Player_X = "X"
const Player_O = "O"

let playerText = document.getElementById('playerText')
let currentPlayer = Player_X
let boxes = Array.from(document.getElementsByClassName('box'))
let gameSpaces = Array(9).fill(null)
let gameCount = 0
let gameEnd = 0

let startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for(const condition of winningCombos){
        let [a, b, c] = condition
    
        if(gameSpaces[a] && gameSpaces[a] == gameSpaces[b] && gameSpaces[a] == gameSpaces[c]){
            return [a,b,c]
        }
    }
    return false
}

function boxClicked(e){
    const id  = e.target.id

    if(!gameSpaces[id] && gameCount < 9 && gameEnd === 0){
        gameSpaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        gameCount = gameCount + 1
        if(playerHasWon() !== false && gameCount < 9){
            playerText.innerHTML = `${currentPlayer} has won!`
            gameEnd = 1
            //let alarm = () => alert(`${currentPlayer} has won!`)
            return 
        }

        console.log(gameCount)
        currentPlayer = currentPlayer == Player_X ? Player_O : Player_X
    }

    if(gameCount == 9){
        playerText.innerHTML ='Draw Game!!'
        gameEnd = 1
        //let alarm2 = () => alert(`It's a Draw!`)
        //setTimeout(alarm, 500)
        return
    }
}


let restartButton = document.querySelector('button')
restartButton.addEventListener('click', restartFunction)

function restartFunction(){
    gameSpaces.fill(null)

    playerText.innerHTML = 'Tic Tac Toe'
    gameCount = 0
    gameEnd = 0
    boxes.forEach(box => box.innerHTML='')
    currentPlayer = Player_X
}

startGame()