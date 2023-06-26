//this is ExercisesCatalogue.jsx in C:\Github\cross_plat_working\client\src\pages

import React, { useEffect, useState } from 'react';
import AddExerciseToCatalogue from './ExDatabaseComponents/AddExerciseToCatalogue';

import {
  PageContainer,
  Heading,
  SearchBar,
  TableContainer,
  CatalogueTable,
  TableHeader,
  TableData,
  CheckboxInput,
  RemoveButton,
  SelectedExercisesContainer,
  SelectedExercisesTable,
  FormContainer,
  FormTitle,
  CollapseButton,
  ExpandButton,
  DescriptionContainer,
  DescriptionText,
} from './CatalogueStyles';

export function ExercisesCatalogue() {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/v0/exercises')
      .then((res) => res.json())
      .then((data) => {
        const initialExercises = data.exercises.map((exercise) => ({
          ...exercise,
          selected: false,
          expanded: false,
        }));
        setExercises(initialExercises);
        setFilteredExercises(initialExercises);
      });
  }, []);

  useEffect(() => {
    const filteredResults = exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(search.toLowerCase()) ||
        exercise.bodyPart.toLowerCase().includes(search.toLowerCase()) ||
        exercise.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredExercises(filteredResults);
  }, [exercises, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCheckboxChange = (exerciseId) => {
    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, selected: !exercise.selected }
          : exercise
      );
      const selectedExercises = updatedExercises.filter(
        (exercise) => exercise.selected
      );
      setSelectedExercises(selectedExercises);
      return updatedExercises;
    });
  };

  const handleRemoveExercise = (exerciseId) => {
    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) =>
        exercise.id === exerciseId
          ? { ...exercise, selected: false }
          : exercise
      );
      const selectedExercises = updatedExercises.filter(
        (exercise) => exercise.selected
      );
      setSelectedExercises(selectedExercises);
      return updatedExercises;
    });
  };

  const handleExpandDescription = (exerciseId) => {
    setExercises((prevExercises) => {
      const updatedExercises = prevExercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const expanded = !exercise.expanded;
          return {
            ...exercise,
            expanded,
          };
        }
        return exercise;
      });
      return updatedExercises;
    });
  };

  const handleFormSubmit = (exerciseForm) => {
    const newExercise = {
      id: exercises.length + 1,
      name: exerciseForm.name,
      bodyPart: exerciseForm.bodyPart,
      description: exerciseForm.description,
      selected: false,
      expanded: false,
    };

    setExercises((prevExercises) => [...prevExercises, newExercise]);
  };

  return (
    <PageContainer>
      <Heading>Exercise Catalogue</Heading>
      <SearchBar
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={handleSearchChange}
      />
      <TableContainer>
        <CatalogueTable>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Body Part</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Expand/Collapse</TableHeader>
              <TableHeader>Select</TableHeader>
            </tr>
          </thead>
          <tbody>
            {filteredExercises.map((exercise) => (
              <tr key={exercise.id}>
                <TableData>{exercise.name}</TableData>
                <TableData>{exercise.bodyPart}</TableData>
                <TableData>
                  <DescriptionContainer>
                    <DescriptionText>
                      {exercise.expanded
                        ? exercise.description
                        : exercise.description.length > 15
                        ? exercise.description.substring(0, 15) + '...'
                        : exercise.description}
                    </DescriptionText>
                  </DescriptionContainer>
                </TableData>
                <TableData>
                  {exercise.expanded ? (
                    <CollapseButton
                      onClick={() => handleExpandDescription(exercise.id)}
                    >
                      -
                    </CollapseButton>
                  ) : (
                    <ExpandButton
                      onClick={() => handleExpandDescription(exercise.id)}
                    >
                      +
                    </ExpandButton>
                  )}
                </TableData>
                <TableData>
                  <CheckboxInput
                    type="checkbox"
                    checked={exercise.selected}
                    onChange={() => handleCheckboxChange(exercise.id)}
                  />
                </TableData>
              </tr>
            ))}
          </tbody>
        </CatalogueTable>
      </TableContainer>
      <SelectedExercisesContainer>
        <Heading>Selected Exercises</Heading>
        <SelectedExercisesTable>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Body Part</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>Remove</TableHeader>
            </tr>
          </thead>
          <tbody>
            {selectedExercises.map((exercise) => {
              const descriptionToShow = exercise.expanded
                ? exercise.description
                : exercise.description.length > 15
                ? exercise.description.substring(0, 15) + '...'
                : exercise.description;

              return (
                <tr key={exercise.id}>
                  <TableData>{exercise.name}</TableData>
                  <TableData>{exercise.bodyPart}</TableData>
                  <TableData>
                    <DescriptionContainer>
                      <DescriptionText>{descriptionToShow}</DescriptionText>
                    </DescriptionContainer>
                  </TableData>
                  <TableData>
                    <RemoveButton onClick={() => handleRemoveExercise(exercise.id)}>
                      X
                    </RemoveButton>
                  </TableData>
                </tr>
              );
            })}
          </tbody>
        </SelectedExercisesTable>
      </SelectedExercisesContainer>
      <FormContainer>
        <FormTitle>Add Exercise to Catalogue</FormTitle>
        <AddExerciseToCatalogue handleFormSubmit={handleFormSubmit} />
      </FormContainer>
    </PageContainer>
  );
}
