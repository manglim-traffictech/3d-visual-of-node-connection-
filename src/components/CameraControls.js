import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, style, variant = 'default', size = 'small' }) => {
  const baseStyle = {
    paddingHorizontal: size === 'small' ? 8 : 12,
    paddingVertical: size === 'small' ? 4 : 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    marginVertical: 2,
    minWidth: size === 'small' ? 60 : 80,
  };

  const variants = {
    default: {
      backgroundColor: 'rgba(75, 85, 99, 0.8)',
      borderWidth: 1,
      borderColor: '#6B7280',
    },
    preset: {
      backgroundColor: 'rgba(99, 102, 241, 0.7)',
      borderWidth: 1,
      borderColor: '#6366F1',
    },
    zoom: {
      backgroundColor: 'rgba(16, 185, 129, 0.7)',
      borderWidth: 1,
      borderColor: '#10B981',
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[baseStyle, variants[variant], style]}
    >
      {children}
    </TouchableOpacity>
  );
};

const ButtonText = ({ children, style }) => (
  <Text style={[{ color: '#ffffff', fontWeight: '600', fontSize: 11 }, style]}>
    {children}
  </Text>
);

const CameraControls = ({
  onSetPreset,
  onZoomTo,
  onResetCamera,
  onFocusOnPoint,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  const presets = [
    { key: 'default', name: 'Default', icon: '🎯' },
    { key: 'top', name: 'Top', icon: '⬆️' },
    { key: 'front', name: 'Front', icon: '➡️' },
    { key: 'side', name: 'Side', icon: '↗️' },
    { key: 'bird', name: 'Bird', icon: '🦅' },
    { key: 'close', name: 'Close', icon: '🔍' },
    { key: 'far', name: 'Far', icon: '🌌' },
  ];

  const zoomLevels = [
    { distance: 5, name: 'Close', icon: '🔍' },
    { distance: 15, name: 'Normal', icon: '👁️' },
    { distance: 30, name: 'Far', icon: '🌄' },
    { distance: 60, name: 'Wide', icon: '🌌' },
    { distance: 100, name: 'Max', icon: '🚀' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Controls</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📹 View Presets</Text>
        <View style={styles.buttonGrid}>
          {presets.map((preset) => (
            <Button
              key={preset.key}
              onPress={() => onSetPreset(preset.key)}
              variant="preset"
              size="small"
            >
              <ButtonText>{preset.icon} {preset.name}</ButtonText>
            </Button>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔍 Zoom Levels</Text>
        <View style={styles.buttonGrid}>
          {zoomLevels.map((zoom) => (
            <Button
              key={zoom.distance}
              onPress={() => onZoomTo(zoom.distance)}
              variant="zoom"
              size="small"
            >
              <ButtonText>{zoom.icon} {zoom.name}</ButtonText>
            </Button>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Actions</Text>
        <View style={styles.buttonRow}>
          <Button
            onPress={onResetCamera}
            variant="default"
            size="small"
          >
            <ButtonText>🏠 Reset</ButtonText>
          </Button>
          <Button
            onPress={() => onFocusOnPoint([0, 0, 0])}
            variant="default"
            size="small"
          >
            <ButtonText>🎯 Center</ButtonText>
          </Button>
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>Camera Mode Controls:</Text>
        <Text style={styles.instructionText}>• Left Click + Drag: Rotate</Text>
        <Text style={styles.instructionText}>• Right Click + Drag: Pan</Text>
        <Text style={styles.instructionText}>• Scroll Wheel: Zoom</Text>
        <Text style={styles.instructionText}>• Arrow Keys: Pan</Text>
        <Text style={styles.instructionText}>• Zoom Range: 1 to 500 units</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 280,
    maxHeight: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(12px)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  instructions: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 10,
    marginTop: 8,
  },
  instructionTitle: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  instructionText: {
    color: '#9CA3AF',
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 14,
  },
};

export default CameraControls;