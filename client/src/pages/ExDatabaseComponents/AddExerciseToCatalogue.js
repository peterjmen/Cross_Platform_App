import React, { useState } from 'react';
import {
  FormContainer,
  FormInput,
  FormButton
} from '../CatalogueStyles';

const AddExerciseToCatalogue = ({ handleFormSubmit }) => {
  const [exerciseForm, setExerciseForm] = useState({
    name: '',
    bodyPart: '',
    imageUrl: '',
    muscles: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExerciseForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleFormSubmit(exerciseForm);
    setExerciseForm({
      name: '',
      bodyPart: '',
      imageUrl: '',
      muscles: '',
      description: '',
    });
  };



  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          value={exerciseForm.name}
          onChange={handleInputChange}
          placeholder="Exercise Name"
        />
        <FormInput
          type="text"
          name="bodyPart"
          value={exerciseForm.bodyPart}
          onChange={handleInputChange}
          placeholder="Body Part"
        />
        <FormInput
          type="text"
          name="imageUrl"
          value={exerciseForm.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <FormInput
          type="text"
          name="muscles"
          value={exerciseForm.muscles}
          onChange={handleInputChange}
          placeholder="Muscles (comma-separated)"
        />
        <FormInput
          type="text"
          name="description"
          value={exerciseForm.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <FormButton type="submit">Add Exercise</FormButton>
      </form>
    </FormContainer>
  );
};

export default AddExerciseToCatalogue;
