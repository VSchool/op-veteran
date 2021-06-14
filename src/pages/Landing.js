import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Button } from "../components/Button";
import { GoogleButton } from "../components/GoogleButton";
import { Input } from "../components/Input";
import logo from "../assets/images/vetfest-logo.png";
import StatusMessage from "../components/StatusMessage";
import { useHistory } from "react-router-dom";
import {
  LandingContainer,
  Logo,
  Subheader,
  Header,
  HeaderWrapper,
  ButtonWrapper,
  FormWrapper,
  Wrapper,
  Row,
} from "../Elements/basic";

export default function Landing() {
  const {
    authError,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
  } = useContext(AuthContext);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [state, setState] = useState(null);
  const states = { REGISTER: "register", SIGNUP: "signup" };
  const selectRegister = (e) => {};
  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithGoogle();
  };
  const ActionCodeSettings = {

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { email, password } = inputs;
    console.log(inputs);
    /*** Add validation ***/
    const { name } = e.target;
    if (e.target.innerText === "Register") {
      signUpWithEmail(email, password);
    } else if (e.target.innerText === "Sign in") {
      signInWithEmail(email, password);
    }
  };
  const history = useHistory(null);
  return (
    <LandingContainer>
      {authError ? <StatusMessage message={authError} /> : null}
      <Logo src={logo} alt="OP Veteran VetFest logo" />
      <Wrapper>
        <HeaderWrapper>
          <Subheader>OP Veteran</Subheader>
          <Header>VetFest Registration</Header>
        </HeaderWrapper>
        <FormWrapper name="landingform">
          {/* <Input
            className="email"
            type="email"
            helperText={null}
            labelText="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <Input
            className="password"
            type="password"
            helperText="8 characters"
            labelText="password"
            name="password"
            value={inputs.value}
            onChange={handleChange}
          />

          <Button
            buttonText={"Register"}
            buttonStyle={"primary"}
            onClick={handleClick}
            name="register"
          />
          <Button
            buttonText={"Sign in"}
            buttonStyle={"secondary"}
            onClick={handleClick}
            name="signin"
          />
          <Row>
            <p>or</p>
          </Row> */}
          <GoogleButton
            buttonStyle="secondary"
            buttonText="Sign in with "
            fontColor="#545454"
            onClick={handleGoogle}
          />
        </FormWrapper>
      </Wrapper>
    </LandingContainer>
  );
}
