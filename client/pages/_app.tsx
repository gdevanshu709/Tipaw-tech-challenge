import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import type { AppProps } from 'next/app';

import { ApolloProvider } from '@apollo/client';
import Layout from '../components/layouts';

import { AuthProvider } from '../context/state';

import client from '../lib/WithApollo';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>

  );
}

export default MyApp;
