import Head from 'next/head';
import React from 'react';

import siteSettings from '../../lib/settings/site.settings';
import ogImage from '../../public/images/og-image.jpg';

type SEOProps = {
  title?: string;
  description?: string;
  article?: boolean;
  path: string;
};

const Seo = ({ title, description, article, path }: SEOProps) => {
  const metaTitle = title
    ? `${title} | ${siteSettings.title}`
    : siteSettings.title;
  const metaDescription = description || siteSettings.description;
  const metaImage = `${siteSettings.siteUrl}${ogImage}`; // placeholder logo here

  return (
    <Head>
      <noscript>
        Your browser does not support JavaScript! This site works best with
        javascript ( and by best only ).
      </noscript>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      <link rel="icon" href="/favicon.ico" />

      {/* Facebook */}
      <meta property="og:url" content={`${siteSettings.siteUrl}/${path}`} />
      <meta property="og:type" content={article ? `article` : `website`} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteSettings.siteUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {siteSettings.twitterUsername && (
        <meta name="twitter:creator" content={siteSettings.twitterUsername} />
      )}

      <meta charSet="UTF-8" />

      <link rel="apple-touch-icon" sizes="57x57" href="../../public/favicon/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="../../public/favicon/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="../../public/favicon/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="../../public/favicon/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="../../public/favicon/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="../../public/favicon/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="../../public/favicon/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="../../public/favicon/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../../public/favicon/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="../../public/favicon/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../../public/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="../../public/favicon/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../../public/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="../../public/favicon/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="../../public/favicon/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
  );
};

export default Seo;
