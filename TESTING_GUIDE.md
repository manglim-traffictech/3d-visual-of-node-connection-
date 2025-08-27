# 3D Neural Network Visualizer - Testing Guide

## 🚀 Quick Start Test

1. **Open the application**: http://localhost:3000
2. **Verify 3D scene loads**: You should see a space-like background with stars
3. **Test basic functionality**: Follow the steps below

## ✅ Core Functionality Tests

### Test 1: Node Creation
1. Click "**+ Parent**" button - A blue sphere should appear
2. Click "**+ Child**" button - A green cube should appear  
3. Click "**+ Process**" button - A yellow cone should appear
4. **Expected Result**: Nodes appear in random 3D positions with glow effects

### Test 2: Drag-to-Connect (PRIMARY FEATURE)
1. **Ensure Connection Mode is active** (🔗 icon in top indicator)
2. **Click and hold** on any node (cursor should show pointer)
3. **Drag to another node** - you should see a red connecting line
4. **Release on the target node** - connection should be created
5. **Expected Result**: 
   - Purple curved line connects the two nodes
   - Connection appears in the Connection List panel (bottom-right)
   - Connection has animated flowing effect

### Test 3: Mode Switching  
1. Click "**🔗 Connect**" button to switch to Camera Mode
2. Button should change to "**📷 Camera**"
3. In Camera Mode: 
   - **Right-click + drag** to orbit around
   - **Scroll wheel** to zoom in/out
   - **Dragging between nodes should NOT create connections**
4. Switch back to Connection Mode to continue connecting

### Test 4: Node Management
1. **Select a node** by clicking it (should get larger with ring indicator)
2. **Double-click a node** to edit its label
3. Type new name and press Enter
4. **Delete nodes** using the × button in Node List panel
5. **Expected Result**: Connected nodes should have their connections removed

### Test 5: 3D Navigation
1. Switch to Camera Mode (📷)
2. **Right-click + drag** to rotate view
3. **Mouse wheel** to zoom in/out  
4. **Click "Reset View"** button to return to default position
5. **Toggle "▶️ Rotate"** to enable/disable auto-rotation

### Test 6: UI Panels
1. **Node List Panel (top-right)**:
   - Shows all nodes grouped by type
   - Click node names to select them
   - Use × buttons to delete
2. **Connection List Panel (bottom-right)**:
   - Shows all connections as "NodeA → NodeB"
   - Use × buttons to delete connections
3. **Mode Indicator (top-center)**:
   - Shows current mode with instructions

## 🎮 Keyboard Shortcuts Test

Test these shortcuts:
- **Space**: Toggle between Connection/Camera modes
- **R**: Reset camera view
- **1**: Add Parent node
- **2**: Add Child node
- **3**: Add Sub-process node
- **Delete**: Remove selected node (select node first)
- **Escape**: Cancel current drag connection

## 🔧 Advanced Tests

### Connection Validation
1. Try to connect a node to itself - **should fail**
2. Try to create duplicate connections - **should prevent duplicates**
3. Create multiple connections from one node - **should work**

### Visual Effects Test
1. Nodes should have:
   - Glowing effects
   - Floating animation
   - Pulsing emissive materials
   - Selection rings when clicked
2. Connections should have:
   - Curved 3D lines (not straight)
   - Animated opacity/glow effects
   - Purple color with glow

### Performance Test
1. Create 10+ nodes and connect them
2. Rotate the camera while auto-rotate is on
3. Switch between modes rapidly
4. **Expected**: Smooth 60fps performance

## 🐛 Common Issues & Solutions

### Problem: "Cannot read properties of undefined"
- **Solution**: Refresh the page, ensure WebGL is supported

### Problem: Drag connections not working
- **Check**: Ensure you're in Connection Mode (🔗)
- **Check**: Click and hold on a node, then drag to another node
- **Check**: Release on the target node (not empty space)

### Problem: Nodes not appearing
- **Check**: Look around the 3D scene, nodes spawn randomly
- **Try**: Reset camera view or zoom out

### Problem: UI panels not visible
- **Check**: Browser zoom level (should be 100%)
- **Check**: Screen resolution (panels may be off-screen)

## ✅ Success Criteria

**The application should:**
1. ✅ Load without errors
2. ✅ Display 3D space with stars and effects
3. ✅ Create nodes with distinct shapes/colors
4. ✅ Allow drag-to-connect between any nodes
5. ✅ Show curved connection lines with animations
6. ✅ Switch between Connection/Camera modes
7. ✅ Enable 3D navigation in Camera mode
8. ✅ Allow node label editing and deletion
9. ✅ Display real-time statistics
10. ✅ Respond to keyboard shortcuts

## 📱 Browser Compatibility

Test in multiple browsers:
- ✅ Chrome/Chromium
- ✅ Firefox  
- ✅ Safari (macOS)
- ✅ Edge

**Requirements**: WebGL 2.0 support

## 🎯 Expected User Experience

Users should be able to:
1. **Intuitively create** 3D neural network diagrams
2. **Easily switch** between connection and navigation modes  
3. **Smoothly interact** with the 3D environment
4. **Efficiently manage** nodes and connections
5. **Enjoy** beautiful visual effects and animations

If all tests pass, the 3D Neural Network Visualizer is working correctly! 🎉