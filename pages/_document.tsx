import Document, {Html, Head, Main, NextScript, DocumentContext} from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/> 
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"}/> 
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <div id="root-snackbarify" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument