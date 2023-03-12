import mannyTokens from 'fixtures/tokens.json';
import { Token, TokenId } from 'utils/types';

const now = Date.now();
const cacheBust = (url: string): string => url + `?ts=${now}`;

export const getTokenProps = (tokenId: number): Token | null => {
  const tokenMatch = mannyTokens.find((mt) => mt.token_id === tokenId);

  if (!tokenMatch) {
    return null;
  }

  const bonusAnim = tokenMatch.attributes.find(
    (at) => at.trait_type === 'mood'
  );

  return {
    tokenId: tokenMatch.token_id as TokenId,
    textureUrl: cacheBust(tokenMatch.texture_url),
    animationName: bonusAnim?.value.toString(),
  };
};