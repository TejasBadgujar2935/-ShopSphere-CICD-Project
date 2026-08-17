import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import { FiCheckCircle, FiVolume2, FiCpu, FiFeather, FiShield } from 'react-icons/fi'

function Feature3DModel({ activeStage }) {
  const stageColors = {
    0: '#0B8FD3', // Electric Blue
    1: '#8B5CF6', // Violet
    2: '#10B981', // Emerald
    3: '#F59E0B', // Amber
  }

  const currentColor = stageColors[activeStage] || '#0B8FD3'

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={1.2}>
      <mesh scale={1.6}>
        <icosahedronGeometry args={[1.2, 3]} />
        <MeshDistortMaterial
          color={currentColor}
          distort={0.35}
          speed={3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

const Signature3DFeature = () => {
  const [activeStage, setActiveStage] = useState(0)

  const featureStages = [
    {
      icon: FiShield,
      title: 'Grade-5 Titanium Shell',
      desc: 'Forged from aerospace-grade titanium alloy for ultra-light durability and scratch resistance.',
      tag: '01. MATERIAL SPECS',
    },
    {
      icon: FiVolume2,
      title: 'Spatial Sound Engine',
      desc: 'Adaptive head-tracking spatial acoustics with 40mm titanium diaphragm drivers.',
      tag: '02. ACOUSTIC ENGINE',
    },
    {
      icon: FiFeather,
      title: 'Featherweight Comfort',
      desc: 'Memory foam ear cushions wrapped in breathable protein leather for 14+ hour sessions.',
      tag: '03. ERGONOMICS',
    },
    {
      icon: FiCpu,
      title: 'Quantum Wireless Link',
      desc: 'Bluetooth 5.3 ultra-low 15ms latency audio stream with seamless multi-device switching.',
      tag: '04. CONNECTIVITY',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-gray-950 text-white relative overflow-hidden border-t border-gray-900">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-cyan bg-brand-cyan/15 px-4 py-1.5 rounded-full border border-brand-cyan/30 inline-block mb-4">
            SIGNATURE 3D EXPERIENCE
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Engineered for <span className="gradient-text">Everyday.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Interact with the 3D showcase below to explore four core engineering milestones.
          </p>
        </div>

        {/* 3D Interactive Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Feature Selector Buttons */}
          <div className="lg:col-span-4 space-y-4">
            {featureStages.slice(0, 2).map((stage, idx) => (
              <motion.div
                key={idx}
                onClick={() => setActiveStage(idx)}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                  activeStage === idx
                    ? 'bg-brand-blue/15 border-brand-blue shadow-xl shadow-brand-blue/20'
                    : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-brand-cyan">
                    {stage.tag}
                  </span>
                  {activeStage === idx && <FiCheckCircle className="w-5 h-5 text-brand-cyan" />}
                </div>
                <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <stage.icon className="w-5 h-5 text-brand-blue" />
                  {stage.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Central 3D Interactive Canvas */}
          <div className="lg:col-span-4 h-[380px] sm:h-[450px] relative glass-card rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center">
            <div className="absolute top-4 left-4 z-10 text-[10px] font-mono uppercase text-gray-400 tracking-wider">
              DRAG TO ROTATE 360°
            </div>
            <Canvas className="w-full h-full">
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} color="#0B8FD3" />
              <pointLight position={[-5, -5, -5]} intensity={1} color="#8B5CF6" />
              <Feature3DModel activeStage={activeStage} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>

          {/* Right Column: Feature Selector Buttons */}
          <div className="lg:col-span-4 space-y-4">
            {featureStages.slice(2, 4).map((stage, idx) => {
              const actualIdx = idx + 2
              return (
                <motion.div
                  key={actualIdx}
                  onClick={() => setActiveStage(actualIdx)}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl cursor-pointer border transition-all duration-300 ${
                    activeStage === actualIdx
                      ? 'bg-brand-blue/15 border-brand-blue shadow-xl shadow-brand-blue/20'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-brand-cyan">
                      {stage.tag}
                    </span>
                    {activeStage === actualIdx && <FiCheckCircle className="w-5 h-5 text-brand-cyan" />}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <stage.icon className="w-5 h-5 text-brand-blue" />
                    {stage.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{stage.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signature3DFeature
