import React, { useState } from 'react';

const AddToDatabase = ({ refreshExerciseList }) => {
    const initialExerciseData = {
        creator: 'Your Name',
        name: 'Exercise Name',
        bodyPart: 'Body Part',
        imageUrl: 'Image URL need10char',
        muscles: ['Primary Muscle', 'Secondary Muscle'],
        description: 'Exercise Description',
    };

    const [exerciseData, setExerciseData] = useState(initialExerciseData);

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
                    setExerciseData(initialExerciseData); // Reset the form after creating exercise
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
};

export default AddToDatabase;
