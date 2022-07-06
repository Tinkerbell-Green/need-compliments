import Document, {Html, Head, Main, NextScript, DocumentContext} from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;
    
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => App,
        enhanceComponent: (Component) => Component,
      })
    
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="//fonts.googleapis.com"/> 
          <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin={"true"}/> 
          <link href="//fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap" rel="prefetch" as="font" type="font/woff2" crossOrigin={"true"}/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument