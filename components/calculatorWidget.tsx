"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"

export function CalculatorWidget() {
  const [calcDisplay, setCalcDisplay] = useState("0")
  const [calcPrevValue, setCalcPrevValue] = useState<number | null>(null)
  const [calcOperation, setCalcOperation] = useState<string | null>(null)
  const [calcWaitingForOperand, setCalcWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (calcWaitingForOperand) {
      setCalcDisplay(String(num))
      setCalcWaitingForOperand(false)
    } else {
      setCalcDisplay(calcDisplay === "0" ? String(num) : calcDisplay + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(calcDisplay)

    if (calcPrevValue === null) {
      setCalcPrevValue(inputValue)
    } else if (calcOperation) {
      const currentValue = calcPrevValue || 0
      const newValue = calculate(currentValue, inputValue, calcOperation)

      setCalcDisplay(String(newValue))
      setCalcPrevValue(newValue)
    }

    setCalcWaitingForOperand(true)
    setCalcOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "*":
        return firstValue * secondValue
      case "/":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(calcDisplay)

    if (calcPrevValue !== null && calcOperation) {
      const newValue = calculate(calcPrevValue, inputValue, calcOperation)
      setCalcDisplay(String(newValue))
      setCalcPrevValue(null)
      setCalcOperation(null)
      setCalcWaitingForOperand(true)
    }
  }

  const clearCalculator = () => {
    setCalcDisplay("0")
    setCalcPrevValue(null)
    setCalcOperation(null)
    setCalcWaitingForOperand(false)
  }

  return (
    <div className="bg-card backdrop-blur border border-border rounded-2xl p-4 flex flex-col justify-center shadow-lg widget-hover flex-1" style={{ height:'100%', justifyContent:'flex-start' }}>
      <div className="flex items-center gap-2 mb-3">
        <Calculator className="w-4 h-4 text-accent-white" />
        <span className="text-gray-300 text-sm font-medium">Calculator</span>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-input-bg border border-input-border rounded-xl p-2 mb-2">
          <div className="text-right text-white text-sm font-mono truncate">{calcDisplay}</div>
        </div>
        <div className="grid grid-cols-4 gap-1 h-full grid-rows-5">
          <button
            onClick={clearCalculator}
            className="bg-button-bg hover:bg-button-hover-bg text-red-400 rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            C
          </button>
          <button
            onClick={() => inputOperation("/")}
            className="bg-button-bg hover:bg-button-hover-bg text-gray-300 rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            ÷
          </button>
          <button
            onClick={() => inputOperation("*")}
            className="bg-button-bg hover:bg-button-hover-bg text-gray-300 rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            ×
          </button>
          <button
            onClick={() => inputOperation("-")}
            className="bg-button-bg hover:bg-button-hover-bg text-gray-300 rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            −
          </button>
          <button
            onClick={() => inputNumber("7")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            7
          </button>
          <button
            onClick={() => inputNumber("8")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            8
          </button>
          <button
            onClick={() => inputNumber("9")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            9
          </button>
          <button
            onClick={() => inputOperation("+")}
            className="bg-button-bg hover:bg-button-hover-bg text-gray-300 rounded-lg text-xs row-span-2 transition-all duration-200 shadow-md calc-button-outline"
          >
            +
          </button>
          <button
            onClick={() => inputNumber("4")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            4
          </button>
          <button
            onClick={() => inputNumber("5")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            5
          </button>
          <button
            onClick={() => inputNumber("6")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            6
          </button>
          <button
            onClick={() => inputNumber("1")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            1
          </button>
          <button
            onClick={() => inputNumber("2")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            2
          </button>
          <button
            onClick={() => inputNumber("3")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            3
          </button>
          <button
            onClick={performCalculation}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs row-span-2 transition-all duration-200 shadow-md calc-button-outline"
          >
            =
          </button>
          <button
            onClick={() => inputNumber("0")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs col-span-2 transition-all duration-200 shadow-md calc-button-outline"
          >
            0
          </button>
          <button
            onClick={() => inputNumber(".")}
            className="bg-button-bg hover:bg-button-hover-bg text-white rounded-lg text-xs transition-all duration-200 shadow-md calc-button-outline"
          >
            .
          </button>
        </div>
      </div>
    </div>
  )
}