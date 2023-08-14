import { Suspense, useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Vector3, NoToneMapping, sRGBEncoding } from 'three';
import { Manny, Controls, Lighting } from '@/components/three';
import { MannyProps } from '@/components/three/Manny';
import Loader from '@/components/Loader';
import { fetcher } from '@/utils';
import { TokenUserMetadata } from '@/utils/types';
import { API_URL } from '@/utils/constants';

type Props = {
  textureUrl?: string;
  tokenId: number;
};

const getTextureURL = (textureUrl: string, textureHD: boolean) => {
  if (textureUrl.includes('textures-small') && textureHD) {
    return textureUrl.replace('textures-small', 'textures-hd');
  }
  return textureUrl;
};

export default function View({ textureUrl, tokenId }: Props) {
  const [initialCameraPosition, setInitialCameraPosition] = useState<{
    x: number;
    y: number;
    z: number;
  }>();
  const [loadingManny, setLoadingManny] = useState(true);
  const [mannyLoaded, setMannyLoaded] = useState<MannyProps>();
  const {
    data: userMetadata,
    error: userMetadataError,
    isLoading,
  } = useSWR<Partial<TokenUserMetadata>>(
    `${API_URL}/nft/metadata/${tokenId}`,
    fetcher
  );

  useEffect(() => {
    if (mannyLoaded?.actions !== undefined && userMetadata?.animation?.time) {
      const activeAction = mannyLoaded.actions?.[userMetadata.animation.id];
      if (activeAction !== undefined) {
        activeAction.time = userMetadata?.animation?.time;
      }
    }
  }, [mannyLoaded, userMetadata]);

  const onMannyLoad = useCallback((mannyProps: MannyProps) => {
    setMannyLoaded(mannyProps);
  }, []);

  useEffect(() => {
    if (initialCameraPosition !== undefined) return;
    if (userMetadata !== undefined || !isLoading) {
      if (userMetadata?.camera !== undefined) {
        setInitialCameraPosition(userMetadata.camera.position);
      } else {
        setInitialCameraPosition({ x: 25, y: 100, z: 200 });
      }
    }
    if (userMetadataError !== undefined) {
      console.error(userMetadataError);
    }
  }, [isLoading, userMetadata, userMetadataError, initialCameraPosition]);

  useEffect(() => {
    if (!loadingManny) return;
    if (mannyLoaded) {
      setLoadingManny(false);
    }
  }, [loadingManny, mannyLoaded]);

  // wait for textureUrl + cameraPosition
  if (textureUrl === undefined || initialCameraPosition === undefined) {
    return null;
  }

  const zoomedIn = userMetadata?.camera?.pfp_mode === true ?? false;
  const zoomedInCameraPosition = [5, 82, 60];
  const ogCameraPosition = [25, 100, 200];
  const cameraPosition =
    initialCameraPosition !== undefined && !zoomedIn
      ? new Vector3(
          initialCameraPosition.x,
          initialCameraPosition.y,
          initialCameraPosition.z
        )
      : new Vector3(...(zoomedIn ? zoomedInCameraPosition : ogCameraPosition));
  const ogTarget = [0, 15, 0];
  const zoomedInTarget = [0, 80, 0];
  const controlsTarget = zoomedIn ? zoomedInTarget : ogTarget;

  return (
    <>
      <div
        className="three-container fixed inset-0"
        style={{
          backgroundColor: userMetadata?.scene?.background_color ?? 'white',
        }}
      >
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
              paused={zoomedIn || (userMetadata?.animation?.paused ?? false)}
              scale={1}
              position={[0, -75, 0]}
              animation={
                zoomedIn ? 'idle' : userMetadata?.animation?.id ?? 'idle'
              }
              textureUrl={getTextureURL(textureUrl, zoomedIn)}
              accessories={userMetadata?.accessories}
              onLoad={onMannyLoad}
            />
          </Suspense>
          <Controls target={controlsTarget} />
          <Lighting />
          <Environment preset="warehouse" />
        </Canvas>
      </div>
      {loadingManny && <Loader />}
    </>
  );
}
