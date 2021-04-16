import React, { Component } from 'react';
import { AuthForm } from '../../components';

import './SignUp.css';

import PinkSpiral from '../../assets/bg/Pink Spiral.png';
interface SignUpProps {}

interface SignUpState {}

export default function SignUp(props: SignUpProps) {
    return (
        <div id="signup">
            <AuthForm isLogin={false}></AuthForm>
        </div>
    );
}
