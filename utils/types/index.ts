export * from '@/utils/types/token';
import type { TokenId } from '@/utils/types/token';

// used in this app to render manny tokens
export type Token = {
  tokenId: TokenId;
  textureUrl?: string;
  animationName?: string;
};

export type MetadataAttribute = {
  trait_type: string;
  value: string | number | boolean;
};

// json structure used in public manny token metadata
export type TokenMetadata = {
  name: string;
  token_id: number;
  description: string;
  image: string;
  texture_url: string;
  texture_url_hd: string;
  animation_url: string;
  iframe_url: string;
  attributes: MetadataAttribute[];
};

export type CameraMeta = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  pfp_mode: boolean;
};

export type AnimationMeta = {
  id: string;
  time: number;
  paused: boolean;
};

export type AccessoriesMeta = {
  [slot: string]: string[];
};

export type SceneMeta = {
  background_color: string;
  texture_hd: boolean;
};

export type TokenUserMetadata = {
  camera: CameraMeta;
  animation: AnimationMeta;
  accessories: AccessoriesMeta;
  scene: SceneMeta;
};
