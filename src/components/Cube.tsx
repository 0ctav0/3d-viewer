import { useEffect, useRef } from "react";
import { BufferAttribute, BufferGeometry, DoubleSide } from "three";
import { PrimitiveProps } from "./Primitive";

const vertices = new Float32Array([
  // front edge
  -1, -1, 1,  // 0 left bottom
  1, -1, 1,   // 1 right bottom
  1, 1, 1,    // 2 right top
  -1, 1, 1,   // 3 left top

  // back edge
  -1, -1, -1,   // 4 left bottom
  1, -1, -1,    // 5 right bottom
  1, 1, -1,     // 6 right top
  -1, 1, -1,    // 7 left top
]);

const indices = [
  // front edge
  0, 1, 2,
  2, 3, 0,
  // back edge
  4, 5, 6,
  6, 7, 4,
  // top edge
  3, 2, 6,
  6, 7, 3,
  // bottom edge
  0, 1, 5,
  5, 4, 0,
  // right edge
  1, 5, 6,
  6, 2, 1,
  // left edge
  0, 4, 7,
  7, 3, 0,
];

const normals = new Float32Array([
  // front edge
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  // back edge
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  // top edge
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  // bottom edge
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  // right edge
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  1, 0, 0,
  // left edge
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
  -1, 0, 0,
]);

export const Cube = ({ item: { color, position, size }, wireframe }: PrimitiveProps) => {
  const ref = useRef<BufferGeometry>(null);

  useEffect(() => {
    ref?.current?.setIndex(indices);
    ref?.current?.setAttribute("position", new BufferAttribute(vertices, 3));
    // ref?.current?.setAttribute("normal", new BufferAttribute(normals, 3));
    ref?.current?.computeVertexNormals();
  }, []);

  console.log("Cube")

  return <mesh position={position} scale={size.divideScalar(2)}>
    {/* <boxGeometry/> */}
    <bufferGeometry ref={ref}/>
    <meshStandardMaterial side={DoubleSide} color={color} wireframe={wireframe} />
  </mesh>
}