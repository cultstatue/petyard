import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// importing Apollo
import { setContext } from '@apollo/client/link/context';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

// Importing components here
import Header from "./components/Header";
import Nav from "./components/Navigation";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;