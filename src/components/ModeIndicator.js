import React from 'react';
import { View, Text } from 'react-native';
import { INTERACTION_MODES } from '../hooks/use3DScene';

const ModeIndicator = ({ mode }) => {
  const getModeConfig = () => {
    switch (mode) {
      case INTERACTION_MODES.CONNECTION:
        return {
          icon: '🔗',
          title: 'CONNECTION MODE',
          instruction: 'Drag between nodes to connect',
          color: 'rgba(99, 102, 241, 0.9)'
        };
      case INTERACTION_MODES.MOVE:
        return {
          icon: '✋',
          title: 'MOVE MODE',
          instruction: 'Drag nodes to reposition them',
          color: 'rgba(16, 185, 129, 0.9)'
        };
      case INTERACTION_MODES.CAMERA:
        return {
          icon: '📷',
          title: 'CAMERA MODE',
          instruction: 'Navigate the 3D scene freely',
          color: 'rgba(124, 58, 237, 0.9)'
        };
      default:
        return {
          icon: '🔗',
          title: 'CONNECTION MODE',
          instruction: 'Drag between nodes to connect',
          color: 'rgba(99, 102, 241, 0.9)'
        };
    }
  };

  const config = getModeConfig();

  return (
    <View style={[
      styles.container,
      { backgroundColor: config.color }
    ]}>
      <View style={styles.content}>
        <Text style={styles.icon}>
          {config.icon}
        </Text>
        <View style={styles.textContainer}>
          <Text style={styles.modeText}>
            {config.title}
          </Text>
          <Text style={styles.instructionText}>
            {config.instruction}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{ translateX: -120 }],
    width: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    fontSize: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  modeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  instructionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    marginTop: 2,
  },
};

export default ModeIndicator;