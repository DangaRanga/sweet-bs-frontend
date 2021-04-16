import React, { useState } from 'react';
import { AuthForm } from '../../components';

import './Login.css';

interface LoginProps {}

function Login(props: LoginProps) {
    return (
        <div id="login">
            <AuthForm isLogin={true}></AuthForm>
        </div>
    );
}

export default Login;
