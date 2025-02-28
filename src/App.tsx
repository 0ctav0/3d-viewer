import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import { Button, Stack } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)


  return (
    <Stack direction="row" height={"100%"}>
      <Stack minWidth={300}>
        // items...
        <Stack direction="row" mt="auto">
          <Button>Clear scene</Button>
          <Button>Add group</Button>
        </Stack>
      </Stack>
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </Stack>
  )
}

export default App
