import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_USER, QUERY_OTHER_USER, QUERY_PETS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Button } from "react-bootstrap";
import Pet from "../Pet";
import "./index.css";
import { ADD_COMMENT, DELETE_COMMENT, ADD_PRAISE } from "../../utils/mutations";
import Auth from "../../utils/auth";
const Profile = () => {
  const [currentPet, setPet] = useState("");
  const [addPraise, { error: praiseError }] = useMutation(ADD_PRAISE);
  const [numPraise, setNumPraise] = useState(null);

  // Comment initializing
  const [commentText, setComment] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  //getting url parameter
  const { username: userParam } = useParams();
  console.log(userParam);
  const { loading, data, refetch } = useQuery(
    userParam ? QUERY_OTHER_USER : QUERY_USER,
    {
      variables: { username: userParam },
    }
  );
  console.log(data);
  const [pets, setPets] = useState("");
  const [user, setUser] = useState("");
  const { loading: petLoading, data: petData } = useQuery(QUERY_PETS);
  useEffect(() => {
    setUser(data?.user || data?.otherUser || {});
    setPets(petData);
  });
  console.log(user);

  // const user = data?.user || data?.otherUser || {};
  // console.log(user.status);
  // const pets = petData?.pets || {};

  const statusId = user?.status?._id || "1234";
  //navigate to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  //make sure you cant get to profile page without being logged in
  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  if (petLoading) {
    return <div> loading</div>;
  }

  const handleTreatSubmit = async (event) => {
    console.log("in handleSubmit");
    event.preventDefault();
    console.log("trying to add praise");
    try {
      await addPraise({
        variables: { petId: currentPet },
      });
      await refetch(userParam ? QUERY_OTHER_USER : QUERY_USER, {
        variables: { username: userParam },
      });
      setUser(data?.user || data?.otherUser || {});
    } catch (e) {
      console.error(e);
    }
    console.log("done");
  };
  // console.log(user.status._id);
  //handle comment data
  const handleChange = (event) => {
    // console.log("in handleChange");
    if (event.target.value.length <= 280) {
      setComment(event.target.value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (data) {
      try {
        await addComment({
          variables: { commentText, statusId },
        });

        //clear the form
        setComment("");
        // setCharacterCount(0);
      } catch (e) {
        console.error(e);
      }
    }
  };

  function filterPet() {
    // console.log(currentPet);
    if (!currentPet) {
      return user.pets;
    }
    // console.log(pets);
    const finalPet = pets.filter((pet) => pet._id === currentPet);
    // console.log(finalPet);
    return finalPet;
  }

  // useEffect(() => {
  //   const response = useQuery(QUERY_USER);
  // });

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          <div className="profile-page">
            <h1 className="profile-title">
              Welcome to {userParam ? `${user.username}'s` : "your"} home.
            </h1>

            <div className="container house">
              {user.pets ? (
                <>
                  {" "}
                  <div className="pets">
                    {user.pets.map((pet, index) => (
                      <button
                        key={pet._id + index.toString()}
                        onClick={() => {
                          setPet(pet._id);
                        }}
                      >
                        <img
                          className="pet"
                          src={`/images/${pet.image}`}
                          alt="animal profile image"
                        ></img>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p>No pets for this user...</p>
                </>
              )}

              <div className="char">
                {" "}
                <img
                  className="in-house-player"
                  src={`/images/${user.profile_img}`}
                />
              </div>
            </div>
            <div className="pet-info">
              {currentPet ? (
                <>
                  {filterPet().map((pet) => (
                    <Pet
                      key={pet._id}
                      _id={pet._id}
                      name={pet.name}
                      breed={pet.breed}
                      username={pet.username}
                      species={pet.species}
                      age={pet.age}
                      gender={pet.gender}
                      praises={pet.praises}
                    />
                  ))}
                  <button id="treat-btn" onClick={handleTreatSubmit}>
                    Give Treat!
                  </button>
                </>
              ) : (
                <>
                  {user.pets != 0 ? (
                    <>
                      <h1>Click a pet to learn about them!</h1>
                    </>
                  ) : (
                    <>
                      <h1>No pets in this home...</h1>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="comment-section">
            {user.status != null ? (
              <>
                <div className="comment-text">
                  <h1>Leave a comment on their page!</h1>
                  <form className="comment-form" onSubmit={handleFormSubmit}>
                    <textarea
                      placeholder="Say something nice..."
                      value={commentText}
                      className="form-input "
                      onChange={handleChange}
                    ></textarea>

                    <button className="sub-btn" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div>No status yet!</div>
              </>
            )}

            {user.status != null ? (
              <div className="comments">
                <h3>{user.username}'s Comments</h3>
                {user.status.comments != 0 ? (
                  user.status.comments.map((comment, index) => (
                    <div
                      className="comment"
                      key={comment._id + index.toString()}
                    >
                      <Card>
                        <Card.Body>
                          <Card.Title>{comment.commentText}</Card.Title>
                          <Card.Text>Written by {comment.username}</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                ) : (
                  <>There are no comments</>
                )}
              </div>
            ) : (
              <div className="no-content">There are no comments yet...</div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
