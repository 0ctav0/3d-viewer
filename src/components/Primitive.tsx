import { Vector3 } from "three"
import { Cube } from "./Cube"
import { Pyramid } from "./Pyramid"
import { randomFromArr, randomPosition } from "../utils/utils";
import { Select } from "@react-three/postprocessing";
import { ViewerProps } from "./Viewer";
import { generateUUID } from "three/src/math/MathUtils.js";

const PRIMITIVE_TYPES = ["box", "pyramid"] as const;
export type PrimitiveType = (typeof PRIMITIVE_TYPES)[number];

export type Primitive3D = {
    id: string,
    type: PrimitiveType,
    name: string,
    position: Vector3,
    size: Vector3,
    color: string,
}


export const COLORS = ["red", "yellow", "green", "blue", "pink", "aqua"];


export const createMockPrimitives = (n: number): Primitive3D[] => 
    Array(n).fill(0).map((_, i) => {
        const type = randomFromArr(PRIMITIVE_TYPES);
        return { id: generateUUID(),  type, name: `${type} ${i + 1}`, color: randomFromArr(COLORS), position: randomPosition(), size: new Vector3(1,1,1) }
    })

export type PrimitiveProps = {
    item: Primitive3D,
    onPointerOver: () => void,
    onPointerOut: () => void,
    onClick: () => void,
} & ViewerProps;

export const Primitive = (props: PrimitiveProps) => {
    console.log("Primitive")

    return <Select enabled={props.item.id === props.hover[0] || props.item.id === props.selected[0]} onPointerOver={props.onPointerOver} onPointerOut={props.onPointerOut} onClick={props.onClick}>
        {props.item.type === "box" ? <Cube {...props}/>: null}
        {props.item.type === "pyramid" ? <Pyramid {...props}/>: null}
    </Select>
}