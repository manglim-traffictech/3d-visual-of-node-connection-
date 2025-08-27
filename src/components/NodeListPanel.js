import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { NODE_TYPES } from '../utils/nodeTypes';

const EditableLabel = ({ value, onSave, nodeColor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <View style={styles.editContainer}>
        <TextInput
          value={tempValue}
          onChangeText={setTempValue}
          style={[styles.editInput, { borderColor: nodeColor }]}
          onBlur={handleCancel}
          onSubmitEditing={handleSave}
          autoFocus
          selectTextOnFocus
        />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={() => setIsEditing(true)}>
      <Text style={styles.nodeLabel}>{value}</Text>
    </TouchableOpacity>
  );
};

const NodeItem = ({ node, onEditLabel, onDelete, isSelected, onSelect }) => {
  return (
    <View style={[
      styles.nodeItem,
      { borderLeftColor: node.color },
      isSelected && styles.selectedNodeItem
    ]}>
      <TouchableOpacity 
        style={styles.nodeInfo}
        onPress={() => onSelect(node)}
      >
        <View style={styles.nodeHeader}>
          <View style={[styles.colorIndicator, { backgroundColor: node.color }]} />
          <Text style={styles.nodeType}>{node.name}</Text>
          <TouchableOpacity
            onPress={() => onDelete(node.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        <EditableLabel
          value={node.label}
          onSave={(newLabel) => onEditLabel(node.id, newLabel)}
          nodeColor={node.color}
        />
      </TouchableOpacity>
    </View>
  );
};

const NodeListPanel = ({
  nodes,
  selectedNode,
  onSelectNode,
  onEditNodeLabel,
  onDeleteNode,
  isVisible = true,
}) => {
  if (!isVisible) return null;

  const groupedNodes = nodes.reduce((acc, node) => {
    if (!acc[node.type]) acc[node.type] = [];
    acc[node.type].push(node);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nodes ({nodes.length})</Text>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {Object.entries(NODE_TYPES).map(([type, typeInfo]) => {
          const nodesOfType = groupedNodes[type] || [];
          
          if (nodesOfType.length === 0) return null;
          
          return (
            <View key={type} style={styles.typeSection}>
              <Text style={[styles.typeSectionTitle, { color: typeInfo.color }]}>
                {typeInfo.name}s ({nodesOfType.length})
              </Text>
              {nodesOfType.map((node) => (
                <NodeItem
                  key={node.id}
                  node={node}
                  onEditLabel={onEditNodeLabel}
                  onDelete={onDeleteNode}
                  isSelected={selectedNode?.id === node.id}
                  onSelect={onSelectNode}
                />
              ))}
            </View>
          );
        })}
        
        {nodes.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No nodes created yet</Text>
            <Text style={styles.emptySubtext}>Use the controls to add nodes</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 280,
    maxHeight: '70%',
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
  typeSection: {
    marginBottom: 16,
  },
  typeSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  nodeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    marginBottom: 6,
    borderLeftWidth: 3,
    overflow: 'hidden',
  },
  selectedNodeItem: {
    backgroundColor: 'rgba(124, 58, 237, 0.2)',
    borderColor: '#7C3AED',
    borderWidth: 1,
  },
  nodeInfo: {
    padding: 12,
  },
  nodeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  colorIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  nodeType: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  deleteButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  nodeLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  editContainer: {
    marginTop: 4,
  },
  editInput: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
};

export default NodeListPanel;