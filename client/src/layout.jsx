import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { styled } from 'styled-components';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { NavigationBar } from './components/navigation';
import { ExerciseCard } from './components/exercise-card';
import './default.css';
import './common.css';
import { ProfilePage } from './pages/profile';

export function Layout() {
    return <Router>
        <NavigationBar />

        <Main>
            <Routes>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<Container><ProfilePage /></Container>} />

                <Route path="/exercises" element={<Container>
                    {/* NOTE: JUST AN EXAMPLE */}

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gridGap: '1rem',
                        padding: '1rem',
                    }}>
                        <ExerciseCard exercise={{
                            name: 'Push-ups',
                            description: 'Start in a plank position with your hands shoulder-width apart.',
                            bodyPart: 'Upper body',
                            imageUrl: 'https://images.everydayhealth.com/images/consisten-exercise-helps-anxiety-and-stress-1440x810.jpg',
                            muscles: ['Chest', 'Shoulders', 'Triceps'],
                        }} programs={[
                            { id: 1, name: 'Program 1' },
                            { id: 2, name: 'Program 2' },
                            { id: 3, name: 'Program 3' },
                        ]} />
                        <ExerciseCard exercise={{
                            name: 'Push-ups',
                            description: 'Start in a plank position with your hands shoulder-width apart.',
                            bodyPart: 'Upper body',
                            imageUrl: 'https://images.everydayhealth.com/images/consisten-exercise-helps-anxiety-and-stress-1440x810.jpg',
                            muscles: ['Chest', 'Shoulders', 'Triceps'],
                        }} programs={[
                            { id: 1, name: 'Program 1' },
                            { id: 2, name: 'Program 2' },
                            { id: 3, name: 'Program 3' },
                        ]} />
                    </div>

                    {/* NOTE: JUST AN EXAMPLE */}
                </Container>} />
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
