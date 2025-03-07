"use client";
import { useState, useEffect } from "react";

export default function CategoryFilter({ onSelectCategory }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products");
                const products = await res.json();

                if (!Array.isArray(products)) {
                    console.error("Unexpected data format:", products);
                    return;
                }

                const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
            setLoading(false);
        };
        fetchCategories();
    }, []);

    return (
        <div className="w-full max-w-xs ">
            <select
                onChange={(e) => onSelectCategory(e.target.value)}
                className="w-full cursor-pointer  rounded-lg py-3 px-5 text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Categories</option>
                {loading ? (
                    <option disabled>Loading categories...</option>
                ) : (
                    categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
}
