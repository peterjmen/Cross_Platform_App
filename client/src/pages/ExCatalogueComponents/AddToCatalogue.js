import React from 'react';

const AddToCatalogue = ({ name, handleChange, handleSubmitExercise }) => {
    return <form className="addForm" onSubmit={handleSubmitExercise}>
        <label htmlFor="addItem">Add Exercise</label>
        <input
            autoFocus
            id="addToCatalogue"
            type="text"
            placeholder="Add Exercise"
            required
            value={name}
            onChange={handleChange}
        />
        <button type="submit" aria-label="Add Exercise">
            +
        </button>
    </form>;
};

export default AddToCatalogue;
