import React from 'react';

const ExercisesInProgram = ({ exercises, handleRemove, handleTickBox }) => {
    const handleClick = id => {
        handleRemove(id);
    };

    const handleCheckboxChange = id => {
        handleTickBox(id);
    };

    return <div>
        {exercises.map(exercise => <div key={exercise.id}>
            <input
                type="checkbox"
                checked={exercise.checked}
                onChange={() => handleCheckboxChange(exercise.id)}
            />
            <span>{exercise.name}</span>
            <button onClick={() => handleClick(exercise.id)}>Remove</button>
        </div>)}
    </div>;
};

export default ExercisesInProgram;
