import { Vector3 } from "three"
import { Cube } from "./Cube"
import { Pyramid } from "./Pyramid"
import { randomFromArr, randomPosition } from "../utils/utils";

const PRIMITIVE_TYPES = ["box", "pyramid"] as const;
export type PrimitiveType = (typeof PRIMITIVE_TYPES)[number];

export type Primitive3D = {
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
        return { type, name: `${type} ${i + 1}`, color: randomFromArr(COLORS), position: randomPosition(), size: new Vector3(1,1,1) }
    })

export type PrimitiveParams = {
    item: Primitive3D,
    wireframe: boolean,
}

export const Primitive = (params: PrimitiveParams) => {
    switch (params.item.type) {
        case "box": return <Cube {...params} />
        case "pyramid": return <Pyramid {...params} />
    }
}