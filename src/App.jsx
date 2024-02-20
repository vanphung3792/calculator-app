import React, { useReducer } from 'react'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  REMOVE_DIGIT: 'remove-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  EVALUATE: 'evaluate',
}



function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: payload.digit
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }
      if (payload.digit === "." && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: `0${payload.digit}`
        }
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.REMOVE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) {
        return state
      }
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (state.currentOperand == null || state.previousOperand == null || state.operation == null) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state),
        operation: null
      }
  }
}

function evaluate(state) {
  const prev = parseFloat(state.previousOperand)
  const curr = parseFloat(state.currentOperand)
  if (isNaN(prev) || isNaN(curr)) return ""
  let result = ""
  switch (state.operation) {
    case "+":
      result = prev + curr
      break
    case "-":
      result = prev - curr
      break
    case "*":
      result = prev * curr
      break
    case "/":
      result = prev / curr
      break
  }
  return result.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

function formatNumber(number) {
  if (number == null) return ""
  const [integer, decimal] = number.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [state, dispatch] = useReducer(reducer, {})
  const { previousOperand, currentOperand, operation } = state

  console.log(state)

  return (
    <div className="app">
      <div className="calculator">
        <div className="output">
          <div className="previous-operand text-xl font-light">{formatNumber(previousOperand)} {operation}</div>
          <div className="current-operand text-4xl tracking-tighter text-end w-[375px] truncate">{formatNumber(currentOperand)}</div>
        </div>
        <div className="input">
          <button className="col-span-2 btn operationBtn" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
          <button className="btn operationBtn" onClick={() => dispatch({ type: ACTIONS.REMOVE_DIGIT})}>DEL</button>
          <OperationButton className="bg-yellow-600/50" operation="/" dispatch={dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton className="bg-yellow-600/50" operation="*" dispatch={dispatch} />
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton className="bg-yellow-600/50" operation="+" dispatch={dispatch} />
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton className="bg-yellow-600/50" operation="-" dispatch={dispatch} />
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          <button className="col-span-2 btn operationBtn" onClick={() => dispatch({ type: ACTIONS.EVALUATE})}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
