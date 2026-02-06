function addNumbers(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}
function subtractNumbers(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}
function divideNumbers(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}
function multiplyNumbers(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}
function operation(firstNumber, operator, secondNumber) {
    if (operator === '+') {
        return addNumbers(firstNumber, secondNumber);
    } else if (operator === '-') {
        return subtractNumbers(firstNumber, secondNumber);
    } else if (operator === '×') {
        return multiplyNumbers(firstNumber, secondNumber);
    } else {
        return divideNumbers(firstNumber, secondNumber);
}
}

let firstNumber;
let operator;
let secondNumber;

let userInputBuffer = '';

let clickNumberButton;

//target text box
const textBox = document.querySelector('#textBox');
let textBoxDisplay = document.createElement('span');
textBox.appendChild(textBoxDisplay);

//target buttons
const numberButtons = document.querySelectorAll('.numberButtons');

const displayOnScreen = function() {
    textBoxDisplay.textContent = userInputBuffer;
}

const editNumber = function (event) {
    userInputBuffer += event.target.textContent;
    displayOnScreen(event);

}

numberButtons.forEach( button => {
    button.addEventListener('click', editNumber);
});

//target operators
const operators = document.querySelectorAll('.operators');

const chooseOperator = function(event) {
    operator = event.target.textContent;
    textBoxDisplay.textContent = operator;

    //Check if a number button is pressed after an operator button is pressed
    //Take a bit long cause run a loop through all number buttons whenever the operator is clicked
    numberButtons.forEach( button => {
        if (button.clicked === true) {
            firstNumber = Number( userInputBuffer );
            userInputBuffer = ''; //Switch back to edit mode
        }
    });
}

operators.forEach( operator => {
    operator.addEventListener('click', chooseOperator);
})

//target equal button
const equalButton = document.querySelector('#equalButton');
let result;

equalButton.addEventListener('click', (event) => {
    secondNumber = Number(userInputBuffer); // finalize mode for second Num

    result = operation(firstNumber, operator, secondNumber);
    textBoxDisplay.textContent = result;

    //If press an operator after, result will be assigned to input Buffer so first Number is assigned with latest result
    operators.forEach( operator => {
        if( operator.clicked === true ) {
            userInputBuffer = String(result);
        }
    })

    //If press a number, it will be like we start a whole new calculation, forget about everything
    numberButtons.forEach( button => {
        if (button.clicked === true) {
            userInputBuffer = ''; //Switch back to edit mode (which is actually forget all calculations)
        }
    });

})






