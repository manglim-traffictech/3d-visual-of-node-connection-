import { useState, useCallback, useRef } from 'react';
import { getCameraDefaultPosition, getCameraPresets } from '../utils/3dHelpers';

export const INTERACTION_MODES = {
  CONNECTION: 'connection',
  MOVE: 'move',
  CAMERA: 'camera',
};

export const use3DScene = () => {
  const [mode, setMode] = useState(INTERACTION_MODES.CONNECTION);
  const [cameraPosition, setCameraPosition] = useState(getCameraDefaultPosition());
  const [autoRotate, setAutoRotate] = useState(true);
  const cameraRef = useRef();
  const controlsRef = useRef();

  const toggleMode = useCallback(() => {
    setMode(prev => {
      if (prev === INTERACTION_MODES.CONNECTION) return INTERACTION_MODES.MOVE;
      if (prev === INTERACTION_MODES.MOVE) return INTERACTION_MODES.CAMERA;
      return INTERACTION_MODES.CONNECTION;
    });
  }, []);

  const resetCamera = useCallback(() => {
    const defaultPos = getCameraDefaultPosition();
    setCameraPosition(defaultPos);
    
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, []);

  const setCameraPreset = useCallback((presetName) => {
    const presets = getCameraPresets();
    const position = presets[presetName] || presets.default;
    setCameraPosition(position);
    
    if (controlsRef.current) {
      const controls = controlsRef.current;
      controls.object.position.set(...position);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }, []);

  const zoomTo = useCallback((distance) => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      const direction = controls.object.position.clone().normalize();
      const newPosition = direction.multiplyScalar(distance);
      controls.object.position.copy(newPosition);
      controls.update();
    }
  }, []);

  const focusOnPoint = useCallback((point) => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      controls.target.set(...point);
      controls.update();
    }
  }, []);

  const toggleAutoRotate = useCallback(() => {
    setAutoRotate(prev => !prev);
  }, []);

  const enableConnectionMode = useCallback(() => {
    setMode(INTERACTION_MODES.CONNECTION);
  }, []);

  const enableMoveMode = useCallback(() => {
    setMode(INTERACTION_MODES.MOVE);
  }, []);

  const enableCameraMode = useCallback(() => {
    setMode(INTERACTION_MODES.CAMERA);
  }, []);

  return {
    mode,
    cameraPosition,
    autoRotate,
    cameraRef,
    controlsRef,
    toggleMode,
    resetCamera,
    setCameraPreset,
    zoomTo,
    focusOnPoint,
    toggleAutoRotate,
    enableConnectionMode,
    enableMoveMode,
    enableCameraMode,
  };
};