import React, { useEffect, useState } from 'react';

function Add({ refreshExerciseList }) {
    const [exerciseData, setExerciseData] = useState({
        creator: '',
        name: '',
        bodyPart: '',
        imageUrl: '',
        muscles: [],
        description: '',
    });

    function handleInputChange(event) {
        const { name, value } = event.target;

        if (name === 'muscles') {
            const muscles = value.split(',').map(item => item.trim());
            setExerciseData(prevData => ({ ...prevData, muscles }));
        } else {
            setExerciseData(prevData => ({ ...prevData, [name]: value }));
        }
    }

    function createExercise() {
        fetch('http://localhost:3001/v0/exercises', {
            method: 'PUT',
            body: JSON.stringify(exerciseData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    refreshExerciseList();
                } else {
                    console.error('Error creating exercise:', data.error);
                }
            })
            .catch(error => console.error('Error creating exercise:', error));
    }

    return <>
        <form>
            <input
                type="text"
                name="creator"
                value={exerciseData.creator}
                onChange={handleInputChange}
                placeholder="Creator"
            />
            <br />
            <input
                type="text"
                name="name"
                value={exerciseData.name}
                onChange={handleInputChange}
                placeholder="Exercise Name"
            />
            <br />
            <input
                type="text"
                name="bodyPart"
                value={exerciseData.bodyPart}
                onChange={handleInputChange}
                placeholder="Body Part"
            />
            <br />
            <input
                type="text"
                name="imageUrl"
                value={exerciseData.imageUrl}
                onChange={handleInputChange}
                placeholder="Image URL"
            />
            <br />
            <input
                type="text"
                name="muscles"
                value={exerciseData.muscles.join(',')}
                onChange={handleInputChange}
                placeholder="Muscles (comma-separated)"
            />
            <br />
            <textarea
                name="description"
                value={exerciseData.description}
                onChange={handleInputChange}
                placeholder="Exercise Description"
            ></textarea>
        </form>

        <button onClick={createExercise}>Create</button>
    </>;
}

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
        {exercises.length === 0 && <p>Loading or no exercises found</p>}

        {exercises.length > 0 && <ul>
            {exercises.map((exercise, index) => <li key={index}>
                <h3>{exercise.name}</h3>
                <p>{exercise.description}</p>
                <button onClick={() => deleteExercise(exercise.id)}>
                    Delete
                </button>
            </li>)}
        </ul>}

        <Add refreshExerciseList={refreshExerciseList} />
    </>;
}

export default ExerciseDatabase;
