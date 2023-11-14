import { NextSeo } from 'next-seo';

const DEFAULT_TITLE = '영어 글쓰기 교육용 챗봇 | 라잇미(Write-Me)';
const DEFAULT_DESCRIPTION =
  '고등학교 1학년 과학과 교육과정을 위한 챗봇입니다.';

const SEO = () => {
  return (
    <NextSeo
      robotsProps={{
        nosnippet: false,
        notranslate: false,
        noimageindex: false,
        noarchive: true,
        maxSnippet: -1,
        maxImagePreview: 'standard',
        maxVideoPreview: -1,
      }}
      title={DEFAULT_TITLE}
      defaultTitle={DEFAULT_TITLE}
      description={DEFAULT_DESCRIPTION}
      canonical="https://eng-ai-tutor.vercel.app/"
    />
  );
};

export default SEO;
