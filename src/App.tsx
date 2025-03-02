import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import { ChangeHistory, CropFree, Square } from '@mui/icons-material'
import { Vector3 } from 'three'
import { useForm } from 'react-hook-form'
import { AutocompleteElement, TextFieldElement } from 'react-hook-form-mui'
import { COLORS, createMockPrimitives, Primitive, Primitive3D, PrimitiveType } from './components/Primitive'
import { randomFromArr, randomPosition } from './utils/utils'
import { OrbitControls } from '@react-three/drei'

const Icon = ({ item: { type, color } }: { item: Primitive3D }) => {
  switch (type) {
    case "box": return <Square htmlColor={color} />
    case "pyramid": return <ChangeHistory htmlColor={color} />
  }
}

const DIRECTION_LIGHT_POS: [number, number, number] = [10, 100, 10];

const mockData = createMockPrimitives(10);

const getVector3Text = (v: Vector3) => `position: (${v.x.toFixed(1)}, ${v.y.toFixed(1)}, ${v.z.toFixed(1)})`;

const options: { id: PrimitiveType, label: string }[] = [
  { id: "box", label: "Box" },
  { id: "pyramid", label: "Pyramid" },
]

type Form = {
  type: PrimitiveType,
  length: number,
  width: number,
  height: number,
  number: number,
}

export const App = () => {
  const [primitives, setPrimitives] = useState(mockData);
  const [addGroupDialog, setAddGroupDialog] = useState(false);
  const [wireframe, setWireFrame] = useState(false);

  const { control, handleSubmit } = useForm<Form>({
    defaultValues: {
      type: "box",
      length: 1,
      width: 1,
      height: 1,
      number: 3,
    }
  });

  const clearScene = () => {
    setPrimitives([]);
  }

  const addGroup = (v: Form) => {
    const newElements: Primitive3D[] = Array(v.number).fill(0).map((_, i) =>
      ({ type: v.type, name: `${v.type} ${i + 1}`, color: randomFromArr(COLORS), position: randomPosition(), size: new Vector3(v.width, v.height, v.length) }));
    setPrimitives((prev) => [...prev, ...newElements]);
    closeDialog();
  }

  const openDialog = () => setAddGroupDialog(true);
  const closeDialog = () => setAddGroupDialog(false);

  return (
    <Stack direction="row" height={"100%"}>
      <Stack minWidth={300}>
        <List sx={{ overflow: "auto" }}>
          {primitives.map((item, i) => (
            <ListItem key={i}>
              <ListItemButton>
                <ListItemText primary={item.name} secondary={getVector3Text(item.position)} />
                <ListItemIcon><Icon item={item} /></ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Stack direction="row" mt="auto">
          <Button onClick={clearScene}>Clear scene</Button>
          <Button onClick={openDialog}>Add group</Button>
        </Stack>
      </Stack>
      <Stack>
        <IconButton onClick={() => setWireFrame(prev => !prev)} color={wireframe ? "primary" : "default"} sx={{ position: "relative" }}><CropFree /></IconButton>
      </Stack>
      <Canvas >
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={DIRECTION_LIGHT_POS} />
        {primitives.map((item, i) => (
          <Primitive key={i} item={item} wireframe={wireframe} />
        ))}
        <OrbitControls/>
      </Canvas>
      <Dialog
        open={addGroupDialog}
        onClose={closeDialog}
      >
        <DialogTitle>Add primitives group</DialogTitle>
        <DialogContent>
          <Stack gap={1} minWidth={300} mt={1}>
            <AutocompleteElement
              name="type"
              label="Type"
              control={control}
              options={options}
              required
            />
            <TextFieldElement
              name="length"
              label="Length"
              type="number"
              control={control}
              required
              rules={{ min: 0.1 }}
            />
            <TextFieldElement
              name="width"
              label="Width"
              type="number"
              control={control}
              required
              rules={{ min: 0.1 }}

            />
            <TextFieldElement
              name="height"
              label="Height"
              type="number"
              control={control}
              required
              rules={{ min: 0.1 }}

            />
            <TextFieldElement
              name="number"
              label="Number"
              type="number"
              control={control}
              required
              rules={{ min: 1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit(addGroup)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}