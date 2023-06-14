import React, { useEffect, useState } from 'react';
import AddToDatabase from './ExDatabaseComponents/AddToDatabase';
import ShowDatabaseContent from './ExDatabaseComponents/ShowDatabaseContent';

function ExerciseDatabase() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/v0/exercises')
            .then(res => res.json())
            .then(data => setExercises(data.exercises))
            .catch(error => console.error('Error fetching exercises:', error));
    }, []);

    const refreshExerciseList = () => {
        fetch('http://localhost:3001/v0/exercises')
            .then(res => res.json())
            .then(data => setExercises(data.exercises))
            .catch(error => console.error('Error fetching exercises:', error));
    };

    const deleteExercise = exerciseId => {
        fetch(`http://localhost:3001/v0/exercises/${exerciseId}`, {
            method: 'DELETE',
        })
            .then(res => {
                if (res.status === 204) {
                    refreshExerciseList();
                } else if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Error deleting exercise');
                }
            })
            .then(data => {
                if (data && !data.success) {
                    throw new Error(data.error);
                }
            })
            .catch(error => {
                console.error('Error deleting exercise:', error);
            });
    };

    return <>
        <ShowDatabaseContent
            exercises={exercises}
            deleteExercise={deleteExercise}
        />
        <AddToDatabase refreshExerciseList={refreshExerciseList} />
    </>;
}

export default ExerciseDatabase;
