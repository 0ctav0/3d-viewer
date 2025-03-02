import { BufferAttribute, BufferGeometry, DoubleSide } from "three";
import { PrimitiveParams } from "./Primitive";
import { useEffect, useRef } from "react";

const PYRAMID_HEIGHT = 1;

const vertices = new Float32Array([
    // top point of pyramid
    // bottom 4 points
    -1, 0, 1,   // 1 left front
    1, 0, 1,    // 3 right front
    1, 0, -1,   // 4 right back
    -1, 0, -1,  // 2 left back
    0, PYRAMID_HEIGHT, 0, // 0
]);

const indices = new Uint16Array([
    // 0,2,1,  // left edge
    // 0,1,3,  // front edge
    // 0,2,4,  // back edge
    // 0,3,4,  // right edge
    // basement
    // 3,2,1,
    // 3,4,2,

    0,1,4,
    1,2,4,
    2,3,4,
    3,0,4,

    0,1,2,
    2,3,0,
]);

const normals = new Float32Array([
    0,1,0,
    0,1,0,
    0,1,0,
    0,1,0,
    0,1,0,
])

export const Pyramid = ({ item: { color, position, size }, wireframe }: PrimitiveParams) => {
    const ref = useRef<BufferGeometry>(null);

    useEffect(() => {
        ref?.current?.setAttribute("position", new BufferAttribute(vertices, 3));
        ref?.current?.setAttribute("normal", new BufferAttribute(normals, 3));
        ref?.current?.setIndex(new BufferAttribute(indices,1));
        // ref?.current?.computeVertexNormals();
    }, []);

    return <mesh position={position} scale={size.divideScalar(2)}>
        <bufferGeometry ref={ref} />
        <meshStandardMaterial side={DoubleSide} color={color} wireframe={wireframe} />
    </mesh>
}