import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; // Import the Dashboard page
import Login from "./pages/Login";         // Import the Login page
import Signup from "./pages/Signup";       // Import the Signup page
import Header from "./components/Header";  // Import the Header component
import Footer from "./components/Footer";  // Import the Footer component
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <Header /> {/* Render the Header */}
        <main>
          <Routes>
            <Route path="/" element={<Login />} /> {/* Login as default route */}
            <Route path="/login" element={<Login />} /> {/* Login page */}
            <Route path="/signup" element={<Signup />} /> {/* Signup page */}
            <Route path="/dashboard" element={<Dashboard />} /> {/* dashboard page */}
          </Routes>
        </main>
        <Footer /> {/* Render the Footer */}
      </ApolloProvider>
    </Router>
  );
};

export default App;