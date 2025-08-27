import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const ConnectionItem = ({ connection, nodes, onDelete }) => {
  const fromNode = nodes.find(n => n.id === connection.fromNodeId);
  const toNode = nodes.find(n => n.id === connection.toNodeId);

  if (!fromNode || !toNode) return null;

  return (
    <View style={styles.connectionItem}>
      <View style={styles.connectionInfo}>
        <View style={styles.connectionPath}>
          <View style={styles.nodeIndicator}>
            <View style={[styles.nodeDot, { backgroundColor: fromNode.color }]} />
            <Text style={styles.nodeLabel}>{fromNode.label}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.nodeIndicator}>
            <View style={[styles.nodeDot, { backgroundColor: toNode.color }]} />
            <Text style={styles.nodeLabel}>{toNode.label}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => onDelete(connection.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ConnectionListPanel = ({
  connections,
  nodes,
  onDeleteConnection,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connections ({connections.length})</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {connections.map((connection) => (
          <ConnectionItem
            key={connection.id}
            connection={connection}
            nodes={nodes}
            onDelete={onDeleteConnection}
          />
        ))}
        
        {connections.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No connections created yet</Text>
            <Text style={styles.emptySubtext}>Drag between nodes to connect</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 300,
    maxHeight: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1000,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    padding: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
    padding: 12,
  },
  connectionItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#6366f1',
  },
  connectionInfo: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  connectionPath: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nodeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  nodeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  nodeLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  arrow: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 8,
  },
  deleteButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  emptySubtext: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
};

export default ConnectionListPanel;