import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';
import EmptyLayout from 'layouts/EmptyLayout';

import BooksPage from 'pages/BooksPage';
import ReadersPage from 'pages/ReadersPage';
import LoansPage from 'pages/LoansPage';
import StatsPage from 'pages/StatsPage';
import NotFoundPage from 'pages/NotFoundPage';
import StyleGuide from 'pages/StyleGuide';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="books" element={<BooksPage />} />
                    <Route path="readers" element={<ReadersPage />} />
                    <Route path="loans" element={<LoansPage />} />
                    <Route path="stats" element={<StatsPage />} />
                    <Route path="/" element={<Navigate to="/books" replace />} />
                </Route>

                <Route element={<EmptyLayout />}>
                    <Route path="styleguide" element={<StyleGuide />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
