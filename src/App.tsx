import { useState } from 'react'
import './App.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material'
import { ChangeHistory, CropFree, Square } from '@mui/icons-material'
import { Vector3 } from 'three'
import { useForm } from 'react-hook-form'
import { AutocompleteElement, TextFieldElement } from 'react-hook-form-mui'
import { COLORS, createMockPrimitives, Primitive3D, PrimitiveType } from './components/Primitive'
import { randomFromArr, randomPosition } from './utils/utils'
import { Viewer } from './components/Viewer'
import { generateUUID } from 'three/src/math/MathUtils.js'

const Icon = ({ item: { type, color } }: { item: Primitive3D }) => {
  switch (type) {
    case "box": return <Square htmlColor={color} />
    case "pyramid": return <ChangeHistory htmlColor={color} />
  }
}


const mockData = createMockPrimitives(10);

const getVector3Text = (v: Vector3) => `position: (${v.x.toFixed(1)}, ${v.y.toFixed(1)}, ${v.z.toFixed(1)})`;

const options: { id: PrimitiveType, label: string }[] = [
  { id: "box", label: "Box" },
  { id: "pyramid", label: "Pyramid" },
]

type Form = {
  type: {id:PrimitiveType},
  length: number,
  width: number,
  height: number,
  number: number,
}

export const App = () => {
  const [primitives, setPrimitives] = useState(mockData);
  const [addGroupDialog, setAddGroupDialog] = useState(false);
  const [wireframe, setWireFrame] = useState(false);
  const hover = useState<string|null>(null);
  const selected = useState<string|null>(null);

  const { control, handleSubmit } = useForm<Form>({
    defaultValues: {
      type: {id:"pyramid"},
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
    console.log(v);
    const newElements: Primitive3D[] = Array(v.number).fill(0).map((_, i) =>
      ({ id: generateUUID(), type: v.type.id, name: `${v.type.id} ${i + 1}`, color: randomFromArr(COLORS), position: randomPosition(), size: new Vector3(v.width, v.height, v.length) }));
    setPrimitives((prev) => [...prev, ...newElements]);
    closeDialog();
  }

  const openDialog = () => setAddGroupDialog(true);
  const closeDialog = () => setAddGroupDialog(false);

  console.log("APP")

  return (
    <Stack direction="row" height={"100%"}>
      <Stack minWidth={300}>
        <List sx={{ overflow: "auto" }}>
          {primitives.map((item) => (
            <ListItem key={item.id} >
              <ListItemButton onClick={() => selected[1](item.id === selected[0] ? null: item.id)} onPointerOver={() => hover[1](item.id)} selected={item.id === hover[0] || item.id === selected[0]}>
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
      <Viewer primitives={primitives} wireframe={wireframe} hover={hover} selected={selected} />
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