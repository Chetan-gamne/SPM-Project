import type { AppProps } from "next/app";

import Layout from "../components/layout/Layout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import client from "../services/apollo-client";
import { Provider, useDispatch } from "react-redux";
import store from "../store/index";
import "../styles/globals.css";
import { useEffect } from "react";
import { cartActions } from "../store/cart-slice";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
