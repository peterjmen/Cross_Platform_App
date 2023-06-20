import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { NavigationBar } from './components/navigation';
import './default.css';
import './common.css';

const Main = styled.main`
    background-color: hsl(var(--background-color));
    min-height: calc(100vh - 56px);
    height: 100%;
    margin-top: 56px;
    width: 100%;
`;

export function Layout() {
    return <Router>
        <NavigationBar />

        <Main>
            <Routes>
                <Route path="/" element={<div>Hello world</div>} />
            </Routes>
        </Main>
    </Router>;
}
