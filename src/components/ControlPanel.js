import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NODE_TYPES } from '../utils/nodeTypes';
import { INTERACTION_MODES } from '../hooks/use3DScene';

const Button = ({ onPress, children, style, variant = 'default' }) => {
  const baseStyle = {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    minWidth: 100,
  };

  const variants = {
    default: {
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderWidth: 1,
      borderColor: '#3B82F6',
    },
    success: {
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderWidth: 1,
      borderColor: '#10B981',
    },
    warning: {
      backgroundColor: 'rgba(245, 158, 11, 0.8)',
      borderWidth: 1,
      borderColor: '#F59E0B',
    },
    danger: {
      backgroundColor: 'rgba(239, 68, 68, 0.8)',
      borderWidth: 1,
      borderColor: '#EF4444',
    },
    ghost: {
      backgroundColor: 'rgba(75, 85, 99, 0.3)',
      borderWidth: 1,
      borderColor: '#6B7280',
    },
    mode: {
      backgroundColor: 'rgba(124, 58, 237, 0.8)',
      borderWidth: 1,
      borderColor: '#7C3AED',
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
  <Text style={[{ color: '#ffffff', fontWeight: '600', fontSize: 14 }, style]}>
    {children}
  </Text>
);

const ControlPanel = ({
  onAddNode,
  onClearAll,
  onResetCamera,
  onToggleMode,
  onToggleAutoRotate,
  onZoomTo,
  mode,
  autoRotate,
  nodeCount,
  connectionCount,
  selectedForConnection,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Nodes</Text>
        <View style={styles.buttonRow}>
          <Button
            onPress={() => onAddNode('PARENT')}
            variant="default"
          >
            <ButtonText>+ Parent</ButtonText>
          </Button>
          <Button
            onPress={() => onAddNode('CHILD')}
            variant="success"
          >
            <ButtonText>+ Child</ButtonText>
          </Button>
          <Button
            onPress={() => onAddNode('SUBPROCESS')}
            variant="warning"
          >
            <ButtonText>+ Process</ButtonText>
          </Button>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controls</Text>
        <View style={styles.buttonRow}>
          <Button
            onPress={onToggleMode}
            variant="mode"
          >
            <ButtonText>
              {mode === INTERACTION_MODES.CONNECTION ? '🔗 Connect' : 
               mode === INTERACTION_MODES.MOVE ? '✋ Move' : '📷 Camera'}
            </ButtonText>
          </Button>
          <Button
            onPress={onResetCamera}
            variant="ghost"
          >
            <ButtonText>Reset View</ButtonText>
          </Button>
          <Button
            onPress={onToggleAutoRotate}
            variant="ghost"
          >
            <ButtonText>{autoRotate ? '⏸️ Pause' : '▶️ Rotate'}</ButtonText>
          </Button>
        </View>
      </View>

      {mode === 'camera' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Zoom</Text>
          <View style={styles.buttonRow}>
            <Button
              onPress={() => onZoomTo && onZoomTo(5)}
              variant="success"
            >
              <ButtonText>🔍 Close</ButtonText>
            </Button>
            <Button
              onPress={() => onZoomTo && onZoomTo(50)}
              variant="warning"
            >
              <ButtonText>🌌 Far</ButtonText>
            </Button>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <View style={styles.buttonRow}>
          <Button
            onPress={onClearAll}
            variant="danger"
          >
            <ButtonText>Clear All</ButtonText>
          </Button>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          Total Nodes: {nodeCount} | Connections: {connectionCount}
        </Text>
        {mode === INTERACTION_MODES.CONNECTION && selectedForConnection && (
          <Text style={[styles.statsText, { color: '#F59E0B' }]}>
            🔗 Node selected for connection - click another node to connect
          </Text>
        )}
        {mode === INTERACTION_MODES.CONNECTION && !selectedForConnection && (
          <Text style={styles.statsText}>
            Click any node to select for connection
          </Text>
        )}
        {mode !== INTERACTION_MODES.CONNECTION && (
          <Text style={styles.statsText}>
            Each node is individually selectable and moveable
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minWidth: 300,
    zIndex: 1000,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'left',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statsContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
    marginTop: 8,
  },
  statsText: {
    color: '#9CA3AF',
    fontSize: 12,
    textAlign: 'center',
  },
};

export default ControlPanel;