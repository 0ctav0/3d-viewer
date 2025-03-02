import { Vector3 } from "three"
import { Cube } from "./Cube"
import { Pyramid } from "./Pyramid"
import { randomFromArr, randomPosition } from "../utils/utils";

export type Primitive3D = {
    type: "box" | "pyramid",
    name: string,
    position: Vector3,
    size: Vector3,
    color: string,
}

export const COLORS = ["red", "yellow", "green", "blue", "pink", "aqua"];


export const createMockPrimitives = (n: number): Primitive3D[] => 
    Array(n).fill(0).map((_, i) => ({ type: "box", name: `${"box"} ${i + 1}`, color: randomFromArr(COLORS), position: randomPosition(), size: new Vector3(1,1,1) }))

export const Primitive = ({ item }: { item: Primitive3D }) => {
    switch (item.type) {
        case "box": return <Cube item={item} />
        case "pyramid": return <Pyramid item={item} />
    }
}