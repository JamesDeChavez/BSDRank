import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import App from './App';

export const client = new ApolloClient({
  uri: "http://localhost:3001/",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('bsdToken') || '' 
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
