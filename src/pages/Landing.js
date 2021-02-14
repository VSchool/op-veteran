import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from "../context/AuthProvider";
import { Button } from '../components/Button'
import GoogleLoginButton from '../components/GoogleLoginButton'
import { Input } from '../components/Input'
import logo from '../assets/images/vetfest-logo.png'

const LandingContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    // border: 2px solid dodgerblue;

    & > img {
        width: 160px;
        position: absolute;
        top: 32px;
        left: calc(50% - 160px/2);
        // border: 1px dotted orange;
    }

    & > h1 {
        box-sizing: border-box;
        margin: 0px;
        position: absolute;
        top: 168px;
        left: calc(50% - 328px/2);
        width: 328px;
        height: 32px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        line-height: 32px;
        color: #545454;
        // border: 1px dotted orange;
    }

    & > h3 {
        margin: 0px;
        box-sizing: border-box;
        position: absolute;
        top: 144px;
        left: calc(50% - 328px/2);
        width: 328px;
        height: 24px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: 0.02em;
        color: #545454;
        // border: 1px dotted orange;
    }

    & > h2 {
        margin: 0px;
        box-sizing: border-box;
        position: absolute;
        top: 288px;
        left: calc(50% - 328px/2);
        width: 328px;
        height: 24px;
        font-family: Open Sans;
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 24px;
        text-align: center;
        color: #545454;
        // border: 1px dotted orange;
    }

    & > .google {
        position: absolute; 
        top: 336px;
        left: calc(50% - 56px/2);
    }

    & > .email-input {
        position: absolute;
        top: 496px;
        left: calc(50% - 328px/2);
    }

    & > .pass-input {
        position: absolute;
        top: 584px;
        left: calc(50% - 328px/2);
    }

    & > .button-wrapper {
        box-sizing: border-box;
        padding: 0px 16px 0px 16px;
        position: absolute;
        top: 684px;
        left: calc(50% - 328px/2);
        width: 328px;
        display: flex;
        justify-content: space-between;
        // border: 1px solid red;
    }
`

export default function Landing() {
	const { authError, signInWithGoogle, signInWithEmail, signUpWithEmail } = useContext(AuthContext);
	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	});
	
	const handleChange = e => {
		const { name, value } = e.target;
		setInputs(prev => ({...prev, [name]: value }));
	}
	
	const handleClick = e => {
		const { email, password } = inputs;
		/*** Add validation ***/
		const { name } = e.target;
		if (name === "register") {
			signUpWithEmail(email, password);
		}
		signInWithEmail(email, password);
	}
	
    return (
        <LandingContainer>
            <img src={logo} alt='OP Veteran VetFest logo' />
            <h3>OP Veteran</h3>
            <h1>VetFest Registration</h1>
            <h2>Register or sign in with</h2>
            <GoogleLoginButton className={'google'} onClick={signInWithGoogle} />
            <Input className={'email-input'} labelText={'Email'} placeholder={'placeholder'} 
				type="email" name="email" value={inputs.email} onChange={handleChange}
			/>
            <Input className={'pass-input'} labelText={'Password'} placeholder={'placeholder'} 
				type="password" name="password" value={inputs.password} onChange={handleChange}
			/>
            <div className={'button-wrapper'}>
                <Button buttonText={'Register'} buttonStyle={'primary'} onClick={handleClick} name="register" />
                <Button buttonText={'Sign in'} buttonStyle={'secondary'} onClick={handleClick} name="signin" />
            </div>

        </LandingContainer>
    )
}
