import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from './common/button';
import { Logo } from './logo';

export function NavigationBar() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function setLoginState() {
        const name = localStorage.getItem('name');
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        if (name && id && token) setIsLoggedIn(true);
    }

    useEffect(() => void setLoginState(), []);
    useEffect(() => void setLoginState(), [location]);

    return <Header>
        <IconLink to="/">
            <Logo style={{ width: '40px', height: '40px' }} />
            <Title>Exercise App</Title>
        </IconLink>

        <Nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/exercises">Exercises</NavLink>
            <NavLink to="/programs">Programs</NavLink>

            {isLoggedIn && <>
                <NavLink to="/profile">Profile</NavLink>
            </>}

            {!isLoggedIn && <>
                <NavLink to="/login">
                    <Button variant="primary">Sign In</Button>
                </NavLink>
            </>}
        </Nav>
    </Header>
}

const Header = styled.header`
    position: fixed;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    width: 100vw;
    padding: 8px;
    background-color: hsl(var(--background-color));
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconLink = styled(Link)`
    display: flex;
    align-items: center;
    color: hsl(var(--primary-color));
    fill: hsl(var(--primary-color));
`;

const NavLink = styled(Link)`
    color: rgba(0, 0, 0, 0.7);
    transition: color 0.2s;
    &:hover { color: rgba(0, 0, 0, 0.9); }
`;

const Title = styled.h1`
    font-weight: 600;
    font-size: 1.5rem;
    margin-left: 0.5rem;
`;

const Nav = styled.nav`
    margin: auto;
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;
