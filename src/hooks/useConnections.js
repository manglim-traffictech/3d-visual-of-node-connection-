import { useState, useCallback } from 'react';
import { generateConnectionId } from '../utils/nodeTypes';

export const useConnections = () => {
  const [connections, setConnections] = useState([]);
  const [dragConnection, setDragConnection] = useState(null);
  const [selectedForConnection, setSelectedForConnection] = useState(null);

  const addConnection = useCallback((fromNodeId, toNodeId) => {
    const existingConnection = connections.find(
      conn => 
        (conn.fromNodeId === fromNodeId && conn.toNodeId === toNodeId) ||
        (conn.fromNodeId === toNodeId && conn.toNodeId === fromNodeId)
    );

    if (existingConnection || fromNodeId === toNodeId) {
      return null;
    }

    const newConnection = {
      id: generateConnectionId(),
      fromNodeId,
      toNodeId,
    };

    setConnections(prev => [...prev, newConnection]);
    return newConnection;
  }, [connections]);

  const deleteConnection = useCallback((connectionId) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  }, []);

  const deleteConnectionsByNode = useCallback((nodeId) => {
    setConnections(prev => prev.filter(
      conn => conn.fromNodeId !== nodeId && conn.toNodeId !== nodeId
    ));
  }, []);

  const clearAllConnections = useCallback(() => {
    setConnections([]);
    setDragConnection(null);
  }, []);

  const startDragConnection = useCallback((nodeId, mousePosition = [0, 0, 0]) => {
    setDragConnection({
      fromNodeId: nodeId,
      currentPosition: mousePosition,
    });
  }, []);

  const updateDragConnection = useCallback((mousePosition) => {
    setDragConnection(prev => 
      prev ? { ...prev, currentPosition: mousePosition } : null
    );
  }, []);

  const completeDragConnection = useCallback((toNodeId) => {
    if (dragConnection && dragConnection.fromNodeId !== toNodeId) {
      addConnection(dragConnection.fromNodeId, toNodeId);
    }
    setDragConnection(null);
  }, [dragConnection, addConnection]);

  const cancelDragConnection = useCallback(() => {
    setDragConnection(null);
  }, []);

  const selectNodeForConnection = useCallback((nodeId) => {
    if (selectedForConnection === null) {
      setSelectedForConnection(nodeId);
      console.log(`Selected node for connection: ${nodeId}`);
    } else if (selectedForConnection === nodeId) {
      setSelectedForConnection(null);
      console.log('Deselected node for connection');
    } else {
      const connection = addConnection(selectedForConnection, nodeId);
      if (connection) {
        console.log(`Created connection: ${selectedForConnection} -> ${nodeId}`);
      } else {
        console.log('Connection already exists or invalid');
      }
      setSelectedForConnection(null);
    }
  }, [selectedForConnection, addConnection]);

  const clearConnectionSelection = useCallback(() => {
    setSelectedForConnection(null);
  }, []);

  return {
    connections,
    dragConnection,
    selectedForConnection,
    addConnection,
    deleteConnection,
    deleteConnectionsByNode,
    clearAllConnections,
    startDragConnection,
    updateDragConnection,
    completeDragConnection,
    cancelDragConnection,
    selectNodeForConnection,
    clearConnectionSelection,
  };
};