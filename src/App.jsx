import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductPage from './Productpage'; // Create this component for displaying products
import Homepage from './Homepage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/grandchild/:slug" element={<ProductPage />} />
            </Routes>
        </Router>
    );
};

export default App;
