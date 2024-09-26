import React from 'react';
import CategoryList from './CategoryList'; // Adjust the path as needed
import './CategoryList.css'; // Import the CSS file for styling

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-text">
                <h2 style={{fontSize:'1.5rem'}}>Welcome to RockStore</h2>
                <p>
                    Discover a wide range of car spare parts that suit your needs. From apparel to electrical equipment, we have it all.
                    Shop now and enjoy the best deals available!
                </p>
            </div>
            <div className="category-list">
                <CategoryList />
            </div>
        </div>
    );
};

export default HeroSection;
