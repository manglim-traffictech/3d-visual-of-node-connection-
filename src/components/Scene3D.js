import React, { Suspense, useRef, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, Float } from '@react-three/drei';
import { View } from 'react-native';
import * as THREE from 'three';
import { INTERACTION_MODES } from '../hooks/use3DScene';
import { createCurvedLine, getLightPositions } from '../utils/3dHelpers';
import LoadingScreen from './LoadingScreen';

const Node3D = ({ node, isSelected, onSelect, onStartDrag, onCompleteDrag, onStartMove, onMove, onStopMove, mode, isDragged, isSelectedForConnection, onSelectForConnection }) => {
  const meshRef = useRef();
  const glowRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current && !isSelected) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
    
    // Pulsing glow effect
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.1 + 0.9;
      glowRef.current.material.emissiveIntensity = pulse * (isSelected ? 0.5 : 0.2);
    }
  });

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    // Three.js events don't always have preventDefault
    if (e.preventDefault) {
      e.preventDefault();
    }
    
    console.log(`🖱️ Node clicked: ${node.id} (type: ${node.type}, mode: ${mode}, position: [${node.position.join(',')}])`);
    
    if (mode === INTERACTION_MODES.CONNECTION) {
      console.log(`✨ Selecting node for connection: ${node.id}`);
      onSelectForConnection(node.id);
    } else {
      console.log(`✨ Selecting node normally: ${node.id}`);
      onSelect(node);
      if (mode === INTERACTION_MODES.MOVE) {
        onStartMove(node.id);
      }
    }
  }, [node, onSelect, onSelectForConnection, onStartMove, mode]);

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation();
    if (mode === INTERACTION_MODES.CONNECTION && onCompleteDrag) {
      onCompleteDrag(node.id);
    } else if (mode === INTERACTION_MODES.MOVE) {
      onStopMove();
    }
  }, [node, mode, onCompleteDrag, onStopMove]);

  const handlePointerOver = useCallback(() => {
    if (mode === INTERACTION_MODES.MOVE) {
      document.body.style.cursor = 'move';
    } else {
      document.body.style.cursor = 'pointer';
    }
  }, [mode]);

  const handlePointerOut = useCallback(() => {
    document.body.style.cursor = 'default';
  }, []);

  const geometry = () => {
    switch (node.geometry) {
      case 'sphere':
        return <sphereGeometry args={[node.size, 32, 32]} />;
      case 'box':
        return <boxGeometry args={[node.size, node.size, node.size]} />;
      case 'cone':
        return <coneGeometry args={[node.size * 0.8, node.size * 1.5, 8]} />;
      default:
        return <sphereGeometry args={[node.size, 32, 32]} />;
    }
  };

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group>
        {/* Main node */}
        <mesh
          ref={meshRef}
          position={node.position}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={isSelected ? 1.3 : isDragged ? 1.4 : 1}
        >
          {geometry()}
          <meshPhongMaterial
            color={node.color}
            emissive={node.emissive}
            emissiveIntensity={0.2}
            shininess={100}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Glow effect */}
        <mesh
          ref={glowRef}
          position={node.position}
          scale={isSelected ? 1.8 : 1.4}
        >
          {geometry()}
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.1}
          />
        </mesh>
        
        {/* Selection indicator */}
        {isSelected && (
          <mesh position={node.position} scale={1.6}>
            <ringGeometry args={[1, 1.2, 32]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        
        {/* Movement indicator */}
        {isDragged && (
          <mesh position={node.position} scale={2.2}>
            <ringGeometry args={[1.2, 1.4, 32]} />
            <meshBasicMaterial
              color="#10B981"
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        
        {/* Connection selection indicator */}
        {isSelectedForConnection && (
          <mesh position={node.position} scale={1.9}>
            <ringGeometry args={[1.1, 1.3, 32]} />
            <meshBasicMaterial
              color="#F59E0B"
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
        
        {/* Debug ID label */}
        <group position={[node.position[0], node.position[1] + 2, node.position[2]]}>
          <mesh>
            <planeGeometry args={[3, 0.8]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.7} />
          </mesh>
        </group>
      </group>
    </Float>
  );
};

const Connection3D = ({ connection, nodes }) => {
  const lineRef = useRef();
  const fromNode = nodes.find(n => n.id === connection.fromNodeId);
  const toNode = nodes.find(n => n.id === connection.toNodeId);

  const points = useMemo(() => {
    if (!fromNode || !toNode) return [];
    return createCurvedLine(fromNode.position, toNode.position);
  }, [fromNode, toNode]);

  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.getElapsedTime();
      lineRef.current.material.opacity = 0.6 + Math.sin(time * 3) * 0.2;
    }
  });

  if (!fromNode || !toNode || points.length === 0) return null;

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <group>
      {/* Main connection line */}
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial 
          color="#6366f1" 
          transparent
          opacity={0.8}
        />
      </line>
      
      {/* Glowing effect */}
      <line geometry={geometry}>
        <lineBasicMaterial 
          color="#8b5cf6" 
          transparent
          opacity={0.3}
        />
      </line>
    </group>
  );
};

const DragConnection = ({ dragConnection, nodes }) => {
  if (!dragConnection || !dragConnection.currentPosition) return null;

  const fromNode = nodes.find(n => n.id === dragConnection.fromNodeId);
  if (!fromNode) return null;

  const points = [
    new THREE.Vector3(...fromNode.position),
    new THREE.Vector3(...dragConnection.currentPosition),
  ];
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#ef4444" linewidth={3} />
    </line>
  );
};

