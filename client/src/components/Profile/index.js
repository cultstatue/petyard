import React, { useState } from "react";
import { QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Card } from "react-bootstrap";
import "./index.css";
const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || {};

  // // Here we could add user authentication to navigate to either a personal profile or a different users
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //     return <Navigate to="/profile" />;
  //   }

  // If we are still in the loading stage, display this to user
  if (loading) {
    return <div>Loading</div>;
  }

  //   //make sure you cant get to profile page without being logged in
  //   if (!user?.username) {
  //     return (
  //       <h4>
  //         You need to be logged in to see this page. Use the navigation links
  //         above to sign up or log in!
  //       </h4>
  //     );
  //   }

  return (
    <>
      <h1>Welcome to your home</h1>
      <div className="container house">
        <div className="pets">Pet area</div>

        <div className="snacks">Snacks</div>

        <div className="living-room">
          <div className="couch">Couch</div>
          <div className="tv">TV</div>
        </div>

        <button>Person</button>
      </div>
      <div className="comment-section">
        <h1>Leave a comment on their page!</h1>
        <div className="comment-text">
          <input placeholder="leave a comment!"></input>
        </div>
        <div className="comments">
          <Card>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;
