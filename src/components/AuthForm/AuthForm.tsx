import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { IRegistration, login, register } from '../../hooks/AppHooks';

import './AuthForm.css';
import SweetBsLogo from "../../assets/CLIENT/Sweet B's Long.png";

interface AuthFormProps {
    isLogin: boolean;
}

function AuthForm({ isLogin: isLogin }: AuthFormProps) {
    const history = useHistory();
    const [formState, setFormState] = useState<IRegistration>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        address: [],
        password: '',
        passwordConfirm: '',
    });

    function validateForSignup() {
        if (formState.password !== formState.passwordConfirm) {
            alert('Passwords do not match');
            return false;
        }
        return true;
    }

    async function submit(e: any) {
        e.preventDefault();
        let userData = {};
        if (isLogin) {
            userData = await login(formState.username, formState.password);
        } else {
            if (validateForSignup()) {
                userData = await register(formState);
            }
        }
    }

    return (
        <div id="auth-form">
            <header id="auth-header">
                <img src={SweetBsLogo} />
            </header>
            <form>
                {!isLogin && (
                    <div className="form-field">
                        <input
                            className="input-field"
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder=" "
                            value={formState.firstName}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    firstName: e.target.value,
                                }))
                            }
                        />
                        <span className="floating-label">First Name</span>
                    </div>
                )}
                {!isLogin && (
                    <div className="form-field">
                        <input
                            className="input-field"
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder=" "
                            value={formState.lastName}
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    lastName: e.target.value,
                                }))
                            }
                        />
                        <span className="floating-label">Last Name</span>
                    </div>
                )}
                <div className="form-field">
                    <input
                        className="input-field"
                        id="username"
                        type="text"
                        value={formState.username}
                        placeholder=" "
                        onChange={(e) =>
                            setFormState((prev) => ({
                                ...prev,
                                username: e.target.value,
                            }))
                        }
                    ></input>
                    <span className="floating-label">Username</span>
                </div>
                <div className="form-field">
                    <input
                        className="input-field"
                        value={formState.password}
                        id="password"
                        type="password"
                        placeholder=" "
                        onChange={(e) =>
                            setFormState((prev) => ({
                                ...prev,
                                password: e.target.value,
                            }))
                        }
                    ></input>
                    <span className="floating-label">Password</span>
                </div>
                {!isLogin && (
                    <div className="form-field">
                        <input
                            className="input-field"
                            type="password"
                            name="password-confirm"
                            id="password-confim"
                            placeholder=" "
                            onChange={(e) =>
                                setFormState((prev) => ({
                                    ...prev,
                                    passwordConfirm: e.target.value,
                                }))
                            }
                        />
                        <span className="floating-label">Confirm Password</span>
                    </div>
                )}

                <div id="auth-toggle">
                    {isLogin ? "Don't have" : 'Already have'} an account?{' '}
                    <button
                        id="form-toggle"
                        onClick={(e) => {
                            /* Redirect to signup if the form is a login form */
                            !isLogin
                                ? history.push('/login')
                                : history.push('/signup');
                        }}
                    >
                        Sign {!isLogin ? 'in' : 'up'}
                    </button>
                </div>
                <button className="btn auth-btn" onClick={(e) => submit(e)}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}

export default AuthForm;
