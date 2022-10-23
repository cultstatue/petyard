import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ALL_USERS, QUERY_USER } from "../../utils/queries";
import User from "../User";
import "./index.css";
import Auth from "../../utils/auth";
import { UPDATE_STATUS } from "../../utils/mutations";
const Home = () => {
  //get user data for statusID
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  const me = userData?.user || {};

  const statusId = "1234";
  //update status
  const [statusText, setStatus] = useState("");
  const [updateStatus, { error }] = useMutation(UPDATE_STATUS);

  //handle Status data
  const handleChange = (event) => {
    // console.log("in handleChange");
    if (event.target.value.length <= 280) {
      setStatus(event.target.value);
    }
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (data) {
      try {
        await updateStatus({
          variables: { statusId, statusText },
        });

        //clear the form
        setStatus("");
        // setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // toggleStatus
  const [currentUser, setCurrentUser] = useState("");
  // console.log(currentUser);
  const { loading, data } = useQuery(QUERY_ALL_USERS);
  const users = data?.users || {};

  function filterUser() {
    if (!currentUser) {
      return users.status;
    }
    const foundUser = users.filter((user) => user.username === currentUser);
    // console.log(foundUser);

    return foundUser;
  }

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div className="flex-row homepage">
      {" "}
      <div className="status-section">
        <h1>What's your status?</h1>

        <form className="comment-form" onSubmit={handleFormSubmit}>
          <textarea
            placeholder="Say something nice..."
            className="form-input "
            value={statusText}
            onChange={handleChange}
          ></textarea>

          <button className="sub-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="map">
        {users.map((user, index) => (
          <div className="player-position" key={user._id + index.toString()}>
            <Link to={`/profile/${user.username}`}>
              <button
                onClick={() => {
                  setCurrentUser(user.username);
                }}
              >
                <p className="user-tag">{user.username}</p>
                <img
                  className="player"
                  src={`/images/${user.profile_img}`}
                ></img>
              </button>{" "}
            </Link>
          </div>
        ))}
      </div>
      <div className="dialogue">
        {currentUser ? (
          <>
            {filterUser().map((user) => (
              <>
                <User
                  key={user._id}
                  _id={user._id}
                  statusText={user.status.statusText}
                  username={user.username}
                />
              </>
            ))}
          </>
        ) : (
          <>
            <p>Choose a user to see how they feel!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
