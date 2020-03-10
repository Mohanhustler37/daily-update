import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Routes from "./Routes/Routes";
import { BrowserRouter } from 'react-router-dom';
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { baseUrl } from "./constants";

const cache = new InMemoryCache();

/* Creating ApolloClient Connection to communicate with ApolloSeerver */
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: baseUrl.server,
    headers: {
      'client-name': 'Space Explorer [web]',
      'client-version': '1.0.0',
    },
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes client={client}/>
    </BrowserRouter>
  </ApolloProvider>
  , document.getElementById('root') 
);
