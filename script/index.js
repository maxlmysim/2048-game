function checkMove() {

    for (let i = 0; i < valueList.length; i++) {

        for (let j = 0; j < valueList[i].length; j++) {

            if (preValueList[i][j] !== valueList[i][j]) {
                return true;
            }

        }
    }
    return false;
}

function addNewNum() {

    while (true) {
        let firstNum = randomNumber();
        let secondNum = randomNumber();

        if (valueList[firstNum][secondNum] === '') {

            valueList[firstNum][secondNum] = 2;
            break;
        }
    }

    isMove();

// fill preValueList

    for (let i = 0; i < valueList.length; i++) {

        for (let j = 0; j < valueList[i].length; j++) {

            preValueList[i][j] = valueList[i][j];
        }
    }
}

function updatePlayground() {

    valueList.forEach((arrayX, x) => {
        arrayX.forEach((item, y) => {
            playground.rows[x].cells[y].children[0].textContent = item;
            playground.rows[x].cells[y].children[0].dataset.value = item;
        });
    });
}

function randomNumber() {
    return Math.floor(Math.random() * 4);
}

function shiftLeft(arrayX) {

    for (let i = 0; i < arrayX.length; i++) {

        for (let j = i + 1; j < arrayX.length; j++) {

            if (arrayX[j] === '') continue;

            if (arrayX[i] !== arrayX[j]) break;

            if (arrayX[i] === arrayX[j]) {
                arrayX[i] += arrayX[j];
                changeScore(arrayX[i]);
                arrayX[j] = '';
                break;
            }
        }
    }

    for (let i = 0; i < arrayX.length; i++) {

        if (arrayX[i] !== '' && arrayX[i - 1] === '') {
            shiftHorizontal(arrayX, i);
        }

    }

    return arrayX;
}

function changeScore(sum) {
    let addScore = document.querySelector('.plus-score');

    addScore.textContent = `+${sum}`
    addScore.classList.add('active');

    setTimeout(()=> {
        addScore.classList.remove('active');
    },700)


    currentScore += sum;
    currentScoreCell.textContent = currentScore;

    if (currentScore > bestScore) {
        bestScore = currentScore;
        bestScoreCell.textContent = bestScore;
    }
}

function shiftRight(rightArray) {
    let arrayLeft = [];

    for (let i = 3; i >= 0; i--) {
        arrayLeft.push(rightArray[i]);
    }

    let newArray = shiftLeft(arrayLeft).reverse();

    for (let i = 0; i <= 3; i++) {
        rightArray[i] = newArray[i];
    }
}


function shiftUp() {

    for (let i = 0; i <= 3; i++) {
        let arrayY = [];

        for (let j = 0; j <= 3; j++) {
            arrayY.push(valueList[j][i]);
        }

        let newArray = shiftLeft(arrayY);

        for (let j = 0; j <= 3; j++) {
            valueList[j][i] = newArray[j];
        }
    }
}

function shiftDown() {

    for (let i = 0; i <= 3; i++) {
        let arrayY = [];

        for (let j = 3; j >= 0; j--) {
            arrayY.push(valueList[j][i]);
        }

        let newArray = shiftLeft(arrayY).reverse();

        for (let j = 0; j <= 3; j++) {
            valueList[j][i] = newArray[j];
        }

    }

}

function shiftHorizontal(arr, pos) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            arr[i] = arr[pos];
            arr[pos] = '';
            return;
        }
    }

}

function isMove() {
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (valueList[i][j] === '' || valueList[i][j - 1] === '') return true;
            if (valueList[i][j] === valueList[i][j - 1]) return true;
        }
    }


    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            if (valueList[j][i] === '' || valueList[j - 1][i] === '') return true;
            if (valueList[j][i] === valueList[j - 1][i]) return true;

        }
    }

    endGame();
}

function endGame() {
    gameOverTitle.style.display = 'flex';

    if (!listBestScoreRecent.includes(currentScore)) {

        listBestScoreRecent.push(currentScore);
        listBestScoreRecent.sort((a, b) => b - a).length = 10;
        localStorage.setItem('listBestScoreRecent', listBestScoreRecent);
    }
}

function restartGame() {
    endGame();
    valueList = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
    currentScore = 0;
    gameOverTitle.style.display = 'none';

    addNewNum();
    updatePlayground();
    changeScore(0);
}

function showBestScore() {
    document.querySelector('.container-best-score').classList.toggle('active');
    document.querySelectorAll('.best-position')
        .forEach((item, index) => {
            item.textContent = listBestScoreRecent[index];
        });
}

function loadLocalStorage() {
    let listBest = localStorage.getItem('listBestScoreRecent');

    if (listBest) {
        listBest.split(',').forEach((item) => listBestScoreRecent.push(+item));
        bestScoreCell.textContent = +listBestScoreRecent[0];
        bestScore = +listBestScoreRecent[0];
    }
}

// let valueList = [[2, 4, 8, 16], [32, 64, 128, 256], [512, 1024, 2048, 4096], ['', '', '', '']];
let valueList = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
let preValueList = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];
let currentScore = 0;
let bestScore = 0;
let listScoreRecent = [];
let listBestScoreRecent = [];

let gameOverTitle = document.querySelector('.game-over-title');
let playground = document.querySelector('.playground');
let restartBtn = document.querySelector('.btn-new-game');
let currentScoreCell = document.querySelector('.current-score-value');
let bestScoreCell = document.querySelector('.best-score-value');
let bestScoreBlock = document.querySelector('.best-score');
let btnCloseBestScore = document.querySelector('.btn-close-best-score');

window.addEventListener('keyup', function (event) {
    if (event.keyCode === 37) {
        valueList.forEach(item => shiftLeft(item));
    }

    if (event.keyCode === 38) {
        shiftUp();
    }

    if (event.keyCode === 39) {
        valueList.forEach(item => shiftRight(item));
    }

    if (event.keyCode === 40) {
        shiftDown();
    }

    if (event.keyCode === 37 ||
        event.keyCode === 38 ||
        event.keyCode === 39 ||
        event.keyCode === 40) {

        if (!checkMove()) return;
        addNewNum();
        updatePlayground();
    }
});

restartBtn.addEventListener('click', restartGame);
bestScoreBlock.addEventListener('click', showBestScore);
btnCloseBestScore.addEventListener('click', showBestScore);

loadLocalStorage();
addNewNum();
updatePlayground();

