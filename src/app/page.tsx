'use client'; 
import React, { useState, useEffect } from 'react';

const BFSVisualization = () => {
  // Graph definition - keeping it simple with fewer nodes
  const nodes = ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = [
    ['A', 'B'], ['A', 'C'],
    ['B', 'D'], ['B', 'E'],
    ['C', 'F']
  ];
  
  // Animation states
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1500); // slower default speed - 1.5 seconds
  
  // BFS traversal steps with clear explanations
  const bfsSteps = [
    { 
      queue: ['A'], 
      visited: ['A'], 
      current: 'A',
      description: "1. We start at node A. We add A to our queue and mark it as visited." 
    },
    { 
      queue: ['B', 'C'], 
      visited: ['A', 'B', 'C'], 
      current: '', 
      description: "2. We take A out of the queue and look at all its neighbors (B and C). We add B and C to our queue and mark them as visited." 
    },
    { 
      queue: ['C', 'D', 'E'], 
      visited: ['A', 'B', 'C', 'D', 'E'], 
      current: 'B', 
      description: "3. Next, we take B from the queue. We look at B's neighbors (D and E) and add them to our queue. We mark D and E as visited." 
    },
    { 
      queue: ['D', 'E', 'F'], 
      visited: ['A', 'B', 'C', 'D', 'E', 'F'], 
      current: 'C', 
      description: "4. Next, we take C from the queue. We look at C's neighbor (F) and add it to our queue. We mark F as visited." 
    },
    { 
      queue: ['E', 'F'], 
      visited: ['A', 'B', 'C', 'D', 'E', 'F'], 
      current: 'D', 
      description: "5. Next, we take D from the queue. D has no unvisited neighbors, so we do nothing." 
    },
    { 
      queue: ['F'], 
      visited: ['A', 'B', 'C', 'D', 'E', 'F'], 
      current: 'E', 
      description: "6. Next, we take E from the queue. E has no unvisited neighbors, so we do nothing." 
    },
    { 
      queue: [], 
      visited: ['A', 'B', 'C', 'D', 'E', 'F'], 
      current: 'F', 
      description: "7. Finally, we take F from the queue. F has no unvisited neighbors. Our queue is now empty, so BFS is complete!" 
    }
  ];
  
  // Handle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Handle steps
  const nextStep = () => {
    if (currentStep < bfsSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const resetStep = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  // Animation effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStep < bfsSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, speed, bfsSteps.length]);
  
  // Calculate node positions for a clearer layout
  const nodePositions = {
    'A': { x: 200, y: 50 },
    'B': { x: 100, y: 150 },
    'C': { x: 300, y: 150 },
    'D': { x: 50, y: 250 },
    'E': { x: 150, y: 250 },
    'F': { x: 350, y: 250 }
  };
  
  // Get current state
  const currentState = bfsSteps[currentStep];
  
  // Node color based on state - using more distinct colors
  const getNodeColor = (node) => {
    if (node === currentState.current) return "#FF5733"; // Bright orange for current node
    if (currentState.queue.includes(node)) return "#FFCC00"; // Yellow for nodes in queue
    if (currentState.visited.includes(node)) return "#4CAF50"; // Green for visited nodes
    return "#BBDEFB"; // Light blue for unvisited nodes
  };
  
  // Edge color based on state
  const getEdgeColor = (from, to) => {
    const fromVisited = currentState.visited.includes(from);
    const toVisited = currentState.visited.includes(to);
    
    // If both nodes are visited, highlight the edge
    if (fromVisited && toVisited) {
      // Special highlight for the current node's connections
      if (from === currentState.current || to === currentState.current) {
        return "#FF5733"; // Bright orange for current connections
      }
      return "#666666"; // Dark gray for other visited connections
    }
    
    return "#DDDDDD"; // Light gray for unvisited connections
  };
  
  // Inline styles
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto'
  };
  
  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center'
  };
  
  const legendContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  };
  
  const legendItemStyle = {
    display: 'flex',
    alignItems: 'center'
  };
  
  const legendColorBoxStyle = (color) => ({
    width: '16px',
    height: '16px',
    backgroundColor: color,
    marginRight: '4px',
    border: '1px solid #333'
  });
  
  const svgContainerStyle = {
    border: '1px solid #ccc',
    marginBottom: '16px',
    backgroundColor: '#f9f9f9'
  };
  
  const queueContainerStyle = {
    marginBottom: '16px',
    width: '100%',
    maxWidth: '450px'
  };
  
  const queueTitleStyle = {
    fontWeight: 'bold',
    fontSize: '18px'
  };
  
  const queueDisplayStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
    padding: '16px',
    border: '1px solid #ccc',
    minHeight: '60px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px'
  };
  
  const queueNodeStyle = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCC00',
    borderRadius: '50%',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '2px solid #666'
  };
  
  const emptyQueueTextStyle = {
    color: '#666'
  };
  
  const queueHintStyle = {
    marginLeft: '8px',
    color: '#666'
  };
  
  const descriptionContainerStyle = {
    marginBottom: '16px',
    padding: '16px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '450px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px'
  };
  
  const descriptionTextStyle = {
    fontSize: '18px'
  };
  
  const stepCounterStyle = {
    marginBottom: '16px',
    textAlign: 'center'
  };
  
  const stepBoldStyle = {
    fontWeight: 'bold'
  };
  
  const controlsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  };
  
  const buttonStyle = (color) => ({
    padding: '8px 16px',
    backgroundColor: color,
    color: 'white',
    borderRadius: '8px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  });
  
  const disabledButtonStyle = {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  };
  
  const speedControlContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };
  
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Breadth First Search (BFS)</h2>
      
      {/* Legend */}
      <div style={legendContainerStyle}>
        <div style={legendItemStyle}>
          <div style={legendColorBoxStyle('#BBDEFB')}></div>
          <span>Unvisited</span>
        </div>
        <div style={legendItemStyle}>
          <div style={legendColorBoxStyle('#FFCC00')}></div>
          <span>In Queue</span>
        </div>
        <div style={legendItemStyle}>
          <div style={legendColorBoxStyle('#4CAF50')}></div>
          <span>Visited</span>
        </div>
        <div style={legendItemStyle}>
          <div style={legendColorBoxStyle('#FF5733')}></div>
          <span>Current</span>
        </div>
      </div>
      
      {/* SVG Graph */}
      <svg width="400" height="300" style={svgContainerStyle}>
        {/* Draw edges */}
        {edges.map(([from, to], idx) => (
          <line 
            key={idx}
            x1={nodePositions[from].x} 
            y1={nodePositions[from].y}
            x2={nodePositions[to].x} 
            y2={nodePositions[to].y}
            stroke={getEdgeColor(from, to)}
            strokeWidth="3"
          />
        ))}
        
        {/* Draw nodes */}
        {nodes.map((node) => (
          <g key={node}>
            <circle 
              cx={nodePositions[node].x} 
              cy={nodePositions[node].y} 
              r="25" 
              fill={getNodeColor(node)}
              stroke="#333"
              strokeWidth="2"
            />
            <text 
              x={nodePositions[node].x} 
              y={nodePositions[node].y + 6} 
              textAnchor="middle" 
              fill="#000"
              fontSize="18"
              fontWeight="bold"
            >
              {node}
            </text>
          </g>
        ))}
      </svg>
      
      {/* Queue Visualization */}
      <div style={queueContainerStyle}>
        <h3 style={queueTitleStyle}>Queue:</h3>
        <div style={queueDisplayStyle}>
          {currentState.queue.length > 0 ? (
            <>
              {currentState.queue.map((node, idx) => (
                <div key={idx} style={queueNodeStyle}>
                  {node}
                </div>
              ))}
              <div style={queueHintStyle}>← Next to process</div>
            </>
          ) : (
            <div style={emptyQueueTextStyle}>Queue is empty - BFS is complete!</div>
          )}
        </div>
      </div>
      
      {/* Description */}
      <div style={descriptionContainerStyle}>
        <p style={descriptionTextStyle}>{currentState.description}</p>
      </div>
      
      {/* Step Counter */}
      <div style={stepCounterStyle}>
        <span style={stepBoldStyle}>Step {currentStep + 1}</span> of {bfsSteps.length}
      </div>
      
      {/* Controls */}
      <div style={controlsContainerStyle}>
        <button 
          onClick={prevStep} 
          disabled={currentStep === 0}
          style={currentStep === 0 ? {...buttonStyle('#3498db'), ...disabledButtonStyle} : buttonStyle('#3498db')}
        >
          ← Previous
        </button>
        <button 
          onClick={togglePlay} 
          style={buttonStyle('#2ecc71')}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button 
          onClick={nextStep} 
          disabled={currentStep === bfsSteps.length - 1}
          style={currentStep === bfsSteps.length - 1 ? {...buttonStyle('#3498db'), ...disabledButtonStyle} : buttonStyle('#3498db')}
        >
          Next →
        </button>
        <button 
          onClick={resetStep} 
          style={buttonStyle('#e74c3c')}
        >
          Reset
        </button>
      </div>
      
      {/* Speed Control */}
      <div style={speedControlContainerStyle}>
        <span>Speed:</span>
        <input 
          type="range" 
          min="500" 
          max="3000" 
          step="500" 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))} 
          style={{width: '120px'}}
        />
        <span>{speed/1000} seconds</span>
      </div>
    </div>
  );
};

export default BFSVisualization;
