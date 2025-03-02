import { Vector3 } from "three";

export const randomFromArr = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
export const randomPosition = () => new Vector3(Math.random() * 6 - 3, Math.random() * 6 - 3, Math.random() * -3);