import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, MeshWobbleMaterial, PerspectiveCamera } from '@react-three/drei'
import { FiArrowRight, FiZap, FiShield, FiStar, FiShoppingBag } from 'react-icons/fi'

// Interactive 3D Product Geometry Mesh (Headphones & Smartwatch representation)
function InteractiveProduct3D() {
  const meshRef = useRef()
  const ringRef = useRef()
  const orbRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t / 2) * 0.15
      meshRef.current.rotation.y = t * 0.4
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3
      ringRef.current.rotation.x = Math.cos(t / 2) * 0.2
    }
    if (orbRef.current) {
      orbRef.current.position.y = Math.sin(t * 1.5) * 0.25
    }
  })

  return (
    <group scale={1.2}>
      {/* Central Spherical Core / Headphone Driver Shell */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
          <meshPhysicalMaterial
            color="#0B8FD3"
            metalness={0.85}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Outer Floating Holographic Gyro Ring */}
      <mesh ref={ringRef} scale={1.8}>
        <torusGeometry args={[1.2, 0.03, 16, 100]} />
        <meshStandardMaterial color="#8B5CF6" emissive="#6366F1" emissiveIntensity={0.6} />
      </mesh>

      {/* Floating Metallic Orb */}
      <mesh ref={orbRef} position={[2, 0.5, -0.5]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <MeshWobbleMaterial color="#22D3EE" factor={0.4} speed={2} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

const Hero3D = () => {
  const [activeChip, setActiveChip] = useState('AudioTech ANC')

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-brand-darkBg via-gray-900 to-brand-darkBg text-white">
      {/* Background Ambient Glow & Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,143,211,0.25),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.2),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-cyan text-xs font-bold uppercase tracking-wider"
            >
              <FiZap className="w-4 h-4 text-brand-cyan animate-pulse" />
              <span>THE FUTURE OF SHOPPING</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08]"
            >
              Fashion <br />
              <span className="gradient-text">Forward.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 text-lg sm:text-xl font-normal max-w-xl leading-relaxed"
            >
              Discover flagship electronics, high-fashion apparel, and luxury lifestyle pieces in an immersive 3D commerce space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                to="/products"
                className="btn-primary px-8 py-4 text-base rounded-2xl flex items-center gap-3 font-bold shadow-2xl shadow-brand-blue/50 hover:scale-105 transition-all"
              >
                <FiShoppingBag className="w-5 h-5" />
                Explore Collection
              </Link>
              <Link
                to="/products?trending=true"
                className="btn-secondary px-8 py-4 text-base rounded-2xl flex items-center gap-2 font-bold border-gray-700 hover:border-brand-blue"
              >
                View Trending <FiArrowRight className="w-5 h-5 text-brand-cyan" />
              </Link>
            </motion.div>

            {/* Quick Spec Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-gray-800 flex flex-wrap gap-6 text-xs text-gray-400 font-semibold"
            >
              <div className="flex items-center gap-2">
                <FiShield className="w-4 h-4 text-brand-blue" />
                <span>Verified Official Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <FiStar className="w-4 h-4 text-amber-400" />
                <span>4.9/5 Rating (10K+ Reviews)</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Canvas */}
          <div className="lg:col-span-6 relative h-[450px] sm:h-[550px] w-full flex items-center justify-center">
            {/* Floating Product Information Chips */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute top-6 left-2 sm:left-6 z-20 glass-modal p-3.5 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setActiveChip('SpherePulse ANC')}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-cyan font-bold text-sm">
                40mm
              </div>
              <div>
                <p className="text-xs font-extrabold text-white">SpherePulse ANC</p>
                <p className="text-[10px] text-brand-cyan font-semibold">38h Battery • Spatial Audio</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-8 right-2 sm:right-6 z-20 glass-modal p-3.5 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setActiveChip('Chronos Ultra')}
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">
                OLED
              </div>
              <div>
                <p className="text-xs font-extrabold text-white">Chronos Ultra Smartwatch</p>
                <p className="text-[10px] text-purple-300 font-semibold">Titanium • 100m Waterproof</p>
              </div>
            </motion.div>

            {/* Three.js Canvas Container */}
            <div className="w-full h-full">
              <Canvas className="w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0B8FD3" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#8B5CF6" />
                <InteractiveProduct3D />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero3D
