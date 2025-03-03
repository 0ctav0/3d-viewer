import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Primitive, Primitive3D } from './Primitive';
import { Effects } from './Effects';
import { Selection } from '@react-three/postprocessing';
import { State } from '../utils/utils';

const DIRECTION_LIGHT_POS: [number, number, number] = [10, 100, 10];

export type ViewerProps = {
    wireframe: boolean,
    hover: State<string|null>,
    selected: State<string|null>,
} 

export const Viewer = (props: ViewerProps & { primitives: Primitive3D[]}) => {
    const [,setHover] = props.hover;
    const [selected,setSelected] = props.selected;

    console.log("Viewer")

    return <Canvas >
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={DIRECTION_LIGHT_POS} />
        <Selection>
            <Effects/>
            {props.primitives.map((item) => (
                <Primitive key={item.id} item={item} {...props} onPointerOver={() => setHover(item.id)} onPointerOut={() => setHover(null)} onClick={() => selected === item.id ? setSelected(null) : setSelected(item.id)}  />
            ))}
        </Selection>
        <OrbitControls />
    </Canvas>
}