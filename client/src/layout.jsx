import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { ProfilePage } from './pages/profile';
import { ExercisesPage } from './pages/exercises';
import { NavigationBar } from './components/navigation';
import { ProgramsPage } from './pages/programs';
import { ProgramPage } from './pages/program/[id]';
import './default.css';
import './common.css';

export function Layout() {
    return <Router>
        <NavigationBar />

        <Main>
            <Routes>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<Container><ProfilePage /></Container>} />

                <Route path="/exercises" element={<Container><ExercisesPage /></Container>} />
                <Route path="/programs" element={<Container><ProgramsPage /></Container>} />
                <Route path="/programs/:id" element={<Container><ProgramPage /></Container>} />
            </Routes>
        </Main>
    </Router>;
}

const Main = styled.main`
    background-color: hsl(var(--background-color));
    min-height: calc(100vh - 56px);
    height: 100%;
    margin-top: 56px;
    width: 100%;
`;

// Adds a max width to the content and centers it
// Wrap your page in this if your page is not full width
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
