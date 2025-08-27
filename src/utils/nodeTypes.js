export const NODE_TYPES = {
  PARENT: {
    id: 'parent',
    name: 'Parent',
    color: '#3B82F6',
    emissive: '#1e40af',
    geometry: 'sphere',
    size: 1.2,
  },
  CHILD: {
    id: 'child', 
    name: 'Child',
    color: '#10B981',
    emissive: '#047857',
    geometry: 'box',
    size: 1,
  },
  SUBPROCESS: {
    id: 'subprocess',
    name: 'Sub-process',
    color: '#F59E0B',
    emissive: '#d97706',
    geometry: 'cone',
    size: 1,
  },
};

export const generateNodeId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  const performance_now = performance.now();
  const id = `node-${timestamp}-${random}-${performance_now}`;
  console.log(`Generated unique node ID: ${id}`);
  return id;
};

export const generateConnectionId = () => {
  return `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};