import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Scene3D from './components/Scene3D';
import ControlPanel from './components/ControlPanel';
import NodeListPanel from './components/NodeListPanel';
import ConnectionListPanel from './components/ConnectionListPanel';
import ModeIndicator from './components/ModeIndicator';
import Legend from './components/Legend';
import CameraControls from './components/CameraControls';
import { useNodes } from './hooks/useNodes';
import { useConnections } from './hooks/useConnections';
import { use3DScene } from './hooks/use3DScene';

const App = () => {
  const {
    nodes,
    selectedNode,
    draggedNode,
    setSelectedNode,
    addNode,
    deleteNode,
    updateNodeLabel,
    clearAllNodes,
    getNodeById,
    startNodeDrag,
    stopNodeDrag,
    moveNode,
  } = useNodes();

  const {
    connections,
    dragConnection,
    selectedForConnection,
    deleteConnection,
    deleteConnectionsByNode,
    clearAllConnections,
    startDragConnection,
    updateDragConnection,
    completeDragConnection,
    cancelDragConnection,
    selectNodeForConnection,
    clearConnectionSelection,
  } = useConnections();

  const {
    mode,
    autoRotate,
    cameraRef,
    controlsRef,
    toggleMode,
    resetCamera,
    setCameraPreset,
    zoomTo,
    focusOnPoint,
    toggleAutoRotate,
  } = use3DScene();

  // Handle node operations
  const handleAddNode = useCallback((nodeType) => {
    addNode(nodeType);
  }, [addNode]);

  const handleDeleteNode = useCallback((nodeId) => {
    deleteConnectionsByNode(nodeId);
    deleteNode(nodeId);
  }, [deleteNode, deleteConnectionsByNode]);

  const handleEditNodeLabel = useCallback((nodeId, newLabel) => {
    updateNodeLabel(nodeId, newLabel);
  }, [updateNodeLabel]);

  const handleSelectNode = useCallback((node) => {
    setSelectedNode(node);
  }, [setSelectedNode]);

  // Handle connection operations
  const handleStartDragConnection = useCallback((nodeId, position) => {
    startDragConnection(nodeId, position);
  }, [startDragConnection]);

  const handleCompleteDragConnection = useCallback((toNodeId) => {
    completeDragConnection(toNodeId);
  }, [completeDragConnection]);

  const handleDeleteConnection = useCallback((connectionId) => {
    deleteConnection(connectionId);
  }, [deleteConnection]);

  // Handle clear all
  const handleClearAll = useCallback(() => {
    clearAllNodes();
    clearAllConnections();
  }, [clearAllNodes, clearAllConnections]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      // ESC key to cancel drag connection or clear connection selection
      if (event.key === 'Escape') {
        if (dragConnection) {
          cancelDragConnection();
        } else if (selectedForConnection) {
          clearConnectionSelection();
        }
      }
      
      // Space to toggle mode
      if (event.key === ' ') {
        event.preventDefault();
        toggleMode();
      }
      
      // R to reset camera
      if (event.key === 'r' || event.key === 'R') {
        resetCamera();
      }
      
      // Zoom controls
      if (event.key === '+' || event.key === '=') {
        zoomTo(5); // Zoom in close
      }
      if (event.key === '-' || event.key === '_') {
        zoomTo(50); // Zoom out far
      }
      
      // Camera presets
      if (event.key === 't' || event.key === 'T') {
        setCameraPreset('top');
      }
      if (event.key === 'f' || event.key === 'F') {
        setCameraPreset('front');
      }
      if (event.key === 'b' || event.key === 'B') {
        setCameraPreset('bird');
      }
      
      // Quick add nodes
      if (event.key === '1') addNode('PARENT');
      if (event.key === '2') addNode('CHILD');
      if (event.key === '3') addNode('SUBPROCESS');
      
      // Delete selected node
      if (event.key === 'Delete' && selectedNode) {
        handleDeleteNode(selectedNode.id);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [
    dragConnection,
    selectedNode,
    selectedForConnection,
    cancelDragConnection,
    clearConnectionSelection,
    toggleMode,
    resetCamera,
    zoomTo,
    setCameraPreset,
    addNode,
    handleDeleteNode,
  ]);

  return (
    <View style={styles.container}>
      {/* 3D Scene */}
      <Scene3D
        nodes={nodes}
        connections={connections}
        selectedNode={selectedNode}
        draggedNode={draggedNode}
        dragConnection={dragConnection}
        selectedForConnection={selectedForConnection}
        mode={mode}
        autoRotate={autoRotate}
        cameraRef={cameraRef}
        controlsRef={controlsRef}
        onSelectNode={handleSelectNode}
        onStartDragConnection={handleStartDragConnection}
        onCompleteDragConnection={handleCompleteDragConnection}
        onCancelDragConnection={cancelDragConnection}
        onStartNodeDrag={startNodeDrag}
        onMoveNode={moveNode}
        onStopNodeDrag={stopNodeDrag}
        onSelectForConnection={selectNodeForConnection}
      />

      {/* UI Overlays */}
      <ControlPanel
        onAddNode={handleAddNode}
        onClearAll={handleClearAll}
        onResetCamera={resetCamera}
        onToggleMode={toggleMode}
        onToggleAutoRotate={toggleAutoRotate}
        onZoomTo={zoomTo}
        mode={mode}
        autoRotate={autoRotate}
        nodeCount={nodes.length}
        connectionCount={connections.length}
        selectedForConnection={selectedForConnection}
      />

      <ModeIndicator mode={mode} />

      <NodeListPanel
        nodes={nodes}
        selectedNode={selectedNode}
        onSelectNode={handleSelectNode}
        onEditNodeLabel={handleEditNodeLabel}
        onDeleteNode={handleDeleteNode}
      />

      <ConnectionListPanel
        connections={connections}
        nodes={nodes}
        onDeleteConnection={handleDeleteConnection}
      />

      <Legend />

      <CameraControls
        onSetPreset={setCameraPreset}
        onZoomTo={zoomTo}
        onResetCamera={resetCamera}
        onFocusOnPoint={focusOnPoint}
        isVisible={mode === 'camera'}
      />

      {/* Global Styles */}
      <style>{`
        * {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: radial-gradient(circle at center, #1a1a2e 0%, #16213e 30%, #0f0f0f 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          cursor: default;
        }

        canvas {
          display: block;
        }

        /* Loading spinner animation */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }

        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Glassmorphism effects */
        .glass {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Glow effects */
        .glow {
          box-shadow: 
            0 0 20px rgba(59, 130, 246, 0.3),
            0 0 40px rgba(59, 130, 246, 0.2),
            0 0 80px rgba(59, 130, 246, 0.1);
        }

        /* Button hover effects */
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        /* Smooth transitions */
        * {
          transition: all 0.2s ease-in-out;
        }

        /* Text selection disable */
        input, textarea {
          user-select: text !important;
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
        }

        /* Focus styles */
        input:focus, textarea:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0a0a0a',
    position: 'relative',
  },
});

export default App;