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

let firstNumber;
let operator;
let secondNumber;

let userInputBuffer = '';

//server to remember have we click the equal button
//work even if the user spam clicking Equal
let isEqualButtonClicked = false;

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

    //check if the user's intent after clicking equal is to restart all calculations
    //click a number after equal
    if (isEqualButtonClicked) {
        userInputBuffer = '';
        userInputBuffer += event.target.textContent;

        isEqualButtonClicked = false; //reset the state to test user's intent for next operation
    } else {
        userInputBuffer += event.target.textContent;
    }

    //display user enter on screen
    displayOnScreen();
}

numberButtons.forEach( button => {
    button.addEventListener('click', editNumber);
});

//target operators
const operators = document.querySelectorAll('.operators');

const chooseOperator = function(event) {
    //display operator on the screen
    operator = event.target.textContent;
    textBoxDisplay.textContent = operator;

    //if an operator is pressed after the equal button is pressed (for 2nd operation onward)
    if (isEqualButtonClicked) {
        isEqualButtonClicked = false; //reset the state to test user's intent for next operation
        
        firstNumber = result;
        userInputBuffer = ''; //switch to edit the second Number

    } else {
        firstNumber = Number(userInputBuffer); //finalize first number
        userInputBuffer = ''; //Switch back to edit the second Number
    }

}

operators.forEach( operator => {
    operator.addEventListener('click', chooseOperator);
})

//target equal button
const equalButton = document.querySelector('#equalButton');
let result;

equalButton.addEventListener('click', (event) => {
    // finalize the second number
    secondNumber = Number(userInputBuffer);

    //output the result
    result = operation(firstNumber, operator, secondNumber);
    textBoxDisplay.textContent = formatNumber( result );

    //change state of equal button
    isEqualButtonClicked = true;
})

//Code for AC and DEL
const topRowFunctions_buttons = document.querySelectorAll('.topRowFunctions_buttons');

//Reset back to a point when we first use the calculator
const clearText = function() {
    //Reset the visual buffer (what the user is typing)
    userInputBuffer = '';

    //Reset the logic variables
    firstNumber = undefined;
    secondNumber = undefined; 
    operator = undefined;
    result = undefined;

    //Reset the state flag
    isEqualButtonClicked = false;

    //Update the screen to show the empty state
    textBoxDisplay.textContent = '';
}

const deleteText = function() {
    //A new post-equal decision: to assign result to Buffer and enter the EDIT mode (technically we're back at first operation world)
    if(isEqualButtonClicked) {
        //move result back to Buffer 
        userInputBuffer = String(result);
        isEqualButtonClicked = false;

    } 
    //this is for when we're editing first/second number
    userInputBuffer = userInputBuffer.slice(0, -1);

    textBoxDisplay.textContent = userInputBuffer;
    
}

const addPercentage = function() {
    //A new post-equal decision: User presses % immediately after getting a result
    if (isEqualButtonClicked) {
        //move result back to Buffer (enter edit mode)
        userInputBuffer = String(result);
        isEqualButtonClicked = false;
    } 
    //Convert current buffer to number and divide by 100
    let percentValue = Number(userInputBuffer) / 100;
    
    //Update the buffer with the new value so future math works
    userInputBuffer = String(percentValue);
    
    //Update the screen
    textBoxDisplay.textContent = userInputBuffer;
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
    if (isEqualButtonClicked) {
        userInputBuffer = String(result);
        isEqualButtonClicked = true;
    }
    //doesn't matter whether result is negative or positive -> just change sign
    //Convert current input buffer into number and change sign of it
    let modifiedInput = Number(userInputBuffer) * (-1);

    //Update the buffer with new value
    userInputBuffer = String(modifiedInput);

    //Update screen display
    textBoxDisplay.textContent = userInputBuffer;
}

changeSignBtn.addEventListener('click', changeSign );


