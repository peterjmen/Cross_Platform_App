import React from 'react';

const ListedExercise = ({
    listedExercise,
    handleTickBox,
    handleDelete,
    handleAdd,
    handleRemove,
}) => {
    return <li key={listedExercise.id} className="individualExercise">
        <input
            type="checkbox"
            onChange={() => handleTickBox(listedExercise.id)}
            checked={listedExercise.checked}
        />
        <label>{listedExercise.name}</label>
        {/* Uncommented lines */}
        {/* <label>{listedExercise.exBodyPart}</label>
      <label>{listedExercise.exImage}</label>
      <label>{listedExercise.exPrimaryMuscle}</label>
      <label>{listedExercise.exSecondaryMuscle}</label>
      <label>{listedExercise.exDescription}</label> */}
        {/* End of uncommented lines */}
        <button type="button" onClick={() => handleDelete(listedExercise.id)}>
            Delete from Catalogue
        </button>
        <button type="button" onClick={() => handleAdd(listedExercise.id)}>
            + to program
        </button>
        <button type="button" onClick={() => handleRemove(listedExercise.id)}>
            - from program
        </button>
    </li>;
};

export default ListedExercise;
