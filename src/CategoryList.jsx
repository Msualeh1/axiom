import React, { useState, useEffect } from 'react';
import './CategoryList.css'; // Ensure this is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


// Component for displaying grandchild categories (third level)
const GrandchildCategory = ({ grandchildCategories = [], onEdit }) => {
    useEffect(() => {
        console.log("grandchildCategories:", grandchildCategories);  // Logging to check data
    }, [grandchildCategories]);

    return (
        <ul>
            {grandchildCategories.map((grandchild) => (
                <li key={grandchild.slug}>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Link to={`/grandchild/${grandchild.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span>{grandchild.name}</span>
                        </Link>
                        
                        <FontAwesomeIcon
                            icon={faEdit}
                            style={{ marginLeft: 'auto', cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent click from bubbling up
                                onEdit(grandchild); // Pass grandchild object for editing
                            }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};

// Component for displaying child categories (second level)
const ChildCategory = ({ childCategories = [], onEdit }) => {
    const [expandedChild, setExpandedChild] = useState(null);

    useEffect(() => {
        console.log("childCategories:", childCategories);  // Logging to check data
    }, [childCategories]);

    return (
        <ul>
            {childCategories.map((child) => (
                <li key={child.slug}>
                    <div
                        onClick={() => setExpandedChild(child.slug === expandedChild ? null : child.slug)}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <FontAwesomeIcon icon={expandedChild === child.slug ? faChevronDown : faChevronRight} style={{ marginRight: '8px' }} />
                        <span>{child.name}</span>
                        <FontAwesomeIcon
                            icon={faEdit}
                            style={{ marginLeft: 'auto', cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent click from bubbling up
                                onEdit(child); // Pass child object for editing
                            }}
                        />
                    </div>
                    {/* Safely render grandchild categories */}
                    {expandedChild === child.slug && (
                        <GrandchildCategory grandchildCategories={child.grandchildCategories || []} onEdit={onEdit} />
                    )}
                </li>
            ))}
        </ul>
    );
};

// Main component that fetches data and renders the top-level categories (first level)
const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                // Ensure that childCategories and grandchildCategories are arrays
                const updatedData = data.map(category => ({
                    ...category,
                    childCategories: (category.childCategories || []).map(child => ({
                        ...child,
                        grandchildCategories: child.grandchildCategories || []
                    }))
                }));
                setCategories(updatedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Edit handler to rename categories
    const handleEdit = async (item) => {
        const newName = prompt("Enter the new category name:", item.name);

        if (newName !== null && newName.trim() !== "") {
            const updatedCategory = { ...item, name: newName };
            await handleSaveEdit(updatedCategory);
        } else {
            alert("Category name cannot be empty.");
        }
    };

    // Save the updated category to the server
    const handleSaveEdit = async (updatedCategory) => {
        console.log("Updating category with slug:", updatedCategory.slug);
        try {
            const response = await fetch(`http://localhost:5000/api/categories/${updatedCategory.slug}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            // Update the local categories state with the updated category
            setCategories((prevCategories) => {
                return prevCategories.map((category) => {
                    // Update top-level category
                    if (category.slug === updatedCategory.slug) {
                        return { ...category, name: updatedCategory.name };
                    }

                    // Update child categories
                    const updatedChildCategories = category.childCategories.map((child) => {
                        if (child.slug === updatedCategory.slug) {
                            return { ...child, name: updatedCategory.name };
                        }

                        // Update grandchild categories
                        const updatedGrandchildCategories = child.grandchildCategories.map((grandchild) => {
                            if (grandchild.slug === updatedCategory.slug) {
                                return { ...grandchild, name: updatedCategory.name };
                            }
                            return grandchild;
                        });

                        return { ...child, grandchildCategories: updatedGrandchildCategories };
                    });

                    return { ...category, childCategories: updatedChildCategories };
                });
            });
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    // Handle loading and error states
    if (loading) {
        return <div className="loading">Loading categories, please wait...</div>;
    }

    if (error) {
        return <div className="error">Error fetching categories: {error}</div>;
    }

    // Render categories list
    return (
        <div className="category-tab">
            <ul>
                {categories.map((category) => (
                    <li key={category.slug}>
                        <div
                            onClick={() => setExpandedCategory(category.slug === expandedCategory ? null : category.slug)}
                            style={{ display: 'flex', alignItems: 'center'}}
                        >
                            <FontAwesomeIcon icon={expandedCategory === category.slug ? faChevronDown : faChevronRight} style={{ marginRight: '8px' }} />
                            <span>{category.name}</span>
                            <FontAwesomeIcon
                                icon={faEdit} 
                                style={{ marginLeft: 'auto', cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent click from bubbling up
                                    handleEdit(category); // Pass category for editing
                                }}
                            />
                        </div>
                        {expandedCategory === category.slug && (
                            <ChildCategory childCategories={category.childCategories || []} onEdit={handleEdit} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
