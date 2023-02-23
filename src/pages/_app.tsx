import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app'
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import AdminRegistrationContext from '../utils/context/base/AdminRegistrationContext'

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <GoogleOAuthProvider clientId='643485254029-mmi46n2kojuce223b8cpfqkck1s4gv0c.apps.googleusercontent.com'>
      <AdminRegistrationContext>
      {getLayout(<Component {...pageProps} />)}
      </AdminRegistrationContext>
    </GoogleOAuthProvider>
  )
}
