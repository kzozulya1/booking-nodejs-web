import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { ROOMS_ROUTE } from '../../routes';
import './styles.scss';

const LogoComponent = () => (
    <div className="logo">
        <Link to={ROOMS_ROUTE}>
            <span className="main">Lucky</span><span className="suffix">booking</span>
        </Link>
    </div>
);

export default LogoComponent;