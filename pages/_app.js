import Layout from "../components/Layout";
import "../styles/globals.css";
import store from "../redux/store"
import { Provider } from "react-redux"
import Head from "next/head"
import Script from "next/script"

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>The Baker&#39;s Bog</title>
        <meta name="description" content="Best pasteries shop in town" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>

  );
}

export default MyApp;
