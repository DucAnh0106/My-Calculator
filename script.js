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

function roundUpNumber( number ) {
    //my intention is to round up result to at most 15 DP (prevent infinite decimal points)
    let roundedNum = number * (10 ** 15);

    return Math.round(roundedNum) / (10 ** 15);
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
    result = roundUpNumber( operation(firstNumber, operator, secondNumber) );
    textBoxDisplay.textContent = result;

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
    //A new post-equal decision: to edit Result then chain operations
    if(isEqualButtonClicked) {
        //modify result 
        modifiedResult = String(result).slice(0,-1);

        //display modified result
        textBoxDisplay.textContent = modifiedResult;

        //this time, have to reassign new value back to result
        //(can also put in chooseOperator but it might confuse the code)
        //=> so it's like a tradeoff, we keep updating the latest value to result
        result = Number(modifiedResult);
    } else { //this is for when we're editing first/second number
       userInputBuffer = userInputBuffer.slice(0, -1);

       textBoxDisplay.textContent = userInputBuffer;
    }
}

const addPercentage = function() {
    //A new post-equal decision: User presses % immediately after getting a result
    if (isEqualButtonClicked) {
        result = result / 100;
        textBoxDisplay.textContent = result;
    } 
    //User is currently typing a number and want to get percentage of it
    else if (userInputBuffer !== '') {
        //Convert current buffer to number and divide by 100
        let percentValue = Number(userInputBuffer) / 100;
        
        //Update the buffer with the new value so future math works
        userInputBuffer = String(percentValue);
        
        //Update the screen
        textBoxDisplay.textContent = userInputBuffer;
    }
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



