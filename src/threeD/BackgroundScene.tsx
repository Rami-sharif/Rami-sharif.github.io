import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const CYAN = new THREE.Color('#00f5ff')
const GREEN = new THREE.Color('#00ff88')
const PURPLE = new THREE.Color('#bf00ff')

function Starfield() {
  const positions = useMemo(() => {
    const count = 1500
    const pos = new Float32Array(count * 3)
    const rand = mulberry32(2024)
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] = (rand() - 0.5) * 240
      pos[i3 + 1] = (rand() - 0.5) * 240
      pos[i3 + 2] = (rand() - 0.5) * 240
    }
    return pos
  }, [])

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#7af5ff"
        size={0.25}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

type NodeData = { pos: THREE.Vector3; connections: number[] }

function NetworkMesh() {
  const groupRef = useRef<THREE.Group>(null)

  const { nodes, edges } = useMemo(() => {
    const rand = mulberry32(7777)
    const count = 60
    const radius = 35
    const nodes: NodeData[] = []

    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const r = radius * (0.7 + rand() * 0.4)
      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      )
      nodes.push({ pos, connections: [] })
    }

    const maxLinkDist = 18
    const edgeList: Array<[number, number]> = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].pos.distanceTo(nodes[j].pos) < maxLinkDist) {
          edgeList.push([i, j])
          nodes[i].connections.push(j)
          nodes[j].connections.push(i)
        }
      }
    }

    return { nodes, edges: edgeList }
  }, [])

  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], i) => {
      const off = i * 6
      arr[off] = nodes[a].pos.x
      arr[off + 1] = nodes[a].pos.y
      arr[off + 2] = nodes[a].pos.z
      arr[off + 3] = nodes[b].pos.x
      arr[off + 4] = nodes[b].pos.y
      arr[off + 5] = nodes[b].pos.z
    })
    return arr
  }, [edges, nodes])

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      const off = i * 3
      arr[off] = n.pos.x
      arr[off + 1] = n.pos.y
      arr[off + 2] = n.pos.z
    })
    return arr
  }, [nodes])

  // Packets travelling along edges
  const packets = useMemo(() => {
    const rand = mulberry32(91011)
    const count = 30
    return Array.from({ length: count }, () => ({
      edge: Math.floor(rand() * edges.length),
      progress: rand(),
      speed: 0.15 + rand() * 0.35,
      color: rand() < 0.7 ? CYAN : rand() < 0.85 ? GREEN : PURPLE,
    }))
  }, [edges.length])

  const packetMeshesRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tmpColor = useMemo(() => new THREE.Color(), [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04
      groupRef.current.rotation.x = Math.sin(performance.now() * 0.0001) * 0.15
    }

    const inst = packetMeshesRef.current
    if (!inst) return
    packets.forEach((p, i) => {
      p.progress += delta * p.speed
      if (p.progress >= 1) {
        p.progress = 0
        const node = nodes[edges[p.edge][1]]
        if (node.connections.length > 0) {
          const next = node.connections[Math.floor(Math.random() * node.connections.length)]
          const newEdgeIdx = edges.findIndex(
            ([a, b]) =>
              (a === edges[p.edge][1] && b === next) || (b === edges[p.edge][1] && a === next),
          )
          if (newEdgeIdx >= 0) p.edge = newEdgeIdx
        }
      }
      const [a, b] = edges[p.edge]
      const start = nodes[a].pos
      const end = nodes[b].pos
      dummy.position.lerpVectors(start, end, p.progress)
      dummy.scale.setScalar(0.55)
      dummy.updateMatrix()
      inst.setMatrixAt(i, dummy.matrix)
      inst.setColorAt(i, tmpColor.copy(p.color))
    })
    inst.instanceMatrix.needsUpdate = true
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes */}
      <Points positions={nodePositions} stride={3}>
        <PointMaterial
          transparent
          color="#00f5ff"
          size={1.4}
          sizeAttenuation
          depthWrite={false}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Packets travelling */}
      <instancedMesh
        ref={packetMeshesRef}
        args={[undefined as unknown as THREE.BufferGeometry, undefined as unknown as THREE.Material, packets.length]}
      >
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshBasicMaterial
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  )
}

function WireGlobe() {
  const ref = useRef<THREE.LineSegments>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.05
      ref.current.rotation.x = Math.cos(performance.now() * 0.00008) * 0.1
    }
  })

  const geo = useMemo(() => {
    const sphere = new THREE.SphereGeometry(20, 24, 16)
    return new THREE.EdgesGeometry(sphere)
  }, [])

  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial
        color="#bf00ff"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

function BackgroundScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 70], fov: 65 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'fixed', inset: 0, zIndex: -1 }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 50, 130]} />
      <ambientLight intensity={0.3} />
      <Starfield />
      <WireGlobe />
      <NetworkMesh />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate
        autoRotate
        autoRotateSpeed={0.25}
      />
    </Canvas>
  )
}

export default BackgroundScene
