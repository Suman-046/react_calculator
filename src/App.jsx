import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [isNewNumber, setIsNewNumber] = useState(true)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleNumber = (number) => {
    if (display.length >= 12) return // Prevent overflow
    
    if (isNewNumber) {
      setDisplay(number)
      setIsNewNumber(false)
    } else {
      setDisplay(display + number)
    }
    
    addButtonAnimation(number)
  }

  const handleOperator = (operator) => {
    setEquation(display + ' ' + operator + ' ')
    setIsNewNumber(true)
    addButtonAnimation(operator)
  }

  const handleEquals = () => {
    setIsCalculating(true)
    addButtonAnimation('=')
    
    try {
      const result = eval(equation + display)
      // Format the result to prevent overflow
      const formattedResult = Number(result).toPrecision(12)
      const finalResult = parseFloat(formattedResult).toString()
      
      setTimeout(() => {
        setDisplay(finalResult)
        setEquation('')
        setIsNewNumber(true)
        setIsCalculating(false)
      }, 300)
    } catch (error) {
      setTimeout(() => {
        setDisplay('Error')
        setEquation('')
        setIsNewNumber(true)
        setIsCalculating(false)
      }, 300)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
    setIsNewNumber(true)
    addButtonAnimation('C')
  }

  const addButtonAnimation = (value) => {
    const button = document.querySelector(`button[data-value="${value}"]`)
    if (button) {
      button.classList.add('button-press')
      setTimeout(() => button.classList.remove('button-press'), 200)
    }
  }

  return (
    <div className="calculator">
      <div className={`display ${isCalculating ? 'calculating' : ''}`}>
        {display}
      </div>
      <div className="buttons">
        <button className="clear" onClick={handleClear} data-value="C">C</button>
        <button className="operator" onClick={() => handleOperator('/')} data-value="/">/</button>
        <button className="operator" onClick={() => handleOperator('*')} data-value="*">×</button>
        <button className="operator" onClick={() => handleOperator('-')} data-value="-">−</button>
        
        <button onClick={() => handleNumber('7')} data-value="7">7</button>
        <button onClick={() => handleNumber('8')} data-value="8">8</button>
        <button onClick={() => handleNumber('9')} data-value="9">9</button>
        <button className="operator" onClick={() => handleOperator('+')} data-value="+">+</button>
        
        <button onClick={() => handleNumber('4')} data-value="4">4</button>
        <button onClick={() => handleNumber('5')} data-value="5">5</button>
        <button onClick={() => handleNumber('6')} data-value="6">6</button>
        <button className="equals" onClick={handleEquals} data-value="=">=</button>
        
        <button onClick={() => handleNumber('1')} data-value="1">1</button>
        <button onClick={() => handleNumber('2')} data-value="2">2</button>
        <button onClick={() => handleNumber('3')} data-value="3">3</button>
        <button onClick={() => handleNumber('0')} data-value="0">0</button>
      </div>
    </div>
  )
}

export default App