# 3D Neural Network Visualization Tool

A professional-grade React Native Web application that creates interactive 3D neural network diagrams with smooth animations and modern design.

## Features

### 🎯 Core Functionality
- **Three Node Types**: Parents (blue spheres), Children (green cubes), Sub-processes (yellow cones)
- **Drag-to-Connect**: Intuitive connection creation by dragging between nodes
- **3D Node Movement**: Drag nodes to reposition them anywhere in 3D space
- **Triple Mode System**: Switch between Connection, Move, and Camera modes
- **Real-time Editing**: Double-click to edit node labels inline
- **3D Navigation**: Pan, zoom, and rotate the 3D scene

### 🎨 Visual Effects
- **Atmospheric Lighting**: Multiple light sources with colored point lights
- **Glowing Nodes**: Pulsing glow effects and selection indicators
- **Animated Connections**: Curved 3D lines with flowing animations
- **Space Environment**: Stars, sparkles, and nebula effects
- **Glassmorphism UI**: Modern translucent panels with blur effects

### 🎮 User Interface
- **Control Panel**: Add nodes, toggle modes, reset camera
- **Node List Panel**: View and manage all nodes with type grouping
- **Connection List Panel**: Monitor all connections with visual indicators
- **Mode Indicator**: Clear visual feedback for current interaction mode
- **Legend**: Node type reference with color coding

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Modern web browser with WebGL support

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm start
```

The application will open automatically in your default browser at `http://localhost:3000`.

## Usage Guide

### Basic Operations
1. **Add Nodes**: Use the control panel buttons to create different node types
2. **Create Connections**: In Connection Mode, drag from one node to another
3. **Move Nodes**: In Move Mode, drag nodes to reposition them in 3D space
4. **Navigate Scene**: Switch to Camera Mode to pan/zoom/rotate the view
5. **Edit Labels**: Double-click any node to edit its name
6. **Delete Items**: Use the × buttons in the node/connection panels

### Keyboard Shortcuts
- `Space`: Cycle through Connection/Move/Camera modes
- `R`: Reset camera to default position
- `1`: Add Parent node
- `2`: Add Child node  
- `3`: Add Sub-process node
- `Delete`: Delete selected node
- `Escape`: Cancel current drag operation

### Interaction Modes
- **Connection Mode** (🔗): Default mode for creating connections between nodes
- **Move Mode** (✋): Drag nodes to reposition them in 3D space
- **Camera Mode** (📷): Free 3D navigation without accidental connections

## Technical Architecture

### Project Structure
```
src/
├── components/
│   ├── Scene3D.js           # Main 3D visualization
│   ├── ControlPanel.js      # Top control buttons
│   ├── NodeListPanel.js     # Node management panel
│   ├── ConnectionListPanel.js # Connection management
│   ├── ModeIndicator.js     # Current mode display
│   ├── Legend.js            # Node type legend
│   └── LoadingScreen.js     # Loading component
├── hooks/
│   ├── useNodes.js          # Node state management
│   ├── useConnections.js    # Connection logic
│   └── use3DScene.js        # 3D scene controls
├── utils/
│   ├── nodeTypes.js         # Node type definitions
│   └── 3dHelpers.js         # 3D math utilities
└── App.js                   # Main application
```

### Key Technologies
- **React Native Web**: Cross-platform UI framework
- **Three.js**: 3D graphics rendering
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Additional Three.js components
- **Webpack**: Module bundling and dev server

## Customization

### Node Types
Edit `src/utils/nodeTypes.js` to modify:
- Colors and emissive properties
- 3D geometry shapes
- Default sizes
- Type names

### Visual Themes
Modify `src/App.js` global styles to change:
- Color schemes
- Background gradients
- UI panel styling
- Animation speeds

### 3D Scene Settings
Adjust `src/utils/3dHelpers.js` for:
- Node positioning ranges
- Camera default positions
- Light configurations
- Curve parameters

## Performance

- **60 FPS rendering** with optimized Three.js scene
- **Efficient re-rendering** using React hooks and memoization
- **WebGL acceleration** for smooth 3D graphics
- **Memory management** with proper cleanup

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Requires WebGL 2.0 support for optimal performance.

## Troubleshooting

### Common Issues
1. **Black screen**: Check browser WebGL support
2. **Poor performance**: Try disabling auto-rotate or reducing node count
3. **Connection not working**: Ensure you're in Connection Mode
4. **UI panels not visible**: Check screen resolution and browser zoom

### Development
```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm start

# Build for production
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Future Enhancements

- [ ] Export/Import network configurations (JSON)
- [ ] Auto-layout algorithms
- [ ] Undo/Redo functionality
- [ ] Search and filter nodes
- [ ] Custom node shapes
- [ ] Animation presets
- [ ] Mobile touch optimization