// =====================
// Math logic (pure)
// =====================
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

const OPERATIONS = {
    '+': add,
    '-': subtract,
    '×': multiply,
    '÷': divide
};

function compute(a, operator, b) {
    return OPERATIONS[operator](a, b);
}

// Optional: precision safety
function formatNumber(value) {
    return Number(Number(value).toPrecision(15)).toString();
}

// =====================
// Calculator state
// =====================
let leftOperand;
let rightOperand;
let operator;
let result;

let editBuffer = '';
let lastActionWasEqual = false;

// =====================
// DOM references
// =====================
const textBox = document.querySelector('#textBox');
const display = document.createElement('span');
textBox.appendChild(display);

const numberButtons = document.querySelectorAll('.numberButtons');
const operatorButtons = document.querySelectorAll('.operators');
const equalButton = document.querySelector('#equalButton');
const utilityButtons = document.querySelectorAll('.topRowFunctions_buttons');
const changeSignBtn = document.querySelector('#changeSign');

// =====================
// Display helpers
// =====================
function updateDisplay(value) {
    display.textContent = value;
}

// =====================
// Intent helpers
// =====================
function enterEditModeFromResult() {
    if (!lastActionWasEqual) return;
    editBuffer = String(result);
    lastActionWasEqual = false;
}

// =====================
// Input handlers
// =====================
function handleNumberInput(digit) {
    if (lastActionWasEqual) {
        editBuffer = digit;
        lastActionWasEqual = false;
    } else {
        editBuffer += digit;
    }
    updateDisplay(editBuffer);
}

function handleOperator(op) {
    if (lastActionWasEqual) {
        leftOperand = result;
        lastActionWasEqual = false;
    } else {
        leftOperand = Number(editBuffer);
    }

    operator = op;
    editBuffer = '';
    updateDisplay(op);
}

function handleEqual() {
    rightOperand = Number(editBuffer);
    result = compute(leftOperand, operator, rightOperand);
    updateDisplay(formatNumber(result));
    lastActionWasEqual = true;
}

function handleDelete() {
    enterEditModeFromResult();
    editBuffer = editBuffer.slice(0, -1);
    updateDisplay(editBuffer);
}

function handleClear() {
    leftOperand = undefined;
    rightOperand = undefined;
    operator = undefined;
    result = undefined;
    editBuffer = '';
    lastActionWasEqual = false;
    updateDisplay('');
}

function handlePercentage() {
    enterEditModeFromResult();
    editBuffer = String(Number(editBuffer) / 100);
    updateDisplay(editBuffer);
}

function handleChangeSign() {
    enterEditModeFromResult();
    editBuffer = String(Number(editBuffer) * -1);
    updateDisplay(editBuffer);
}

// =====================
// Event wiring
// =====================
numberButtons.forEach(btn => {
    btn.addEventListener('click', e =>
        handleNumberInput(e.target.textContent)
    );
});

operatorButtons.forEach(btn => {
    btn.addEventListener('click', e =>
        handleOperator(e.target.textContent)
    );
});

equalButton.addEventListener('click', handleEqual);

utilityButtons.forEach(btn => {
    if (btn.textContent === 'AC') {
        btn.addEventListener('click', handleClear);
    } else if (btn.textContent === 'DEL') {
        btn.addEventListener('click', handleDelete);
    } else {
        btn.addEventListener('click', handlePercentage);
    }
});

changeSignBtn.addEventListener('click', handleChangeSign);
