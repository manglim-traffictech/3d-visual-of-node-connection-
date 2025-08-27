import * as THREE from 'three';

export const getRandomPosition = (range = 30, existingPositions = []) => {
  let attempts = 0;
  const maxAttempts = 100;
  const minDistance = 6; // Minimum distance between nodes
  
  while (attempts < maxAttempts) {
    const position = [
      (Math.random() - 0.5) * range,
      (Math.random() - 0.5) * range,
      (Math.random() - 0.5) * range,
    ];
    
    // Check if this position is far enough from existing nodes
    let validPosition = true;
    for (const existingPos of existingPositions) {
      const distance = Math.sqrt(
        Math.pow(position[0] - existingPos[0], 2) +
        Math.pow(position[1] - existingPos[1], 2) +
        Math.pow(position[2] - existingPos[2], 2)
      );
      
      if (distance < minDistance) {
        validPosition = false;
        break;
      }
    }
    
    if (validPosition) {
      return position;
    }
    
    attempts++;
  }
  
  // If we can't find a good position after max attempts, just return a random one
  // but add some randomness to avoid exact overlap
  return [
    (Math.random() - 0.5) * range + (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * range + (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * range + (Math.random() - 0.5) * 2,
  ];
};

export const getTypeBasedPosition = (nodeType, typeCount, existingPositions = []) => {
  // Create different positioning patterns for different node types
  const patterns = {
    PARENT: {
      // Parents in upper level, spread in a circle
      angle: (typeCount - 1) * (Math.PI * 2 / 6), // 6 positions around circle
      radius: 12 + (Math.floor((typeCount - 1) / 6) * 8), // Expand outward in rings
      y: 8 + Math.floor((typeCount - 1) / 6) * 6, // Higher Y for parents
    },
    CHILD: {
      // Children in middle level, grid pattern
      x: ((typeCount - 1) % 4) * 10 - 15, // 4 columns, wider spacing
      z: Math.floor((typeCount - 1) / 4) * 10 - 15, // Multiple rows, wider spacing
      y: 0, // Middle Y for children
    },
    SUBPROCESS: {
      // Sub-processes in lower level, scattered
      angle: (typeCount - 1) * (Math.PI * 2 / 5) + Math.PI / 5, // Offset from parents
      radius: 10 + (Math.floor((typeCount - 1) / 5) * 6),
      y: -8 - Math.floor((typeCount - 1) / 5) * 4, // Lowest Y for sub-processes
    }
  };

  let position;
  const pattern = patterns[nodeType];

  if (nodeType === 'PARENT' || nodeType === 'SUBPROCESS') {
    // Circular pattern
    position = [
      Math.cos(pattern.angle) * pattern.radius,
      pattern.y,
      Math.sin(pattern.angle) * pattern.radius
    ];
  } else if (nodeType === 'CHILD') {
    // Grid pattern
    position = [pattern.x, pattern.y, pattern.z];
  }

  // Add some randomness to avoid perfectly rigid patterns
  position = position.map(coord => coord + (Math.random() - 0.5) * 4);
  
  console.log(`Type-based position for ${nodeType} #${typeCount}:`, position);

  // Check for conflicts and adjust if necessary
  let attempts = 0;
  while (attempts < 10) {
    let tooClose = false;
    for (const existingPos of existingPositions) {
      const distance = Math.sqrt(
        Math.pow(position[0] - existingPos[0], 2) +
        Math.pow(position[1] - existingPos[1], 2) +
        Math.pow(position[2] - existingPos[2], 2)
      );
      
      if (distance < 6) {
        // Adjust position
        position[0] += (Math.random() - 0.5) * 8;
        position[2] += (Math.random() - 0.5) * 8;
        tooClose = true;
        break;
      }
    }
    
    if (!tooClose) break;
    attempts++;
  }

  return position;
};

export const createCurvedLine = (start, end) => {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  
  const midPoint = new THREE.Vector3()
    .addVectors(startVec, endVec)
    .multiplyScalar(0.5);
  
  const distance = startVec.distanceTo(endVec);
  const curveHeight = distance * 0.3;
  
  midPoint.y += curveHeight;
  
  const curve = new THREE.QuadraticBezierCurve3(startVec, midPoint, endVec);
  const points = curve.getPoints(50);
  
  return points;
};

export const getCameraDefaultPosition = () => [15, 15, 15];

export const getCameraPresets = () => ({
  default: [15, 15, 15],
  top: [0, 30, 0],
  front: [0, 0, 25],
  side: [25, 0, 0],
  isometric: [15, 15, 15],
  bird: [0, 50, 10],
  close: [8, 8, 8],
  far: [30, 30, 30]
});

export const getLightPositions = () => ({
  directional: [5, 10, 5],
  point1: [-10, 10, -10],
  point2: [10, -10, 10],
});