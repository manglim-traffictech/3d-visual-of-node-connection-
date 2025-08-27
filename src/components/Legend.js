import React from 'react';
import { View, Text } from 'react-native';
import { NODE_TYPES } from '../utils/nodeTypes';

const LegendItem = ({ nodeType, geometry }) => {
  const icons = {
    sphere: '●',
    box: '■',
    cone: '▲',
  };

  return (
    <View style={styles.legendItem}>
      <Text style={[styles.icon, { color: nodeType.color }]}>
        {icons[geometry]}
      </Text>
      <Text style={styles.label}>{nodeType.name}</Text>
    </View>
  );
};

const Legend = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Node Types</Text>
        <View style={styles.itemsContainer}>
          {Object.entries(NODE_TYPES).map(([key, nodeType]) => (
            <LegendItem
              key={key}
              nodeType={nodeType}
              geometry={nodeType.geometry}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
    fontWeight: '700',
  },
  label: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '500',
  },
};

export default Legend;