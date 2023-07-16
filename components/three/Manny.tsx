import { useEffect, useState } from 'react';
import {
  Vector3,
  Euler,
  Object3D,
  AnimationAction,
  AnimationMixer,
} from 'three';
import manny from 'manny';
import useAccessories from '@/hooks/useAccessories';
import { MANNY_TEXTURE_DEFAULT, MANNY_FBX, LIBRARY } from '@/utils/constants';

type Props = {
  textureUrl?: string;
  accessories?: {
    [slot: string]: string[];
  };
  animation?: string;
  paused?: boolean;
  onLoad?: (mannyProps: MannyProps) => void;
  scale?: number;
  position?: number[];
  rotation?: number[];
};

export type MannyProps = {
  manny: Object3D;
  actions: Record<string, AnimationAction> | undefined;
  mixer: AnimationMixer;
};

function Manny({
  textureUrl = MANNY_TEXTURE_DEFAULT,
  accessories,
  animation = 'idle',
  paused = false,
  onLoad,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: Props) {
  const [loaded, setLoaded] = useState(false);

  const animationOptions = {
    animation,
    paused,
    library: {
      ...LIBRARY,
    },
  };

  const mannyProps = manny({
    modelPath: MANNY_FBX,
    textureUrl,
    ...animationOptions,
  });

  useAccessories(mannyProps.manny, accessories);

  useEffect(() => {
    if (!loaded && mannyProps.actions?.[animation] !== undefined) {
      setLoaded(true);
      if (onLoad) onLoad(mannyProps);
    }
  }, [mannyProps, loaded, onLoad, animation]);

  return (
    <group
      position={new Vector3(...position)}
      rotation={new Euler(...rotation)}
      scale={scale}
    >
      <primitive object={mannyProps.manny} dispose={null} />
    </group>
  );
}

export default Manny;
