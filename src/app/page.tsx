import React, { useState, useEffect } from 'react';

const DFSAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1000);

  const totalSteps = 13;

  // Graph structure
  const nodes = {
    A: { x: 200, y: 100 },
    B: { x: 100, y: 200 },
    C: { x: 300, y: 200 },
    D: { x: 50, y: 300 },
    E: { x: 150, y: 300 },
    F: { x: 300, y: 300 },
  };

  const edges = [
    { from: 'A', to: 'B' },
    { from: 'A', to: 'C' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'F' },
  ];

  // DFS steps explanation
  const steps = [
    { text: "Starting DFS traversal from node A", visited: [], current: 'A', stack: ['A'] },
    { text: "1. Mark A as visited", visited: ['A'], current: 'A', stack: ['A'] },
    { text: "2. Visit the first neighbor, B", visited: ['A'], current: 'B', stack: ['A', 'B'] },
    { text: "3. Mark B as visited", visited: ['A', 'B'], current: 'B', stack: ['A', 'B'] },
    { text: "4. Visit B's first neighbor, D", visited: ['A', 'B'], current: 'D', stack: ['A', 'B', 'D'] },
    { text: "5. Mark D as visited (D has no unvisited neighbors)", visited: ['A', 'B', 'D'], current: 'D', stack: ['A', 'B', 'D'] },
    { text: "6. Backtrack to B", visited: ['A', 'B', 'D'], current: 'B', stack: ['A', 'B'] },
    { text: "7. Visit B's next neighbor, E", visited: ['A', 'B', 'D'], current: 'E', stack: ['A', 'B', 'E'] },
    { text: "8. Mark E as visited (E has no unvisited neighbors)", visited: ['A', 'B', 'D', 'E'], current: 'E', stack: ['A', 'B', 'E'] },
    { text: "9. Backtrack to A", visited: ['A', 'B', 'D', 'E'], current: 'A', stack: ['A'] },
    { text: "10. Visit A's next neighbor, C", visited: ['A', 'B', 'D', 'E'], current: 'C', stack: ['A', 'C'] },
    { text: "11. Mark C as visited", visited: ['A', 'B', 'D', 'E', 'C'], current: 'C', stack: ['A', 'C'] },
    { text: "12. Visit C's neighbor, F", visited: ['A', 'B', 'D', 'E', 'C'], current: 'F', stack: ['A', 'C', 'F'] },
    { text: "13. Mark F as visited", visited: ['A', 'B', 'D', 'E', 'C', 'F'], current: 'F', stack: ['A', 'C', 'F'] },
  ];

  // Control animation
  useEffect(() => {
    let timer;
    if (animationPlaying && currentStep < totalSteps) {
      timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, animationSpeed);
    } else if (animationPlaying && currentStep >= totalSteps) {
      setAnimationPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [currentStep, animationPlaying, animationSpeed, totalSteps]);

  const handlePrevious = () => {
    setAnimationPlaying(false);
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const handleNext = () => {
    setAnimationPlaying(false);
    setCurrentStep(Math.min(totalSteps, currentStep + 1));
  };

  const handlePlayPause = () => {
    setAnimationPlaying(!animationPlaying);
  };

  const handleReset = () => {
    setAnimationPlaying(false);
    setCurrentStep(0);
  };

  const getNodeColor = (node) => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) return '#BBDEFB'; // Default color
    
    if (node === currentStepData.current) {
      return '#F44336'; // Current node (red)
    } else if (currentStepData.visited.includes(node)) {
      return '#4CAF50'; // Visited node (green)
    } else {
      return '#BBDEFB'; // Unvisited node (light blue)
    }
  };

  const getEdgeColor = (from, to) => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) return '#90A4AE';
    
    // If we're currently moving along this edge or it's part of our stack path
    if ((currentStepData.current === to && 
        currentStepData.stack.includes(from) && 
        currentStepData.stack.indexOf(from) === currentStepData.stack.indexOf(to) - 1) || 
        (currentStepData.current === from && 
        currentStepData.stack.includes(to) && 
        currentStepData.stack.indexOf(to) === currentStepData.stack.indexOf(from) - 1)) {
      return '#FF9800'; // Active edge (orange)
    }
    
    // If both nodes are visited
    if (currentStepData.visited.includes(from) && currentStepData.visited.includes(to)) {
      return '#4CAF50'; // Visited edge (green)
    }
    
    return '#90A4AE'; // Default edge color (gray)
  };

  const getEdgeWidth = (from, to) => {
    const currentStepData = steps[currentStep];
    if (!currentStepData) return 2;
    
    // If we're currently moving along this edge or it's part of our stack path
    if ((currentStepData.current === to && 
        currentStepData.stack.includes(from) && 
        currentStepData.stack.indexOf(from) === currentStepData.stack.indexOf(to) - 1) || 
        (currentStepData.current === from && 
        currentStepData.stack.includes(to) && 
        currentStepData.stack.indexOf(to) === currentStepData.stack.indexOf(from) - 1)) {
      return 4; // Highlight active edge
    }
    
    return 2; // Default edge width
  };
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Depth-First Search (DFS) Animation</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4 text-center">
        <p className="text-lg font-semibold">
          {steps[currentStep]?.text || "Ready to start DFS traversal"}
        </p>
      </div>
      
      <div className="relative w-full h-96 bg-white rounded-lg shadow mb-4 overflow-hidden">
        {/* Graph visualization */}
        <svg width="100%" height="100%" viewBox="0 0 400 400">
          {/* Edges */}
          {edges.map((edge, idx) => (
            <line 
              key={idx} 
              x1={nodes[edge.from].x} 
              y1={nodes[edge.from].y} 
              x2={nodes[edge.to].x} 
              y2={nodes[edge.to].y} 
              stroke={getEdgeColor(edge.from, edge.to)} 
              strokeWidth={getEdgeWidth(edge.from, edge.to)} 
            />
          ))}
          
          {/* Nodes */}
          {Object.entries(nodes).map(([key, node]) => (
            <g key={key}>
              <circle 
                cx={node.x} 
                cy={node.y} 
                r="25" 
                fill={getNodeColor(key)} 
                stroke="#2196F3" 
                strokeWidth="2" 
              />
              <text 
                x={node.x} 
                y={node.y} 
                textAnchor="middle" 
                dominantBaseline="middle" 
                fontSize="18" 
                fontWeight="bold"
              >
                {key}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      {/* Stack visualization */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">DFS Stack:</h3>
        <div className="flex flex-row-reverse justify-end items-center space-x-2 space-x-reverse">
          {steps[currentStep]?.stack.map((node, idx) => (
            <div 
              key={idx} 
              className="w-10 h-10 flex items-center justify-center rounded-md"
              style={{
                backgroundColor: node === steps[currentStep]?.current ? '#F44336' : '#4CAF50',
                color: 'white',
                fontWeight: 'bold'
              }}
            >
              {node}
            </div>
          ))}
          {steps[currentStep]?.stack.length === 0 && (
            <div className="text-gray-500">Empty stack</div>
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            onClick={handleNext}
            disabled={currentStep === totalSteps}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={handlePlayPause}
            className={`px-4 py-2 ${animationPlaying ? 'bg-yellow-500' : 'bg-green-500'} text-white rounded-md`}
          >
            {animationPlaying ? 'Pause' : 'Play'}
          </button>
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Reset
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm">Speed:</label>
          <select 
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="border rounded p-1"
          >
            <option value={2000}>Slow</option>
            <option value={1000}>Normal</option>
            <option value={500}>Fast</option>
          </select>
        </div>
      </div>
      
      {/* Legend */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Legend:</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Current Node</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Visited Node</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-200"></div>
            <span>Unvisited Node</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500"></div>
            <span>Active Edge</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500"></div>
            <span>Traversed Edge</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-400"></div>
            <span>Untraversed Edge</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DFSAnimation;
