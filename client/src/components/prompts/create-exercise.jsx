import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useApiUrl, useToken } from '../../hooks/api';
import { Button } from '../common/button';
import { Heading } from '../common/card';
import { Dialog } from '../common/dialog';
import { Form, Input, Label, Textarea } from '../common/form';

export function CreateExercisePrompt({ onSuccess, isOpen, setIsOpen}) {
  // This grabs the token from local storage
  const token = useToken();
  // Initialise the form with the exercise data, if the exercise data changes, the form will create
  const form = useForm();

  // This function is called when the form is submitted
  const createExercise = useCallback(async () => {
    // Send a PUT request to the API at the endpoint /exercises
    const result = await fetch(useApiUrl('exercises'), {
      method: 'PUT',
      // Replace all the empty strings with undefined
      body: JSON.stringify(form.getValues(), (key, value) => {
        // If the key is muscles, split the string into an array of muscles
        if (key === 'muscles') return value?.split(',').map(muscle => muscle.trim()) ?? [];
        return value || undefined;
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token,
      }),
    }).then(response => response.json());

    // On success, trigger the onSuccess callback and close the dialog
    if (result.success) onSuccess(result);
    setIsOpen(false);
    // Only re-create this function if the token, exercise, onSuccess, or setIsOpen changes
  }, [token, onSuccess, setIsOpen]);

  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Heading>Create Exercise</Heading>

      <Form onSubmit={form.handleSubmit(createExercise)}>
        <Label htmlFor="create-exercise-name">Name</Label>
        <Input
          id="create-exercise-name"
          type="text"
          {...form.register('name', { required: true })}
          placeholder="Type name..."
        />

        <Label htmlFor="create-exercise-description">Description</Label>
        <Textarea
          id="create-exercise-description"
          type="text"
          {...form.register('description', { required: true })}
          placeholder="Type description..."
        />

        <Label htmlFor="create-exercise-body-part">Body Part</Label>
        <Input
          id="create-exercise-body-part"
          type="text"
          {...form.register('bodyPart', { required: true })}
          placeholder="Type body part..."
        />

        <Label htmlFor="create-exercise-muscles">Muscles</Label>
        <Input
          id="create-exercise-muscles"
          type="text"
          {...form.register('muscles', { required: true })}
          placeholder="Type muscles..."
        />

        <Label htmlFor="create-exercise-image-url">Image URL</Label>
        <Input
          id="create-exercise-image-url"
          type="text"
          {...form.register('imageUrl', { required: true })}
          placeholder="Type image URL..."
        />

        <Button type="submit" variant="primary">
          Create
        </Button>
      </Form>
    </Dialog>
  );
}
