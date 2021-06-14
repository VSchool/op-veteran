import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";
import {Button} from "../components/Button";
import GoogleLoginButton from "../components/GoogleLoginButton";
import {Input} from "../components/Input";
import logo from "../assets/images/vetfest-logo.png";
import StatusMessage from "../components/StatusMessage";
import {
  LandingContainer,
  Logo,
  Subheader,
  Header,
  HeaderWrapper,
  ButtonWrapper,
  FormWrapper,
  Wrapper
} from "../Elements/basic";

export default function RegisterAccount() {
  const {authError, signInWithGoogle, signInWithEmail, signUpWithEmail} = useContext(AuthContext);
  const history = useHistory(null)
  const [inputs,
    setInputs] = useState({email: "", password: ""});

  const handleChange = e => {
    const {name, value} = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleClick = e => {
    const {email, password} = inputs;
    /*** Add validation ***/
    const {name} = e.target;
    if (name === "register") {
      signUpWithEmail(email, password);
    }
    signInWithEmail(email, password);
  }
  return (
    <LandingContainer>
      {authError
        ? <StatusMessage message={authError}/>
        : null}
      <Logo src={logo} alt="OP Veteran VetFest logo"/>
      <Wrapper>
        <HeaderWrapper>
          <Subheader>OP Veteran</Subheader>
          <Header>VetFest Registration</Header>
        </HeaderWrapper>
        <FormWrapper>
          <Input
            className={'email-input'}
            labelText={'Email'}
            placeholder={'n.namerson@email.com'}
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}/>
          <Input
            className={'pass-input'}
            labelText={'Password'}
            placeholder={''}
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}/>
          <Button
            buttonText={"Register"}
            buttonStyle={"primary"}
            onClick={() => {}}
            name="register"/>
          <GoogleLoginButton
            buttonText={"Sign in"}
            buttonStyle={"secondary"}
            onClick={signInWithGoogle}
            name="signin"/>
        </FormWrapper>
      </Wrapper>
    </LandingContainer>
  );
}
