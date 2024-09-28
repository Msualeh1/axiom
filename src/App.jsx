import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Productpage from './Productpage'; // Ensure this path is correct
import Homepage from './Homepage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/grandchild/:slug" element={<Productpage />} />
                <Route path="/products" element={<Productpage />} /> {/* Corrected this line */}
            </Routes>
        </Router>
    );
};

export default App;
