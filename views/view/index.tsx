import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3, NoToneMapping, sRGBEncoding } from 'three';
import { Manny, Controls, Lighting, CameraZoom } from '@/components/three';

type Props = {
  textureUrl?: string;
  animationName?: string;
};

const getTextureURL = (textureUrl: string, textureHD: boolean) => {
  if (textureUrl.includes('textures-small') && textureHD) {
    return textureUrl.replace('textures-small', 'textures-hd');
  }
  return textureUrl;
};

export default function View({ textureUrl, animationName }: Props) {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [mood, setMood] = useState('idle');

  // no texture, no manny
  if (textureUrl === undefined) {
    return null;
  }

  const zoomedInCameraPosition = [5, 82, 60];
  const ogCameraPosition = [25, 100, 200];
  const cameraPosition = zoomedIn
    ? new Vector3(...zoomedInCameraPosition)
    : new Vector3(...ogCameraPosition);
  const ogTarget = [0, 15, 0];
  const zoomedInTarget = [0, 80, 0];
  const controlsTarget = zoomedIn ? zoomedInTarget : ogTarget;

  return (
    <>
      <div className="three-container fixed inset-0">
        <Canvas
          linear
          camera={{
            fov: 45,
            near: 1,
            far: 2000,
            position: cameraPosition,
          }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = NoToneMapping;
            gl.outputEncoding = sRGBEncoding;
          }}
        >
          <Suspense fallback={null}>
            <Manny
              paused={zoomedIn}
              scale={1}
              position={[0, -75, 0]}
              animation={zoomedIn ? 'idle' : mood}
              textureUrl={getTextureURL(textureUrl, zoomedIn)}
            />
          </Suspense>
          <Controls target={controlsTarget} />
          <CameraZoom
            zoomedIn={zoomedIn}
            zoomedInCameraPosition={zoomedInCameraPosition}
            ogCameraPosition={ogCameraPosition}
          />
          <Lighting />
        </Canvas>
      </div>
      {animationName !== undefined && (
        <div className="fixed bottom-0 p-5 w-full flex justify-between">
          <div
            className={
              'cursor-pointer ' +
              (zoomedIn ? 'opacity-0 pointer-events-none' : '')
            }
            onClick={() => setMood(mood === 'idle' ? animationName : 'idle')}
          >
            {animationName.toUpperCase()}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              setZoomedIn(!zoomedIn);
            }}
          >
            {zoomedIn ? 'EXIT' : 'PORTRAIT MODE'}
          </div>
        </div>
      )}
    </>
  );
}
