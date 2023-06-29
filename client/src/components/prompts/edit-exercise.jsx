import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useApiUrl, useToken } from '../../hooks/api';
import { Button } from '../common/button';
import { Heading } from '../common/card';
import { Dialog } from '../common/dialog';
import { Form, Input, Label, Textarea } from '../common/form';

/*
interface EditExercisePromptProps {
    exercise: Exercise;
    onSuccess: (exercise: Exercise) => void;
    isOpen: boolean;
    setIsOpen: () => void;
}
*/

/**
 * Displays a prompt to edit an exercise.
 * @param {EditExercisePromptProps} props
 */
export function EditExercisePrompt({ exercise, onSuccess, isOpen, setIsOpen }) {
    // This grabs the token from local storage
    const token = useToken();
    // Initialise the form with the exercise data, if the exercise data changes, the form will update
    const form = useForm({ defaultValues: exercise, values: exercise });

    // This function is called when the form is submitted
    const updateExercise = useCallback(async () => {
        // Send a PATCH request to the API at the endpoint /exercises/:id
        const result = await fetch(useApiUrl(`exercises/${exercise.id}`), {
            method: 'PATCH',
            // Replace all the empty strings with undefined
            body: JSON.stringify(form.getValues(), (key, value) => {
                // If the key is muscles, split the string into an array of muscles
                if (key === 'muscles') return value?.split(',').map(muscle => muscle.trim()) ?? [];
                return value || undefined;
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        }).then(response => response.json());

        // On success, trigger the onSuccess callback and close the dialog
        if (result.success) onSuccess(result);
        setIsOpen(false);
        // Only re create this function if the token, exercise, onSuccess or setIsOpen changes
    }, [token, exercise, onSuccess, setIsOpen]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Edit Exercise</Heading>

        <Form onSubmit={form.handleSubmit(updateExercise)}>
            <Label htmlFor="edit-exercise-name">Name</Label>
            <Input id="edit-exercise-name" type="text" {...form.register('name')} placeholder="Type name..." />

            <Label htmlFor="edit-exercise-description">Description</Label>
            <Textarea id="edit-exercise-description" type="text" {...form.register('description')} placeholder="Type description..." />

            <Label htmlFor="edit-exercise-body-part">Body Part</Label>
            <Input id="edit-exercise-body-part" type="text" {...form.register('bodyPart')} placeholder="Type body part..." />

            <Label htmlFor="edit-exercise-muscles">Muscles</Label>
            <Input id="edit-exercise-muscles" type="text" {...form.register('muscles')} placeholder="Type muscles..." />

            <Label htmlFor="edit-exercise-image-url">Image URL</Label>
            <Input id="edit-exercise-image-url" type="text" {...form.register('imageUrl')} placeholder="Type image URL..." />

            <Label htmlFor="edit-program-sets">Sets</Label>
            <Input id="edit-program-sets" type="number" {...form.register('sets', { valueAsNumber: true })} placeholder="Type sets..." />

            <Label htmlFor="edit-program-repetitions">Repetitions</Label>
            <Input id="edit-program-repetitions" type="number" {...form.register('repetitions', { valueAsNumber: true })} placeholder="Type repetitions..." />

            <Label htmlFor="edit-program-rest">Rest (Seconds)</Label>
            <Input id="edit-program-rest" type="number" {...form.register('rest', { valueAsNumber: true })} placeholder="Type rest..." />

            <Label htmlFor="edit-program-frequency">Frequency</Label>
            <Input id="edit-program-frequency" type="text" {...form.register('frequency')} placeholder="Type frequency..." />

            <Button type="submit" variant="primary">Update</Button>
        </Form>
    </Dialog>
}
