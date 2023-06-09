import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useApiUrl, useToken } from '../../hooks/api';
import { Button } from '../common/button';
import { Heading } from '../common/card';
import { Dialog } from '../common/dialog';
import { Form, Input, Label, Textarea } from '../common/form';

/**
 * Displays a prompt to create a program.
 * @param {EditProgramPromptProps} props
 */
export function CreateProgramPrompt({ onSuccess, isOpen, setIsOpen }) {
    // Grab the token from local storage
    const token = useToken();
    // Create a form with default values
    const form = useForm();

    // Called when the "Save" button is clicked
    const createProgram = useCallback(async () => {
        // Send a PUT request to the "Program" endpoint
        const result = await fetch(useApiUrl('programs'), {
            method: 'PUT',
            // Replace all the empty strings with undefined
            body: JSON.stringify({ ...form.getValues(), exercises: [] }, (_, value) => value || undefined),
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        }).then(response => response.json());

        // Trigger the onSuccess callback and close the dialog
        if (result.success) onSuccess(result);
        setIsOpen(false);
    }, [token, form, onSuccess, setIsOpen]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Create Program</Heading>

        <Form onSubmit={form.handleSubmit(createProgram)}>
            <Label htmlFor="create-program-name">Name</Label>
            <Input
                id="create-program-name"
                type="text"
                {...form.register('name')}
                placeholder="Type name..."
            />

            <Label htmlFor="create-program-description">Description</Label>
            <Textarea
                id="create-program-description"
                type="text"
                {...form.register('description')}
                placeholder="Type description..."
            />

            <Button type="submit" variant="primary">
                Save
            </Button>
        </Form>
    </Dialog>;
}
