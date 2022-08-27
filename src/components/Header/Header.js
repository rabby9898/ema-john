import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <img src={logo}/>
            <nav>
                <a href='/shop'>shop</a>
                <a href='/review'>Order review</a>
                <a href='/manage'>Manage Inventory</a>
                <a href='/SignUp'>Sign Up</a>
                <a href='/Account'>Account</a>
            </nav>
        </div>
    );
};

export default Header;