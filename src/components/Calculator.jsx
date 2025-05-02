import React from 'react'
import { useState, useEffect } from 'react'
import calculate from '../utils/calculate';

export default function Calculator() {
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'AC', 'DEL'
  ];

  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setInput('');
    } else if (value === '=') {
      const result = calculate(input);
      setInput(result.toString());
    } else if (value === 'DEL') {
      setInput((prev) => prev.slice(0, -1));
    }
    else {
      setInput((prev) => prev + value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (/\d/.test(key)) {
        // если цифра
        setInput((prev) => prev + key);
      } else if (['+', '-', '*', '/', '.'].includes(key)) {
        setInput((prev) => prev + key);
      } else if (key === 'Enter') {
        const result = calculate(input);
        setInput(result.toString());
      } else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (key.toLowerCase() === 'c') {
        setInput('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className="calculator">
      <div className="display">{input || '0'}</div>
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(btn)}
            className={btn === 'AC' ? 'ac' : ''}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  )
}
