import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Html, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Brain, Eye, MessageCircle, BookOpen, Lightbulb, Zap } from 'lucide-react';

interface DiamondVertexProps {
  position: [number, number, number];
  pathway: {
    icon: any;
    title: string;
    subtitle: string;
    description: string;
    color: string;
  };
  index: number;
  onVertexClick: (index: number) => void;
  isSelected: boolean;
}

interface InteractiveDiamond3DProps {
  pathways: Array<{
    icon: any;
    title: string;
    subtitle: string;
    description: string;
    color: string;
  }>;
}

const DiamondVertex: React.FC<DiamondVertexProps> = ({ 
  position, 
  pathway, 
  index, 
  onVertexClick, 
  isSelected 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      if (hovered || isSelected) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.8, 1.8, 1.8), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      }
      
      // Gentle floating animation - more subtle for diamond
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.05;
      
      // Add a subtle sparkle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 2 + index;
    }
  });

  const getColor = () => {
    if (pathway.color.includes('blue')) return '#3b82f6';
    if (pathway.color.includes('teal')) return '#14b8a6';
    if (pathway.color.includes('orange')) return '#f97316';
    if (pathway.color.includes('purple')) return '#8b5cf6';
    if (pathway.color.includes('green')) return '#10b981';
    if (pathway.color.includes('red')) return '#ef4444';
    return '#3b82f6';
  };

  const IconComponent = pathway.icon;

  // Calculate label offset for hexagonal faces - position labels outward from face centers
  const labelOffset = (() => {
    const mag = Math.sqrt(position[0] * position[0] + position[2] * position[2]); // Only X,Z for radial direction
    const factor = 1.6; // Adjusted for larger diamond
    const radialX = position[0] * factor / mag;
    const radialZ = position[2] * factor / mag;
    // Keep Y slightly above the vertex for better visibility
    return [radialX, position[1] + 0.4, radialZ];
  })();

  return (
    <group>
      {/* Connection line from diamond surface to vertex */}
      <mesh>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshBasicMaterial 
          color={getColor()} 
          transparent 
          opacity={hovered || isSelected ? 0.8 : 0.4}
        />
      </mesh>
      
      {/* Vertex marker */}
      <group position={position}>
        <Sphere
          ref={meshRef}
          args={[0.2, 16, 16]}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => onVertexClick(index)}
        >
          <meshPhysicalMaterial 
            color={getColor()} 
            emissive={hovered || isSelected ? getColor() : '#000000'}
            emissiveIntensity={hovered || isSelected ? 0.5 : 0.2}
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* Glowing ring effect when selected/hovered */}
        {(hovered || isSelected) && (
          <mesh>
            <ringGeometry args={[0.3, 0.4, 16]} />
            <meshBasicMaterial 
              color={getColor()} 
              transparent 
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
      
      {/* Face highlight on diamond when vertex is hovered/selected */}
      {(hovered || isSelected) && (
        <group position={[position[0] * 0.7, position[1] - 0.15, position[2] * 0.7]}>
          <mesh rotation={[0, Math.atan2(position[2], position[0]), 0]}>
            <planeGeometry args={[1.0, 1.3]} />
            <meshBasicMaterial 
              color={getColor()}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      )}
      
      {/* Vertex Label - positioned further from diamond */}
      <Html position={labelOffset as [number, number, number]} distanceFactor={8}>
        <div 
          className={`
            pointer-events-auto cursor-pointer select-none text-center transition-all duration-300
            ${hovered || isSelected ? 'scale-125' : 'scale-100'}
            transform-gpu
          `}
          style={{
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => onVertexClick(index)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="flex flex-col items-center space-y-2">
            <div 
              className={`
                p-3 bg-white rounded-full shadow-xl border-2 transition-all duration-300
                ${hovered || isSelected ? 'shadow-2xl border-opacity-100' : 'shadow-lg border-opacity-60'}
              `}
              style={{
                borderColor: getColor(),
                backgroundColor: hovered || isSelected ? `${getColor()}15` : 'white'
              }}
            >
              <IconComponent 
                size={hovered || isSelected ? 24 : 20} 
                color={getColor()} 
                strokeWidth={hovered || isSelected ? 2.5 : 2}
              />
            </div>
            <div 
              className={`
                px-3 py-2 rounded-lg shadow-lg whitespace-nowrap font-semibold transition-all duration-300
                ${hovered || isSelected ? 'text-white' : 'text-gray-800'}
              `}
              style={{
                backgroundColor: hovered || isSelected ? getColor() : 'rgba(255, 255, 255, 0.95)',
                fontSize: hovered || isSelected ? '14px' : '12px',
                backdropFilter: 'blur(8px)'
              }}
            >
              {pathway.title}
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

const DiamondGeometry: React.FC<{ selectedVertex: number | null }> = ({ selectedVertex }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  // Create hexagonal diamond geometry (perfect for 6 modalities)
  const geometry = useMemo(() => {
    const vertices: number[] = [];
    const indices: number[] = [];
    
    // Hexagonal diamond proportions - increased for better visibility
    const radius = 2.0;
    const crownHeight = 1.3;
    const pavilionDepth = 2.6;
    const segments = 6; // Hexagonal shape
    const angleStep = (Math.PI * 2) / segments;
    
    // Helper function to add vertex
    let vertexIndex = 0;
    const addVertex = (x: number, y: number, z: number) => {
      vertices.push(x, y, z);
      return vertexIndex++;
    };
    
    // Top center (table)
    const topCenter = addVertex(0, crownHeight, 0);
    
    // Top hexagon vertices (crown)
    const topVertices: number[] = [];
    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius * 0.7;
      const z = Math.sin(angle) * radius * 0.7;
      topVertices.push(addVertex(x, crownHeight, z));
    }
    
    // Middle hexagon vertices (girdle) - wider for classic diamond shape
    const middleVertices: number[] = [];
    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      middleVertices.push(addVertex(x, 0, z));
    }
    
    // Lower hexagon vertices (pavilion)
    const lowerVertices: number[] = [];
    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;
      const x = Math.cos(angle) * radius * 0.5;
      const z = Math.sin(angle) * radius * 0.5;
      lowerVertices.push(addVertex(x, -pavilionDepth * 0.6, z));
    }
    
    // Bottom center (culet)
    const bottomCenter = addVertex(0, -pavilionDepth, 0);
    
    // Create hexagonal faces
    
    // Top face (hexagonal table)
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(topCenter, topVertices[i], topVertices[next]);
    }
    
    // Crown faces (6 trapezoidal faces from top to middle)
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      // Upper triangle
      indices.push(topVertices[i], middleVertices[i], topVertices[next]);
      // Lower triangle
      indices.push(topVertices[next], middleVertices[i], middleVertices[next]);
    }
    
    // Pavilion faces (6 trapezoidal faces from middle to lower)
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      // Upper triangle
      indices.push(middleVertices[i], lowerVertices[i], middleVertices[next]);
      // Lower triangle
      indices.push(middleVertices[next], lowerVertices[i], lowerVertices[next]);
    }
    
    // Bottom faces (6 triangular faces to culet)
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(lowerVertices[i], bottomCenter, lowerVertices[next]);
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setIndex(indices);
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
    geo.computeVertexNormals();
    
    return geo;
  }, []);

  return (
    <group>
      {/* Main diamond body */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0.02}
          metalness={0.1}
          reflectivity={0.9}
          ior={2.4}
          thickness={2}
          transparent={true}
          opacity={0.95}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#ffffff"
        />
      </mesh>
      
      {/* Inner sparkle geometry for enhanced effect */}
      <mesh geometry={geometry} scale={[0.98, 0.98, 0.98]}>
        <meshStandardMaterial
          color="#87ceeb"
          transparent={true}
          opacity={0.3}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

const Modal: React.FC<{
  pathway: any;
  isOpen: boolean;
  onClose: () => void;
}> = ({ pathway, isOpen, onClose }) => {
  if (!isOpen) return null;

  const IconComponent = pathway.icon;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
        <div className="text-center">
          <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${pathway.color} mb-4`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{pathway.title}</h3>
          <p className="text-lg text-blue-600 font-medium mb-4">{pathway.subtitle}</p>
          <p className="text-gray-600 leading-relaxed">{pathway.description}</p>
        </div>
      </div>
    </div>
  );
};



// Keyboard controls component for precise diamond rotation
const KeyboardControls: React.FC<{ 
  controlsRef: React.RefObject<any>;
  onKeyboardUse: () => void;
}> = ({ controlsRef, onKeyboardUse }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!controlsRef.current) return;
      
      const rotationSpeed = 0.15;
      const controls = controlsRef.current;
      let keyUsed = false;
      
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          // Now with unlimited rotation enforced, these should work properly
          const currentPolar = controls.getPolarAngle();
          const newPolar = currentPolar - rotationSpeed;
          controls.setPolarAngle(newPolar);
          console.log(`🔼 Polar: ${currentPolar.toFixed(2)} → ${newPolar.toFixed(2)}`);
          keyUsed = true;
          break;
        case 'ArrowDown':
          event.preventDefault();
          const currentPolarDown = controls.getPolarAngle();
          const newPolarDown = currentPolarDown + rotationSpeed;
          controls.setPolarAngle(newPolarDown);
          console.log(`🔽 Polar: ${currentPolarDown.toFixed(2)} → ${newPolarDown.toFixed(2)}`);
          keyUsed = true;
          break;
        case 'ArrowLeft':
          event.preventDefault();
          const currentAzimuth = controls.getAzimuthalAngle();
          const newAzimuth = currentAzimuth - rotationSpeed;
          controls.setAzimuthalAngle(newAzimuth);
          console.log(`◀️ Azimuth: ${currentAzimuth.toFixed(2)} → ${newAzimuth.toFixed(2)}`);
          keyUsed = true;
          break;
        case 'ArrowRight':
          event.preventDefault();
          const currentAzimuthRight = controls.getAzimuthalAngle();
          const newAzimuthRight = currentAzimuthRight + rotationSpeed;
          controls.setAzimuthalAngle(newAzimuthRight);
          console.log(`▶️ Azimuth: ${currentAzimuthRight.toFixed(2)} → ${newAzimuthRight.toFixed(2)}`);
          keyUsed = true;
          break;
      }
      
      if (keyUsed) {
        onKeyboardUse();
        controls.update();
      }
    };

    // Show keyboard instructions when component mounts
    console.log('🎮 Diamond Keyboard Controls: Use ↑↓←→ arrow keys for unlimited rotation');

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controlsRef, onKeyboardUse]);

  return null;
};

// Smooth unlimited rotation system using quaternions to avoid flips
const UnlimitedRotationSystem: React.FC<{ controlsRef: React.RefObject<any> }> = ({ controlsRef }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const rotationState = useRef({
    rotationX: 0, // Accumulated rotation around X axis
    rotationY: 0, // Accumulated rotation around Y axis
    initialDistance: 8
  });

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!controlsRef.current) return;
      setIsDragging(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
      rotationState.current.initialDistance = controlsRef.current.getDistance();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !controlsRef.current) return;

      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;

      // Accumulate rotations - unlimited in both directions
      const rotationSpeed = 0.01;
      rotationState.current.rotationY -= deltaX * rotationSpeed; // Horizontal rotation
      rotationState.current.rotationX -= deltaY * rotationSpeed; // Vertical rotation

      // Create rotation matrices for smooth rotation without flips
      const camera = controlsRef.current.object;
      const distance = rotationState.current.initialDistance;

      // Start with camera at (0, 0, distance) looking at origin
      const position = new THREE.Vector3(0, 0, distance);
      
      // Apply rotations using quaternions for smooth interpolation
      const quaternionY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotationState.current.rotationY);
      const quaternionX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), rotationState.current.rotationX);
      
      // Combine rotations
      const finalQuaternion = new THREE.Quaternion().multiplyQuaternions(quaternionY, quaternionX);
      
      // Apply rotation to position
      position.applyQuaternion(finalQuaternion);
      
      // Set camera position and look at center
      camera.position.copy(position);
      camera.lookAt(0, 0, 0);

      // Debug output showing continuous rotation values
      const rotXDegrees = (rotationState.current.rotationX * 180 / Math.PI).toFixed(1);
      const rotYDegrees = (rotationState.current.rotationY * 180 / Math.PI).toFixed(1);
      console.log(`🔄 Smooth Rotation - X: ${rotXDegrees}°, Y: ${rotYDegrees}°`);

      setLastMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, lastMousePosition, controlsRef]);

  return null;
};

const InteractiveDiamond3D: React.FC<InteractiveDiamond3DProps> = ({ pathways }) => {
  const [selectedVertex, setSelectedVertex] = useState<number | null>(null);
  const [modalVertex, setModalVertex] = useState<number | null>(null);
  const controlsRef = useRef<any>(null);

  // Define vertex positions for hexagonal diamond faces (6 modalities)
  const vertexPositions: [number, number, number][] = useMemo(() => {
    const radius = 2.0; // Match the larger diamond size
    const faceHeight = 0.65; // Height at middle of crown faces
    const segments = 6;
    const angleStep = (Math.PI * 2) / segments;
    
    const positions: [number, number, number][] = [];
    
    // Position vertices at the center of each hexagonal crown face
    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep;
      // Calculate the face center position (slightly outward from diamond surface)
      const faceRadius = radius * 0.9; // Slightly closer to center of face
      const x = Math.cos(angle) * faceRadius;
      const z = Math.sin(angle) * faceRadius;
      positions.push([x, faceHeight, z]);
    }
    
    return positions;
  }, []);

  const handleVertexClick = (index: number) => {
    setSelectedVertex(index);
    setModalVertex(index);
  };

  const closeModal = () => {
    setModalVertex(null);
    setSelectedVertex(null);
  };

  const handleKeyboardUse = () => {
    // Note: Auto-rotation disabled in favor of unlimited rotation system
    console.log('🎮 Keyboard controls active');
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-[500px] relative">
      {/* Background gradient for better diamond visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-xl opacity-60"></div>
      
      <Canvas 
        camera={{ position: [8, 6, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="relative z-10"
      >
        {/* Enhanced lighting setup for diamond */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.6} color="#87ceeb" />
        <spotLight 
          position={[0, 10, 0]} 
          target-position={[0, 0, 0]}
          intensity={1.5} 
          angle={0.3} 
          penumbra={0.5}
          color="#ffffff"
        />
        
        {/* Environment for reflections */}
        <Environment preset="studio" />
        
        {/* Fog for depth */}
        <fog attach="fog" args={['#f8fafc', 8, 15]} />
        
        <DiamondGeometry selectedVertex={selectedVertex} />
        
        {pathways.map((pathway, index) => (
          <DiamondVertex
            key={index}
            position={vertexPositions[index]}
            pathway={pathway}
            index={index}
            onVertexClick={handleVertexClick}
            isSelected={selectedVertex === index}
          />
        ))}
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={false}
          enableZoom={true}
          enableRotate={false}
          minDistance={6}
          maxDistance={16}
          autoRotate={false}
          target={[0, 0, 0]}
          makeDefault
        />
        
        <KeyboardControls controlsRef={controlsRef} onKeyboardUse={handleKeyboardUse} />
        <UnlimitedRotationSystem controlsRef={controlsRef} />
      </Canvas>
      
      {/* Interaction hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <p className="text-sm text-gray-600 font-medium">
            Click vertices • Drag or use{' '}
            <span className="inline-flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-200 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-200 rounded">↓</kbd>
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-200 rounded">←</kbd>
              <kbd className="px-1.5 py-0.5 text-xs bg-gray-200 rounded">→</kbd>
            </span>
            {' '}for unlimited rotation • Scroll to zoom
            <br />
            <span className="text-xs text-gray-500">🚀 Smooth quaternion rotation - no flips or constraints!</span>
          </p>
        </div>
      </div>
      
      {modalVertex !== null && (
        <Modal
          pathway={pathways[modalVertex]}
          isOpen={true}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default InteractiveDiamond3D;