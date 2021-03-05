import React, { Component } from 'react';
import './NotFound.css';
import NotFoundImg from '../../assets/images/page_not_found 1.svg';
import logo from "../../assets/CLIENT/Sweet B's Long.png";
import { Icons } from '../../components';
import { Link } from 'react-router-dom';

interface NotFoundProps {}

interface NotFoundState {}

export default class NotFound extends Component<NotFoundProps, NotFoundState> {
    render() {
        return (
            <div id="not-found">
                <img src={NotFoundImg} alt="404" />
                <div className="action">
                    <h1>There's nothing here</h1>
                    <Link to="/menu">
                        <button className="filled btn">
                            Back To <img src={logo} alt="Sweet B's" />
                            <Icons.ChevronRight fill="white" />
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

