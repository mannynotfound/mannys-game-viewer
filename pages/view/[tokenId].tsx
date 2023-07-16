import { ParsedUrlQuery } from 'querystring';
import Page from '@/components/Page';
import TokenViewer from '@/views/view';
import { getTokenProps } from '@/utils';

type Props = {
  textureUrl?: string;
  tokenId: number;
};

function ViewPage({ textureUrl, tokenId }: Props) {
  return (
    <Page className="bg-white text-green">
      <TokenViewer textureUrl={textureUrl} tokenId={tokenId} />
    </Page>
  );
}

ViewPage.getInitialProps = async ({ query }: { query: ParsedUrlQuery }) => {
  const tokenStr = query.tokenId?.toString() ?? '0';
  const tokenId = parseInt(tokenStr, 10);
  const tokenMatch = getTokenProps(tokenId);
  const textureUrl = tokenMatch?.textureUrl;

  return { textureUrl, tokenId };
};

export default ViewPage;
