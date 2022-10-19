import React from "react";
// Importing data from Navigation component
import Navigation from "../Navigation";
function Header(props) {
	const { currentTab, setCurrentTab } = props;
	return (
		<header>
			<div>
				{/* Font will be adjusted later */}
				<h2> <strong>PetYard</strong></h2>
			</div>
			<div>
			<Navigation
					currentTab={currentTab}
					setCurrentTab={setCurrentTab}
				></Navigation>
			</div>
		</header>
	);
}
export default Header;
