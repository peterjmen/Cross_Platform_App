import React from 'react';
import ListedExercise from './ListedExercise';

const ExerciseList = ({
    cataloguedExercise,
    handleTickBox,
    handleDelete,
    handleAdd,
    handleRemove,
}) => {
    return <ul>
        {cataloguedExercise.map(individualExercise => <ListedExercise
            key={individualExercise.id}
            listedExercise={individualExercise}
            handleTickBox={handleTickBox}
            handleDelete={handleDelete}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
        />)}
    </ul>;
};

export default ExerciseList;
