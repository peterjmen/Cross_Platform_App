import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './logo';
import { Button } from './button';

export function NavigationBar() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function setLoginState() {
        const name = localStorage.getItem('name');
        const token = localStorage.getItem('token');
        if (name && token) setIsLoggedIn(true);
    }

    useEffect(() => void setLoginState(), []);
    useEffect(() => void setLoginState(), [location]);

    // NOTE: Not currently responsive, can be done later
    return <header className="fixed top-0 h-14 flex items-center bg-slate-100 w-screen p-2 shadow-md">
        <Link to="/" className="flex items-center text-blue-500 fill-blue-500">
            <Logo className="w-10 h-10" />
            <h1 className="font-semibold text-xl">Exercise App</h1>
        </Link>

        <nav className="mx-auto space-x-6">
            <NavigationLink to="/">Home</NavigationLink>
            <NavigationLink to="/templates">Templates</NavigationLink>
            <NavigationLink to="/exercises">Exercises</NavigationLink>
            <NavigationLink to="/programs">Programs</NavigationLink>

            {isLoggedIn && <>
                <NavigationLink to="/profile">Profile</NavigationLink>
            </>}

            {!isLoggedIn && <>
                <NavigationLink to="/login">
                    <Button variant="primary">Sign In</Button>
                </NavigationLink>
            </>}
        </nav>
    </header>
}

export function NavigationLink(props) {
    return <Link className="text-black/70 hover:text-black transition-colors duration-200" {...props} />;
}
