import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useApiUrl, useToken } from '../../hooks/api';
import { Button } from '../common/button';
import { Heading } from '../common/card';
import { Dialog } from '../common/dialog';
import { Form, Input, Label, Textarea } from '../common/form';

/*
interface EditProgramPromptProps {
    program: Program;
    onSuccess: (program: Program) => void;
    isOpen: boolean;
    setIsOpen: () => void;
}
*/

/**
 * Displays a prompt to edit a program.
 * @param {EditProgramPromptProps} props
 */
export function EditProgramPrompt({ program, onSuccess, isOpen, setIsOpen }) {
    // Grab the token from local storage
    const token = useToken();
    // Remove the exercises from the default values so it doesn't get sent with the PATCH request
    const { exercises, ...defaultValues } = program;
    // Create a form with the default values
    const form = useForm({ defaultValues });

    // Called when the "Save" button is clicked
    const updateProgram = useCallback(async () => {
        // Send a PATCH request to the "Program" endpoint
        const result = await fetch(useApiUrl(`programs/${program.id}`), {
            method: 'PATCH',
            // Replace all the empty strings with undefined
            body: JSON.stringify(form.getValues(), (_, value) => value || undefined),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        }).then(response => response.json());

        // Trigger the onSuccess callback and close the dialog
        if (result.success) onSuccess(result);
        setIsOpen(false);
    }, [token, program, onSuccess, setIsOpen]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Edit Program</Heading>

        <Form onSubmit={form.handleSubmit(updateProgram)}>
            <Label htmlFor="edit-program-name">Name</Label>
            <Input id="edit-program-name" type="text" {...form.register('name')} placeholder="Type name..." />

            <Label htmlFor="edit-program-description">Description</Label>
            <Textarea id="edit-program-description" type="text" {...form.register('description')} placeholder="Type description..." />

            <Label htmlFor="edit-program-sets">Sets</Label>
            <Input id="edit-program-sets" type="number" {...form.register('sets', { valueAsNumber: true })} placeholder="Type sets..." />

            <Label htmlFor="edit-program-repetitions">Repetitions</Label>
            <Input id="edit-program-repetitions" type="number" {...form.register('repetitions', { valueAsNumber: true })} placeholder="Type repetitions..." />

            <Label htmlFor="edit-program-rest">Rest (Seconds)</Label>
            <Input id="edit-program-rest" type="number" {...form.register('rest', { valueAsNumber: true })} placeholder="Type rest..." />

            <Label htmlFor="edit-program-frequency">Frequency</Label>
            <Input id="edit-program-frequency" type="text" {...form.register('frequency')} placeholder="Type frequency..." />

            <Button type="submit" variant="primary">Save</Button>
        </Form>
    </Dialog>

}