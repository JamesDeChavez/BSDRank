import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import App from './App';

export const client = new ApolloClient({
  uri: "https://bsd-rank.onrender.com/",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('bsdToken') || '' 
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement  || document.createElement('div')
);

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);
