import React from 'react';

const ShowDatabaseContent = ({ exercises, deleteExercise }) => {
    return <div>
        {exercises.length === 0 && <p>Loading or no exercises found</p>}
        {exercises.length > 0 && <ul>
            {exercises.map(exercise => <li key={exercise.id}>
                <h3>Exercise Name: {exercise.name}</h3>
                <p>Description: {exercise.description}</p>
                <p>Creator: {exercise.creator}</p>
                <p>Body Part: {exercise.bodyPart}</p>
                <p>Image URL: {exercise.imageUrl}</p>
                <p>
                    Muscles:{' '}
                    {exercise.muscles.length > 0
                        ? exercise.muscles.join(', ')
                        : 'N/A'}
                </p>
                <button onClick={() => deleteExercise(exercise.id)}>
                    Delete
                </button>
            </li>)}
        </ul>}
    </div>;
};

export default ShowDatabaseContent;
