import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationBar } from './components/navigation';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import './default.css';
import './common.css';

const Main = styled.main`
    background-color: hsl(var(--background-color));
    min-height: calc(100vh - 56px);
    height: 100%;
    margin-top: 56px;
    width: 100%;
`;

const Container = styled.div`
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;

    @media (min-width: 640px) {
        max-width: 640px;
    }

    @media (min-width: 768px) {
        max-width: 768px;
    }

    @media (min-width: 1024px) {
        max-width: 1024px;
    }

    @media (min-width: 1280px) {
        max-width: 1280px;
    }
`;

export function Layout() {
    return <Router>
        <NavigationBar />

        <Main>
            <Routes>
                <Route path="/" element={<Container>Hello world</Container>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Main>
    </Router>;
}
