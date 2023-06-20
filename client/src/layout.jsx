import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { NavigationBar } from './components/navigation';

export function Layout() {
    return <Router>
        <NavigationBar />

        <main
            className="h-full w-full bg-slate-200"
            style={{ minHeight: 'calc(100vh - 56px)', height: 'calc(100vh - 56px)', marginTop: '56px' }}
        >
            <Routes>
                {/* <Route path="/login" element={<LoginPage />} /> */}
                {/* <Route path="/register" element={<RegisterPage />} /> */}
            </Routes>
        </main>
    </Router>;
}
