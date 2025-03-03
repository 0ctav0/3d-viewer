import { useThree } from "@react-three/fiber";
import { EffectComposer, Outline } from '@react-three/postprocessing'

export const Effects = () => {
    const { size } = useThree();
    return <EffectComposer autoClear={false}>
        <Outline visibleEdgeColor={0xff_00_ff} hiddenEdgeColor={0xff_00_ff} blur width={size.width*0.5} edgeStrength={10} />
    </EffectComposer>
}