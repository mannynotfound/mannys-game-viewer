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