const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
}

const buttons = document.querySelectorAll(".button")

for (let button of buttons) {
    button.addEventListener("click", function (event) {
        const target = event.target
        if (target.classList.contains('clear')) {
            clearCalculator()
            updateDisplay()
            return
        }
        if (target.classList.contains('negative')) {
            negativeNumber()
            updateDisplay()
            return
        }
        if (target.classList.contains('equals')) {
            calculate()
            updateDisplay()
            return
        }
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText)
            updateDisplay()
            return
        }
        inputDigit(target.innerText)
        updateDisplay()
    })
}

function updateDisplay() {
    document.querySelector("#displayNumber").innerHTML = calculator.displayNumber
}

function clearCalculator() {
    calculator.displayNumber = '0'
    calculator.operator = null
    calculator.firstNumber = null
    calculator.waitingForSecondNumber = false
}

function inputDigit(digit) {
    if (calculator.waitingForSecondNumber && calculator.displayNumber === calculator.firstNumber) {
        calculator.displayNumber = digit
    } else {
        calculator.displayNumber = (calculator.displayNumber === '0' ? digit : calculator.displayNumber += digit)
    }
}

function negativeNumber() {
    if (calculator.displayNumber === '0') return
    calculator.displayNumber = calculator.displayNumber *= -1
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator
        calculator.waitingForSecondNumber = true
        calculator.firstNumber = calculator.displayNumber
    } else {
        alert("Operator sudah ditentukan!")
    }
}

function calculate() {
    if (calculate.firstNumber === null || calculator.operator === null) {
        alert("Operator belum ditetapkan !")
        return
    }
    let result = (calculator.operator === '+' ? (parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber))
        : (parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)))

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history)
    calculator.displayNumber = result
    calculator.waitingForSecondNumber = false
    renderHistory()
}
