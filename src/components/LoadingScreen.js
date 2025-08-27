import React from 'react';
import { View, Text } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.spinner} className="spinner" />
        <Text style={styles.title}>Loading 3D Neural Network</Text>
        <Text style={styles.subtitle}>Initializing WebGL and Three.js components...</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  content: {
    alignItems: 'center',
    padding: 40,
  },
  spinner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderTopColor: '#3B82F6',
    marginBottom: 24,
    // Use className to apply CSS animation
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    textAlign: 'center',
  },
};

export default LoadingScreen;