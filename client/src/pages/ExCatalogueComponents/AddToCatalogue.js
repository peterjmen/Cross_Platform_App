import React from 'react';

const AddToCatalogue = ({ name, handleChange, handleSubmitExercise }) => {
    return <form className="addForm" onSubmit={handleSubmitExercise}>
        <label htmlFor="addItem">Add Item</label>
        <input
            autoFocus
            id="addToCatalogue"
            type="text"
            placeholder="Add Item"
            required
            value={name}
            onChange={handleChange}
        />
        <button type="submit" aria-label="Add Exercise">
            Add Item
        </button>
    </form>;
};

export default AddToCatalogue;
