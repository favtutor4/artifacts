'use client'; 
import React, { useState, useEffect } from 'react';

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sorted, setSorted] = useState([]);
  const [speed, setSpeed] = useState(500); // milliseconds between steps

  // Generate a new random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 5);
    }
    setArray(newArray);
    setSorted([]);
    setCurrentStep(-1);
    setComparing([-1, -1]);
  };

  // Initialize with a random array
  useEffect(() => {
    generateArray();
  }, []);

  // The bubble sort animation logic
  const startBubbleSort = async () => {
    if (sortingInProgress) return;
    
    setSortingInProgress(true);
    setCurrentStep(0);
    
    const arrayCopy = [...array];
    const n = arrayCopy.length;
    const newSorted = [];
    
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the elements being compared
        setComparing([j, j + 1]);
        setCurrentStep(prev => prev + 1);
        
        // Pause to show the comparison
        await new Promise(resolve => setTimeout(resolve, speed));
        
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap the elements
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          setArray([...arrayCopy]);
          
          // Pause after the swap
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
      
      // Mark elements as sorted
      newSorted.unshift(n - i - 1);
      setSorted([...newSorted]);
    }
    
    // Animation complete
    setComparing([-1, -1]);
    setSortingInProgress(false);
  };

  // Reset the visualization
  const resetSort = () => {
    generateArray();
    setSortingInProgress(false);
  };

  // Change animation speed
  const handleSpeedChange = (e) => {
    setSpeed(1000 - e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-4 w-full max-w-3xl mx-auto bg-gray-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Bubble Sort Visualization</h1>
      
      <div className="flex justify-center mb-6 w-full">
        <button
          onClick={startBubbleSort}
          disabled={sortingInProgress}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4 disabled:bg-blue-300"
        >
          Start Sorting
        </button>
        
        <button
          onClick={resetSort}
          disabled={sortingInProgress}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-4 disabled:bg-gray-300"
        >
          Reset
        </button>
        
        <div className="flex items-center">
          <span className="mr-2">Speed:</span>
          <input
            type="range"
            min="100"
            max="900"
            value={1000 - speed}
            onChange={handleSpeedChange}
            disabled={sortingInProgress}
            className="w-32"
          />
        </div>
      </div>
      
      <div className="relative h-64 w-full flex items-end justify-center border-b-2 border-gray-300 mb-4">
        {array.map((value, index) => (
          <div
            key={index}
            className={`
              mx-1 w-12 flex items-center justify-center
              ${comparing.includes(index) ? 'bg-yellow-400' : 
                sorted.includes(index) ? 'bg-green-400' : 'bg-blue-400'}
              transition-all duration-300
            `}
            style={{
              height: `${value * 2}px`,
            }}
          >
            <span className="text-xs font-semibold">{value}</span>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        {sortingInProgress ? (
          <p>Step: {currentStep}</p>
        ) : (
          <p>{currentStep < 0 ? "Click 'Start Sorting' to begin" : "Sorting complete!"}</p>
        )}
      </div>
      
      <div className="mt-4 w-full max-w-lg bg-white rounded p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">Bubble Sort Explanation</h2>
        <p className="text-sm">
          Bubble sort is a simple sorting algorithm that repeatedly steps through the list,
          compares adjacent elements, and swaps them if they are in the wrong order.
          The pass through the list is repeated until the list is sorted.
        </p>
        <ul className="text-sm mt-2 list-disc pl-6">
          <li><span className="bg-yellow-200 px-1">Yellow</span>: Elements being compared</li>
          <li><span className="bg-green-200 px-1">Green</span>: Elements in their final sorted position</li>
          <li><span className="bg-blue-200 px-1">Blue</span>: Unsorted elements</li>
        </ul>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
