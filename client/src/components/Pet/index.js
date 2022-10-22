import React from "react";
import "./index.css";
function Pet(item) {
  const { _id, name, breed, username, species, age, gender, praises } = item;

  return (
    <div>
      <h1>My name is {name}!</h1>
      <p>My favorite human is {username}!</p>
      <p>I'm a {species}!</p>

      {age > 1 ? <p>I'm {age} years old</p> : <p>I'm {age} year old</p>}
      <p>I'm a {gender}</p>
      <div className="praises">
        <h4>My Praises!</h4>
        {praises.map((praise, index) => (
          <p className="praise" key={praise._id + index.toString()}>
            {praise.praiseText}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Pet;
