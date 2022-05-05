import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
    display: flex;
    h1:hover{
        color: #000000;
    }
`

const NavWrapper = styled.nav`
    display: flex;
`

const Header = () => {
    return (
        <HeaderWrapper>
            <Link to='/'>
                <h1>Brew Maps</h1>
            </Link>
            <NavWrapper>
                <ul>
                    <li>
                        <NavLink to='/about'>About</NavLink>
                    </li>
                </ul>
            </NavWrapper>
        </HeaderWrapper>
    )
}

export default Header;