import React from "react";
function Navigation(props) {
	const { currentTab, setCurrentTab } = props;
	return (
		<nav>
			<ul className="flex-row mobile-view">
				<li className={currentTab === "home" ? "mx-2 navActive" : "mx-2"}>
					<span onClick={() => setCurrentTab("home")}>Home</span>
				</li>
				<li className={currentTab === "profile" ? "mx-2 navActive" : "mx-2"}>
					<span onClick={() => setCurrentTab("profile")}>Profile</span>
				</li>
				<li className={currentTab === "login" ? "mx-2 navActive" : "mx-2"}>
					<span onClick={() => setCurrentTab("login")}>Login</span>
				</li>
				<li className={currentTab === "contact" ? "mx-2 navActive" : "mx-2"}>
					<span onClick={() => setCurrentTab("contact")}>Contact</span>
				</li>
			</ul>
		</nav>
	);
}
export default Navigation;
