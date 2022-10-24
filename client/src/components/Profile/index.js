import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { QUERY_USER, QUERY_OTHER_USER, QUERY_PETS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Button } from "react-bootstrap";
import Pet from "../Pet";
import "./index.css";
import { ADD_COMMENT, DELETE_COMMENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
const Profile = () => {
  const [currentPet, setPet] = useState("");

  // Comment initializing
  const [commentText, setComment] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const [deleteComment, { error: deleteError }] = useMutation(DELETE_COMMENT);
  const [commentId, getCommentId] = useState("");

  //getting url parameter
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(
    userParam ? QUERY_OTHER_USER : QUERY_USER,
    {
      variables: { username: userParam },
    }
  );

  const { loading: petLoading, data: petData } = useQuery(QUERY_PETS);
  const user = data?.user || data?.otherUser || {};
  console.log(user.status);
  const pets = petData?.pets || {};
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
  const handleDeleteButton = async (event) => {
    event.preventDefault();

    // try {
    //   await deleteComment({
    //     variables: { commentId, statusId },
    //   });
    // } catch (e) {
    //   console.error(e);
    // }
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

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="profile-title">
            Welcome to {userParam ? `${user.username}'s` : "your"} home.
          </h1>
          <div className="profile-page">
            <div className="container house">
              <div className="pets">
                {user.pets.map((pet, index) => (
                  <button
                    key={pet._id + index.toString()}
                    onClick={() => {
                      setPet(pet._id);
                    }}
                  >
                    <img className="pet" src={`/images/${pet.image}`}></img>
                  </button>
                ))}
              </div>

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
                </>
              ) : (
                <>
                  <h1>Click a pet to learn about them!</h1>
                </>
              )}
            </div>
          </div>
          <div className="comment-section">
            {user.status ? (
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
                <div>Loading Status</div>
              </>
            )}

            {user.comments ? (
              <div className="comments">
                <h3>{user.username}'s Comments</h3>
                {user.status.comments ? (
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
                        {/* <Button variant="danger" onSubmit={handleDeleteButton}>
                          Delete Comment
                        </Button> */}
                      </Card>
                    </div>
                  ))
                ) : (
                  <>There are no comments</>
                )}
              </div>
            ) : (
              <div>There are no comments yet!</div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
