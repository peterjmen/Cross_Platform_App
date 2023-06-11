import React, { useState } from 'react';
import Content from './ExCatalogueComponents/Content';
import Header from './ExCatalogueComponents/Header';
import Details from './ExCatalogueComponents/Details';
import AddToCatalogue from './ExCatalogueComponents/AddToCatalogue';
import '../App.css';

const ExerciseCatalogue = () => {
    const [name, setName] = useState('');
    const addExercise = name => {
        const id = cataloguedExercise.length
            ? cataloguedExercise[cataloguedExercise.length - 1].id + 1
            : 1;
        const theNewExercise = { id, checked: false, exName: name };
        const updatedExercises = [...cataloguedExercise, theNewExercise];
        setCataloguedExercise(updatedExercises);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(updatedExercises)
        );
    };

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
        const updatedExercises = cataloguedExercise.map(exercise =>
            exercise.id === id
                ? { ...exercise, checked: !exercise.checked }
                : exercise
        );
        setCataloguedExercise(updatedExercises);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(updatedExercises)
        );
    };

    const handleDelete = id => {
        const itemToDelete = cataloguedExercise.find(
            exercise => exercise.id === id
        );
        const updatedExercises = cataloguedExercise.filter(
            exercise => exercise.id !== id
        );

        // alert(`You clicked the delete button of item ${itemToDelete.exName}`);
        setCataloguedExercise(updatedExercises);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(updatedExercises)
        );
    };

    const handleAdd = id => {
        const updatedExercises = cataloguedExercise.map(exercise =>
            exercise.id === id ? { ...exercise, checked: true } : exercise
        );
        setCataloguedExercise(updatedExercises);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(updatedExercises)
        );
    };

    const handleRemove = id => {
        const updatedExercises = cataloguedExercise.map(exercise =>
            exercise.id === id ? { ...exercise, checked: false } : exercise
        );
        setCataloguedExercise(updatedExercises);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(updatedExercises)
        );
    };

    const handleSubmitExercise = e => {
        e.preventDefault();
        // alert(`You added ${name} to the catalogue`);
        addExercise(name);
        setName('');
    };

    const handleChange = e => {
        setName(e.target.value);
    };

    return <div>
        <Header stringPropertyUno="stringPropertyUno" />
        <AddToCatalogue
            name={name}
            handleChange={handleChange}
            handleSubmitExercise={handleSubmitExercise}
        />
        <div className="catalogue-container">
            <Content
                name={name}
                setName={setName}
                cataloguedExercise={cataloguedExercise}
                setCataloguedExercise={setCataloguedExercise}
                handleClick={handleClick}
                handleChange={handleChange}
                handleSubmitExercise={handleSubmitExercise}
                handleTickBox={handleTickBox}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleRemove={handleRemove}
            />
        </div>
        <div className="details-container">
            <Details lengthOfArray={cataloguedExercise.length} />
        </div>
    </div>;
};

export default ExerciseCatalogue;
