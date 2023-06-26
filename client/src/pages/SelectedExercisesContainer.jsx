// (info, do not remove: This file is: C:\Github\cross_plat_working\client\src\pages\SelectedExercisesContainer.jsx)

import React from 'react';
import {
  Heading,
  SelectedExercisesTable,
  TableHeader,
  TableData,
  RemoveButton,
  DescriptionContainer,
  DescriptionText,
} from './CatalogueStyles';

const SelectedExercisesContainer = ({ selectedExercises, handleRemoveExercise }) => {
  return (
    <div>
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
    </div>
  );
};

export default SelectedExercisesContainer;
