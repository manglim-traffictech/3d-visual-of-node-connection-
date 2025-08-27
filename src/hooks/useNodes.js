import { useState, useCallback } from 'react';
import { NODE_TYPES, generateNodeId } from '../utils/nodeTypes';
import { getRandomPosition, getTypeBasedPosition } from '../utils/3dHelpers';

export const useNodes = () => {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [draggedNode, setDraggedNode] = useState(null);

  const addNode = useCallback((nodeType) => {
    const existingPositions = nodes.map(node => node.position);
    const typeCount = nodes.filter(n => n.type === nodeType).length + 1;
    
    // Use organized positioning for better distribution
    let position;
    try {
      position = getTypeBasedPosition(nodeType, typeCount, existingPositions);
    } catch (error) {
      // Fallback to random positioning if type-based fails
      position = getRandomPosition(40, existingPositions);
    }
    
    const uniqueId = generateNodeId();
    const newNode = {
      ...NODE_TYPES[nodeType],
      id: uniqueId, // Ensure unique ID is not overwritten
      type: nodeType,
      position: position,
      label: `${NODE_TYPES[nodeType].name} ${typeCount}`,
    };
    
    // Debug logging to verify node creation
    console.log(`Created ${nodeType} node:`, {
      id: newNode.id,
      position: newNode.position,
      label: newNode.label,
      type: newNode.type,
      color: newNode.color
    });
    
    setNodes(prev => {
      const newArray = [...prev, newNode];
      console.log(`Total nodes: ${newArray.length}`);
      
      // Check for duplicate IDs
      const ids = newArray.map(n => n.id);
      const uniqueIds = [...new Set(ids)];
      if (ids.length !== uniqueIds.length) {
        console.error('⚠️ DUPLICATE NODE IDs DETECTED!', ids);
      }
      
      // Check for overlapping positions
      const positions = newArray.map(n => n.position.join(','));
      const uniquePositions = [...new Set(positions)];
      if (positions.length !== uniquePositions.length) {
        console.error('⚠️ OVERLAPPING NODE POSITIONS DETECTED!', positions);
      }
      
      console.log('All nodes:', newArray.map(n => ({ id: n.id.slice(-8), pos: n.position.map(p => p.toFixed(1)), type: n.type })));
      return newArray;
    });
    return newNode;
  }, [nodes]);

  const deleteNode = useCallback((nodeId) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  const updateNodeLabel = useCallback((nodeId, newLabel) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, label: newLabel } : node
    ));
  }, []);

  const updateNodePosition = useCallback((nodeId, newPosition) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, position: newPosition } : node
    ));
  }, []);

  const clearAllNodes = useCallback(() => {
    setNodes([]);
    setSelectedNode(null);
  }, []);

  const getNodeById = useCallback((nodeId) => {
    return nodes.find(node => node.id === nodeId);
  }, [nodes]);

  const startNodeDrag = useCallback((nodeId) => {
    setDraggedNode(nodeId);
  }, []);

  const stopNodeDrag = useCallback(() => {
    setDraggedNode(null);
  }, []);

  const moveNode = useCallback((nodeId, newPosition) => {
    updateNodePosition(nodeId, newPosition);
  }, [updateNodePosition]);

  return {
    nodes,
    selectedNode,
    draggedNode,
    setSelectedNode,
    addNode,
    deleteNode,
    updateNodeLabel,
    updateNodePosition,
    clearAllNodes,
    getNodeById,
    startNodeDrag,
    stopNodeDrag,
    moveNode,
  };
};