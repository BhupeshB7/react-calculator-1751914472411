import React, { useState } from 'react';
import { Delete, RotateCcw } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue === 0 ? 'Error' : firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation && !waitingForOperand) {
      const result = calculate(previousValue, inputValue, operation);

      if (result === 'Error') {
        setDisplay(result);
        setPreviousValue(null);
        setOperation(null);
        return;
      }

      const calculation = `${previousValue} ${operation} ${inputValue} = ${result}`;
      setHistory((prev) => [calculation, ...prev].slice(0, 5));

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);

    if (nextOperation === '=') {
      setOperation(null);
      setPreviousValue(null);
    } else {
      setOperation(nextOperation);
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const backspace = () => {
    if (waitingForOperand) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const Button = ({ onClick, className, children, ...props }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white text-center mb-4">Calculator</h1>

          <div className="bg-black/30 rounded-2xl p-4 mb-4 border border-white/10">
            <div className="text-right text-4xl font-mono text-white overflow-hidden">
              {display}
            </div>
          </div>

          {history.length > 0 && (
            <div className="bg-white/5 rounded-xl p-3 mb-4 max-h-32 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">History</span>
                <button
                  onClick={() => setHistory([])}
                  className="text-gray-400 hover:text-white transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              {history.map((calc, index) => (
                <div key={index} className="text-sm text-gray-300 mb-1 font-mono">
                  {calc}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={clear}
            className="bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700"
          >
            AC
          </Button>
          <Button
            onClick={toggleSign}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
          >
            ±
          </Button>
          <Button
            onClick={percentage}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
          >
            %
          </Button>
          <Button
            onClick={() => performOperation('÷')}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
          >
            ÷
          </Button>

          {[7, 8, 9].map((n) => (
            <Button
              key={n}
              onClick={() => inputNumber(n)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              {n}
            </Button>
          ))}
          <Button
            onClick={() => performOperation('×')}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
          >
            ×
          </Button>

          {[4, 5, 6].map((n) => (
            <Button
              key={n}
              onClick={() => inputNumber(n)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              {n}
            </Button>
          ))}
          <Button
            onClick={() => performOperation('-')}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
          >
            -
          </Button>

          {[1, 2, 3].map((n) => (
            <Button
              key={n}
              onClick={() => inputNumber(n)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              {n}
            </Button>
          ))}
          <Button
            onClick={() => performOperation('+')}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700"
          >
            +
          </Button>

          <Button
            onClick={() => inputNumber(0)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 col-span-2"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
          >
            .
          </Button>
          <Button
            onClick={() => performOperation('=')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
          >
            =
          </Button>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={backspace}
            className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl hover:bg-white/20 transition"
          >
            <Delete className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;