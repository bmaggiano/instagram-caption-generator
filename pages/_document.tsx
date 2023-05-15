import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate your next IG caption in just seconds."
          />
          <meta property="og:site_name" content="IG Cap :billed_cap:" />
          <meta
            property="og:description"
            content="Generate your next IG caption in just seconds."
          />
          <meta property="og:title" content="IG Cap :billed_cap:" />
          <meta
            name="twitter:description"
            content="Generate your next IG caption in just seconds."
          />
          <link href="https://fonts.cdnfonts.com/css/satoshi" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
