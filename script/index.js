function addNewNum() {

    while (true) {
        let checkFull = valueList.some((arrayX) => arrayX.includes(''));

        if (!checkFull) {
            break;
        }

        let firstNum = randomNumber();
        let secondNum = randomNumber();

        if (valueList[firstNum][secondNum] === '') {
            valueList[firstNum][secondNum] = 2;
            break;
        }
    }

    updatePlayground();

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


function shiftHorizontal(arr, pos) {

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
            arr[i] = arr[pos];
            arr[pos] = '';
            return;
        }
    }

}


let valueList = [[8, 4, 2, ''], [8, 8, 16, 32], [32, 16, 8, 8], [4, 2, 2, '']];
let valueList1 = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']];

let playground = document.querySelector('.playground');

window.addEventListener('keyup', function (event) {
    if (event.keyCode === 37) {
        valueList.forEach(item => shiftLeft(item));
        addNewNum();
        updatePlayground();
    }

    if (event.keyCode === 39) {
        valueList.forEach(item => shiftRight(item));
        addNewNum();


        updatePlayground();

    }
});

updatePlayground();



