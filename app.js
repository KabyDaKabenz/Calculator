class Calculator {

    constructor(pre_operand, curr_operand) {
        this.previous_operand = pre_operand
        this.current_operand = curr_operand
        this.clear()
    }

    clear() {
        this.pre_operand = ''
        this.curr_operand = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if(number === '.' && this.curr_operand.includes('.')) return
        this.curr_operand = this.curr_operand.toString() + number.toString()
    }

    pickOperation(operation) {
        if(this.curr_operand === '') return
        if(this.pre_operand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.pre_operand = this.curr_operand
        this.curr_operand = ''
       
        
    }

    calculate() {
        let result
        let prev = parseFloat(this.pre_operand)
        let curr = parseFloat(this.curr_operand)
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case 'x':
                result = prev * curr
                break
            case '÷':
                result = prev / curr
                break
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            default: return
        }
        this.operation = undefined
        this.curr_operand = result
        this.pre_operand = ''
    }

    delete() {
        this.curr_operand = this.curr_operand.toString().slice(0, -1)
    }

    updateDisplay() {
        this.current_operand.innerText = this.curr_operand
        if(this.operation != null) {
            this.previous_operand.innerText = `${this.pre_operand} ${this.operation}`
        } else {
            this.previous_operand.innerText = ''
        }
        
    }
}

// constants
const numbers = document.querySelectorAll('.number')
const operations = document.querySelectorAll('.operation')
const all_clear_btn = document.querySelector('.all-clear')
const delete_btn = document.querySelector('.delete')
const equal_btn = document.querySelector('.equal')
const previous_operand = document.querySelector('.pre-operand')
const current_operand = document.querySelector('.curr-operand')

const calculate = new Calculator(previous_operand, current_operand)

// Event listeners
numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculate.appendNumber(number.innerText)
        calculate.updateDisplay()
    })
})

operations.forEach(operation => {
    operation.addEventListener('click', () => {
        calculate.pickOperation(operation.innerText)
        calculate.updateDisplay()
    })
})

equal_btn.addEventListener('click', () => {
    calculate.calculate()
    calculate.updateDisplay()
})

all_clear_btn.addEventListener('click', () => {
    calculate.clear()
    calculate.updateDisplay()
})

delete_btn.addEventListener('click', () => {
    calculate.delete()
    calculate.updateDisplay()
})