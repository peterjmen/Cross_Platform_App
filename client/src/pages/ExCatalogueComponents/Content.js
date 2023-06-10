import React, { useState } from 'react';
import ExerciseCatalogue from '../ExerciseCatalogue';

const Content = () => {
    const [name, setName] = useState('');
    const [cataloguedExercise, setCataloguedExercise] = useState([
        {
            id: 1,
            checked: false,
            exName: 'Example exercise 1',
            exBodyPart: '//TODO ie chest',
            exImage: '//TODO insert link',
            exPrimaryMuscle: '//TODO i.e. Pectorials',
            exSecondaryMuscle: '//TODO i.e. Triceps',
            exDescription:
                '//TODO i.e. Lower bar to chest, the push and straighten arms',
        },
        {
            id: 2,
            checked: false,
            exName: 'Example exercise 2',
            exBodyPart: '//TODO ie chest',
            exImage: '//TODO insert link',
            exPrimaryMuscle: '//TODO i.e. Pectorials',
            exSecondaryMuscle: '//TODO i.e. Triceps',
            exDescription:
                '//TODO i.e. Lower bar to chest, the push and straighten arms',
        },
        {
            id: 3,
            checked: false,
            exName: 'Example exercise 3',
            exBodyPart: '//TODO ie chest',
            exImage: '//TODO insert link',
            exPrimaryMuscle: '//TODO i.e. Pectorials',
            exSecondaryMuscle: '//TODO i.e. Triceps',
            exDescription:
                '//TODO i.e. Lower bar to chest, the push and straighten arms',
        },
    ]);

    const handleClick = () => {
        alert('This is handling a click');
    };

    const handleTickBox = id => {
        const catalogueItems = cataloguedExercise.map(individualExercise =>
            individualExercise.id === id
                ? {
                      ...individualExercise,
                      checked: !individualExercise.checked,
                  }
                : individualExercise
        );
        setCataloguedExercise(catalogueItems);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(catalogueItems)
        );
    };

    const handleDelete = id => {
        const itemToDelete = cataloguedExercise.find(
            individualExercise => individualExercise.id === id
        );

        alert(`You clicked the delete button of item ${itemToDelete.exName}`);
    };

    const handleAdd = id => {
        const catalogueItems = cataloguedExercise.map(individualExercise =>
            individualExercise.id === id
                ? {
                      ...individualExercise,
                      checked: true,
                  }
                : individualExercise
        );
        setCataloguedExercise(catalogueItems);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(catalogueItems)
        );
    };

    const handleRemove = id => {
        const catalogueItems = cataloguedExercise.map(individualExercise =>
            individualExercise.id === id
                ? {
                      ...individualExercise,
                      checked: false,
                  }
                : individualExercise
        );
        setCataloguedExercise(catalogueItems);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(catalogueItems)
        );
    };

    const handleSubmitExercise = () => {
        alert(`You added ${name} to the catalogue`);
        setName('');
    };

    //Handle change needed to edit "add exercise" box (and others)
    const handleChange = e => {
        setName(e.target.value);
    };

    return <div className="content">
        <form className="addForm">
            <label htmlFor="addExercise">Add Exercise</label>
            <input
                autoFocus
                id="addExercise"
                type="text"
                placeholder="Add name of exercise here"
                required
                value={name}
                onChange={handleChange}
            />
            <button type="button" onClick={handleSubmitExercise}>
                +
            </button>
        </form>
        <button type="button" onClick={handleClick}>
            Test handleClick button
        </button>
        <h2 className="Heading for exercise catalogue lust">
            Exercise Catalogue:
        </h2>
        <div className="exerciseCatalogueList">
            {/* The way to display a list is by iterating through it using map */}
            <ul>
                {cataloguedExercise.map(individualExercise => <li
                    key={individualExercise.id}
                    className="individualExercise"
                >
                    <input
                        type="checkbox"
                        onChange={() => handleTickBox(individualExercise.id)}
                        checked={individualExercise.checked}
                    />
                    <label>{individualExercise.exName}</label>
                    {/* <label>{individualExercise.exBodyPart}</label>
                    <label>{individualExercise.exImage}</label>
                    <label>{individualExercise.exPrimaryMuscle}</label>
                    <label>{individualExercise.exSecondaryMuscle}</label>
                    <label>{individualExercise.exDescription}</label> */}
                    <button
                        type="button"
                        onClick={() => handleDelete(individualExercise.id)}
                    >
                        Delete from list
                    </button>
                    <button
                        type="button"
                        onClick={() => handleAdd(individualExercise.id)}
                    >
                        + to program
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRemove(individualExercise.id)}
                    >
                        - from program
                    </button>
                </li>)}
            </ul>
        </div>
    </div>;
};
export default Content;
