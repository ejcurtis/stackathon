import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import { Provider } from '@shopify/app-bridge-react';
import Cookies from 'js-cookie';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
//component extends the App component to passes down the 
//Polaris components, styles, and everything else typically 
//found in an index file

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  },
});

//The default configuration of Apollo enables browsers to easily authenticate 
//Wrapping the component in apollo will allow me to make a query request whenever a component is rendered


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
        </Head>
          <Provider config={config}>
            <AppProvider i18n={translations}>
              <ApolloProvider client={client}>
                <Component {...pageProps} />
              </ApolloProvider>
            </AppProvider>
          </Provider>
      </React.Fragment>
    );
  }
}
    
export default MyApp;;

//The Polaris AppProvider component passes down the props and context
//needed to use the Polaris library.
//Your app needs to be wrapped in this component to use Polaris.


//App is also wrapped in the Provider component from app-bridge-react to keep user ui costum to their data
//config in the Provider componenet holds the user API data
