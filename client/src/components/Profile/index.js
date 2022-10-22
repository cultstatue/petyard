import React, { useEffect, useState } from "react";
import { QUERY_USER, QUERY_PET, QUERY_PETS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Card, Button } from "react-bootstrap";
import Pet from "../Pet";
import "./index.css";
import { ADD_COMMENT, DELETE_COMMENT } from "../../utils/mutations";
const Profile = () => {
  const [currentPet, setPet] = useState("");
  const [commentText, setComment] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);
  const [deleteComment, { error: deleteError }] = useMutation(DELETE_COMMENT);
  const [commentId, getCommentId] = useState("");
  // If we are still in the loading stage, display this to user
  const { loading, data } = useQuery(QUERY_USER);
  const { loading: petLoading, data: petData } = useQuery(QUERY_PETS);
  const user = data?.user || {};
  // console.log(data);
  // console.log(user);
  const pets = petData?.pets || {};
  const statusId = "1234";
  // if (user.status) {
  //   const statusId = user.status._id;
  // }
  // if (loading) {
  //   return <div>Loading</div>;
  // }
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
        <div>Loading</div>
      ) : (
        <>
          <h1 className="profile-title">Welcome home {user.username}!</h1>
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
                  src={"/images/female_idle.png"}
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
            <div className="comment-text">
              {" "}
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
            <div className="comments">
              <h3>{user.username}'s Comments</h3>
              {user.status.comments ? (
                user.status.comments.map((comment, index) => (
                  <div className="comment" key={comment._id + index.toString()}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{comment.commentText}</Card.Title>
                        <Card.Text>Written by {comment.username}</Card.Text>
                      </Card.Body>
                      <Button variant="danger" onSubmit={handleDeleteButton}>
                        Delete Comment
                      </Button>
                    </Card>
                  </div>
                ))
              ) : (
                <>There are no comments</>
              )}
              {/* <Card>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card> */}
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Profile;
