import React from "react";
import { SingnUp } from "../features/Auth/Components/SingnUp";
import Navbar from "../features/navbar/Navbar";

const SignupPage = () => {
  return (
    <>
      <Navbar>
        <SingnUp />
      </Navbar>
    </>
  );
};

export default SignupPage;
