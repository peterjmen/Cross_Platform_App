import React, { useState } from 'react';
import Content from './ExCatalogueComponents/Content';
import Header from './ExCatalogueComponents/Header';
import SearchCatalogue from './ExCatalogueComponents/SearchCatalogue';
import Details from './ExCatalogueComponents/Details';
import AddToCatalogue from './ExCatalogueComponents/AddToCatalogue';
import '../App.css';

const ExerciseCatalogue = () => {
    const [name, setName] = useState('');
    const [search, setSearch] = useState('');
    const [cataloguedExercise, setCataloguedExercise] = useState(
        JSON.parse(localStorage.getItem('selectedExercisesList')) || []
    );

    const addExercise = name => {
        const id = cataloguedExercise.length
            ? cataloguedExercise[cataloguedExercise.length - 1].id + 1
            : 1;
        const theNewExercise = { id, checked: false, name: name };
        const updatedExercises = [...cataloguedExercise, theNewExercise];
        setCataloguedExercise(updatedExercises);
        localStorage.setItem(
            'selectedExercisesList',
            JSON.stringify(updatedExercises)
        );
    };

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
        addExercise(name);
        setName('');
        alert(`You added ${name} to the catalogue`);
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
        <SearchCatalogue search={search} setSearch={setSearch} />
        <div className="details-container">
            <Details lengthOfArray={cataloguedExercise.length} />
        </div>
        <div className="catalogue-container">
            <Content
                cataloguedExercise={cataloguedExercise.filter(exercise =>
                    exercise.name.toLowerCase().includes(search.toLowerCase())
                )}
                name={name}
                setName={setName}
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
    </div>;
};

export default ExerciseCatalogue;
