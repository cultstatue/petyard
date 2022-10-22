import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
const Home = () => {
  const { loading, data } = useQuery(QUERY_USER);
  const user = data?.user || {};

  // console.log(user.username);
  return <>hello{user.username}</>;
};

export default Home;
