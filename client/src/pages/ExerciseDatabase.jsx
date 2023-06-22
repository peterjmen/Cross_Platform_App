import React, {useEffect, useState} from 'react';

function ExerciseDatabase() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/v0/exercises')
            .then((res) => res.json())
            .then((data) => setExercises(data.exercises));
    }, []);

    return (
        <>
            {exercises.length === 0 && <p>Loading or no exercises found</p>}

            {exercises.length > 0 && (
                <code>{JSON.stringify(exercises, null, 4)}</code>
            )}
        </>
    );
}

export {ExerciseDatabase};
