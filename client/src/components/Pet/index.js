import React, { useEffect, useState } from "react";
import "./index.css";
import { ADD_PRAISE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
function Pet(item) {
  const { _id, name, breed, username, species, age, gender, praises } = item;

  // const [praiseCount, setPraiseCount] = useState(praises.length);

  return (
    <div className="pet-facts">
      <h1 id="name">
        My name is <span className="highlight">{name}</span>!
      </h1>
      <ul>
        <li id="user">
          My favorite human is <span className="highlight">{username}</span>!
        </li>
        <li id="species">
          I'm a <span className="highlight">{breed}</span>!
        </li>

        {age > 1 ? (
          <li>
            I'm <span className="highlight">{age}</span> years old
          </li>
        ) : (
          <li>
            I'm <span className="highlight">{age}</span> year old
          </li>
        )}
        <li>
          I'm a <span className="highlight">{gender}</span>
        </li>

        <li className="praises" id="praises">
          I've been given <span className="highlight">{praises.length} </span>
          treats!
        </li>
      </ul>{" "}
    </div>
  );
}

export default Pet;
