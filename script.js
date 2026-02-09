// ===== Math logic =====
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

const OPERATIONS = {
    '+': add,
    '-': subtract,
    '×': multiply,
    '÷': divide,
};

function compute(a, operator, b) {
    return OPERATIONS[operator](a, b);
}

function formatNumber(num) {
    //my intention is to round up the DISPLAY (of result) to at most 15 DP (prevent infinite decimal points)
    if(!Number.isFinite(num)) return 'Error';

    //Convert to string with controlled precision
    //15 signficant figures. 
    //WHY 15?:
    //JS numbers are IEEE-754 double-precision floats 
    //=> gives 53 bits of binary precision which is around 15-16 decimal significant digits
    const str = num.toPrecision(15);

    //Remove trailing zeros caused by precision error (of computer)
    return Number(str).toString();
}

// ===== Calculator state =====
let leftOperand;
let rightOperand;
let operator;
let result;

let userInputBuffer = '';
let lastActionWasEqual = false;


function updateDisplay(value) {
    textBoxDisplay.textContent = value;
}

function enterEditModeFromResult() {
    if (!lastActionWasEqual) return;
    userInputBuffer = String(result);
    lastActionWasEqual = false;
}


//target text box
const textBox = document.querySelector('#textBox');
let textBoxDisplay = document.createElement('span');
textBox.appendChild(textBoxDisplay);

//target buttons
const numberButtons = document.querySelectorAll('.numberButtons');


function handleNumberInput(digit) {
    if (lastActionWasEqual) {
        userInputBuffer = digit;
        lastActionWasEqual = false;
    } else {
        userInputBuffer += digit;
    }
    updateDisplay(userInputBuffer);
}

numberButtons.forEach(btn => {
    btn.addEventListener('click', e =>
        handleNumberInput(e.target.textContent)
    );
});


//target operators
const operators = document.querySelectorAll('.operators');

function handleOperator(op) {
    if (lastActionWasEqual) {
        leftOperand = result;
        lastActionWasEqual = false;
    } else {
        leftOperand = Number(userInputBuffer);
    }

    operator = op;
    userInputBuffer = '';
    updateDisplay(op);
}


operators.forEach(operator => {
    operator.addEventListener('click', handleOperator(operator));
})

//target equal button
const equalButton = document.querySelector('#equalButton');

function handleEqual() {
    rightOperand = Number(userInputBuffer);
    result = compute(leftOperand, operator, rightOperand);
    updateDisplay(formatNumber(result));
    lastActionWasEqual = true;
}

//Code for AC and DEL
const topRowFunctions_buttons = document.querySelectorAll('.topRowFunctions_buttons');

//Reset back to a point when we first use the calculator
const clearText = function() {
    //Reset the visual buffer (what the user is typing)
    editBuffer = '';

    //Reset the logic variables
    leftOperand
 = undefined;
    rightOperand = undefined; 
    operator = undefined;
    result = undefined;

    //Reset the state flag
    lastActionWasEqual = false;

    //Update the screen to show the empty state
    updateDisplay('');
}

function handleDelete() {
    enterEditModeFromResult();
    userInputBuffer = userInputBuffer.slice(0, -1);
    updateDisplay(userInputBuffer);
}


const addPercentage = function() {
    //A new post-equal decision: User presses % immediately after getting a result
    if (lastActionWasEqual) {
        //move result back to Buffer (enter edit mode)
        editBuffer = String(result);
        lastActionWasEqual = false;
    } 
    //Convert current buffer to number and divide by 100
    let percentValue = Number(editBuffer) / 100;
    
    //Update the buffer with the new value so future math works
    editBuffer = String(percentValue);
    
    //Update the screen
    updateDisplay(editBuffer);
}


topRowFunctions_buttons.forEach( button => {
    if (button.textContent === 'AC') {
        button.addEventListener('click', clearText );
    } else if (button.textContent === 'DEL') {
        button.addEventListener('click', deleteText );
    } else {
        button.addEventListener('click', addPercentage );
    }
})


//target change sign button
const changeSignBtn = document.querySelector('#changeSign');

const changeSign = function() {
    //A new post-equal decision: User presses change sign after getting the result
    if (lastActionWasEqual) {
        editBuffer = String(result);
        lastActionWasEqual = true;
    }
    //doesn't matter whether result is negative or positive -> just change sign
    //Convert current input buffer into number and change sign of it
    let modifiedInput = Number(editBuffer) * (-1);

    //Update the buffer with new value
    editBuffer = String(modifiedInput);

    //Update screen display
    updateDisplay(editBuffer);
}

changeSignBtn.addEventListener('click', changeSign );


