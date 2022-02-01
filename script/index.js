function addNewNum() {

    while (true) {
        let checkFull = valueList.some((arrayX) => arrayX.includes(''));

        if (!checkFull) {
            console.log(isMove());
            break;
        }

        let firstNum = randomNumber();
        let secondNum = randomNumber();

        if (valueList[firstNum][secondNum] === '') {
            valueList[firstNum][secondNum] = 2;
            break;
        }
    }

}

function updatePlayground() {

    valueList.forEach((arrayX, x) => {
        arrayX.forEach((item, y) => {
            playground.rows[x].cells[y].children[0].textContent = item;
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

            if (valueList[i][j] === valueList[i][j - 1]) return true;
        }
    }


    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 4; j++) {

            if (valueList[j][i] === valueList[j - 1][i]) return true;

        }
    }
return false
}


// let valueList = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]];
let valueList = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];

let playground = document.querySelector('.playground');

window.addEventListener('keyup', function (event) {
    if (event.keyCode === 37) {
        valueList.forEach(item => shiftLeft(item));
        addNewNum();
        updatePlayground();
    }

    if (event.keyCode === 38) {
        shiftUp();
        addNewNum();
        updatePlayground();
    }

    if (event.keyCode === 39) {
        valueList.forEach(item => shiftRight(item));
        addNewNum();
        updatePlayground();
    }

    if (event.keyCode === 40) {
        shiftDown();
        addNewNum();
        updatePlayground();
    }


});


addNewNum();

updatePlayground();



