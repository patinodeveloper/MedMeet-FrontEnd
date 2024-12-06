import React from "react";

export const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => {
    return (
        <input
            type="text"
            className="form-control mx-2"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
