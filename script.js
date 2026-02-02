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

function operation(firstNumber, secondNumber, secondNumber) {
    if (operator === '+') {
        return addNumbers(firstNumber, secondNumber);
    } else if (operator === '-') {
        return subtractNumbers(firstNumber, secondNumber);
    } else if (operator === '*') {
        return multiplyNumbers(firstNumber, secondNumber);
    } else {
        return divideNumbers(firstNumber, secondNumber);
}
}

let firstNumber = Number( prompt('Enter first number','') );
let operator = prompt('Enter +, -, * or /','');
let secondNumber = Number( prompt('Enter second number','') );

console.log ( operation(firstNumber, operator, secondNumber) );



