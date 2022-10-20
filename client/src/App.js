import "./App.css";
import React, { useState } from "react";

// Importing components here
import Header from "./components/Header";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


// importing Apollo
import { setContext } from '@apollo/client/link/context';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from '@apollo/client';

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
	const [currentTab, setCurrentTab] = useState("home");

	const renderTab = () => {
		switch (currentTab) {
			case "home":
				return <Home/>;
			case "login":
				return <Login />;

    // Will add this portion later when we determine what goes in profile
      // case "profile":
      //   return <Profile/>;
      
			case "contact":
				return <Contact/>;
			default:
				return null;
		}
	};
	return (

		<ApolloProvider client={client}>
		<div>
			<div className="mobile-header">
				<Header currentTab={currentTab} setCurrentTab={setCurrentTab}></Header>
			</div>
			<div>
				<main>{renderTab()}</main>
			</div>
			<div>
				<Footer></Footer>
			</div>
		</div>
		</ApolloProvider>
	);
}

export default App;