const DragHelper = ({ draggedNodeId, onMove }) => {
  const { camera, raycaster } = useThree();
  const planeRef = useRef();
  
  React.useEffect(() => {
    if (!draggedNodeId) return;

    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();
    
    const handlePointerMove = (event) => {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      if (raycaster.ray.intersectPlane(plane, intersection)) {
        onMove(draggedNodeId, [intersection.x, intersection.y, intersection.z]);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [draggedNodeId, onMove, camera, raycaster]);

  return null;
};

const SceneLights = () => {
  const lights = getLightPositions();
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={lights.directional}
        intensity={1}
        color="#ffffff"
        castShadow
      />
      <pointLight
        position={lights.point1}
        intensity={0.8}
        color="#3B82F6"
        distance={20}
      />
      <pointLight
        position={lights.point2}
        intensity={0.8}
        color="#10B981"
        distance={20}
      />
    </>
  );
};

const AnimatedBackground = ({ autoRotate }) => {
  const groupRef = useRef();
  const sparklesRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
    
    if (sparklesRef.current) {
      sparklesRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      sparklesRef.current.rotation.z = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={6}
          saturation={0.3}
          fade
        />
      </group>
      
      <group ref={sparklesRef}>
        <Sparkles
          count={100}
          scale={[20, 20, 20]}
          size={2}
          speed={0.3}
          color="#3B82F6"
        />
      </group>
      
      {/* Nebula effect */}
      <mesh scale={[100, 100, 100]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

const Scene3D = ({
  nodes,
  connections,
  selectedNode,
  draggedNode,
  dragConnection,
  selectedForConnection,
  mode,
  autoRotate,
  cameraRef,
  controlsRef,
  onSelectNode,
  onStartDragConnection,
  onCompleteDragConnection,
  onCancelDragConnection,
  onStartNodeDrag,
  onMoveNode,
  onStopNodeDrag,
  onSelectForConnection
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStartNode, setDragStartNode] = React.useState(null);

  const handleNodePointerDown = useCallback((nodeId, position) => {
    if (mode === INTERACTION_MODES.CONNECTION) {
      setIsDragging(true);
      setDragStartNode(nodeId);
      onStartDragConnection(nodeId, position);
    }
  }, [mode, onStartDragConnection]);

  const handleNodePointerUp = useCallback((nodeId) => {
    if (isDragging && dragStartNode && dragStartNode !== nodeId && mode === INTERACTION_MODES.CONNECTION) {
      onCompleteDragConnection(nodeId);
    }
    setIsDragging(false);
    setDragStartNode(null);
  }, [isDragging, dragStartNode, mode, onCompleteDragConnection]);

  const handleCanvasPointerMove = useCallback((e) => {
    // Canvas pointer move - for now we'll let individual nodes handle this
  }, []);

  const handleCanvasPointerUp = useCallback(() => {
    if (isDragging || dragConnection) {
      onCancelDragConnection();
      setIsDragging(false);
      setDragStartNode(null);
    }
    if (draggedNode) {
      onStopNodeDrag();
    }
  }, [isDragging, dragConnection, draggedNode, onCancelDragConnection, onStopNodeDrag]);

  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ 
          position: [15, 15, 15], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        onPointerMove={handleCanvasPointerMove}
        onPointerUp={handleCanvasPointerUp}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        shadows
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <SceneLights />
          <AnimatedBackground autoRotate={autoRotate} />
          
          <DragHelper draggedNodeId={draggedNode} onMove={onMoveNode} />
          
          {nodes.map((node, index) => {
            const isSelected = selectedNode?.id === node.id;
            const isForConnection = selectedForConnection === node.id;
            
            // Only log during selection changes to reduce spam
            if (isSelected || isForConnection) {
              console.log(`Node #${index}: ID=${node.id}, pos=[${node.position.join(',')}], selected=${isSelected}, forConnection=${isForConnection}`);
            }
            
            // Debug log selection state
            if (isSelected) {
              console.log(`🔵 Node ${node.id} is SELECTED (selectedNode.id: ${selectedNode?.id})`);
            }
            if (isForConnection) {
              console.log(`🟡 Node ${node.id} is SELECTED FOR CONNECTION (selectedForConnection: ${selectedForConnection})`);
            }
            
            return (
              <Node3D
                key={node.id}
                node={node}
                isSelected={isSelected}
                isDragged={draggedNode === node.id}
                isSelectedForConnection={isForConnection}
                onSelect={onSelectNode}
                onStartDrag={handleNodePointerDown}
                onCompleteDrag={handleNodePointerUp}
                onStartMove={onStartNodeDrag}
                onMove={onMoveNode}
                onStopMove={onStopNodeDrag}
                onSelectForConnection={onSelectForConnection}
                mode={mode}
              />
            );
          })}

          {connections.map((connection) => (
            <Connection3D
              key={connection.id}
              connection={connection}
              nodes={nodes}
            />
          ))}

          <DragConnection dragConnection={dragConnection} nodes={nodes} />

          <OrbitControls
            ref={controlsRef}
            enabled={mode === INTERACTION_MODES.CAMERA && !draggedNode}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            dampingFactor={0.05}
            enableDamping={true}
            rotateSpeed={0.5}
            panSpeed={0.8}
            zoomSpeed={1.2}
            minDistance={1}
            maxDistance={500}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Infinity}
            maxAzimuthAngle={Infinity}
            autoRotate={false}
            autoRotateSpeed={2.0}
            keys={{
              LEFT: 'ArrowLeft',
              UP: 'ArrowUp', 
              RIGHT: 'ArrowRight',
              BOTTOM: 'ArrowDown'
            }}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.DOLLY,
              RIGHT: THREE.MOUSE.PAN
            }}
            touches={{
              ONE: THREE.TOUCH.ROTATE,
              TWO: THREE.TOUCH.DOLLY_PAN
            }}
          />
        </Suspense>
      </Canvas>
    </View>
  );
};

export default Scene3D;