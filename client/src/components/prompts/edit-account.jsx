import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useApiUrl, useToken } from '../../hooks/api';
import { Button } from '../common/button';
import { Heading } from '../common/card';
import { Dialog } from '../common/dialog';
import { Form, Input, Label } from '../common/form';

/*
interface EditAccountPromptProps {
    user: User;
    onSuccess: (user: User) => void;
    isOpen: boolean;
    setIsOpen: () => void;
}
*/

/**
 * A dialog that allows the user to edit their account information
 * @param {EditAccountPromptProps} props
 */
export function EditAccountPrompt({ user, onSuccess, isOpen, setIsOpen }) {
    // Grab the token from local storage
    const token = useToken();
    // Create a form with the user's data
    const form = useForm({ defaultValues: user, values: user });

    // Called when the "Save" button is clicked
    const updateUser = useCallback(async () => {
        // Send a PATCH request to the "Current User" endpoint
        const result = await fetch(useApiUrl('users/@me'), {
            method: 'PATCH',
            // Replace all the empty strings with undefined
            body: JSON.stringify(form.getValues(), (_, value) => value || undefined),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        }).then(response => response.json());

        // Trigger the onSuccess callback and close the dialog
        if (result.success) onSuccess(result)
        setIsOpen(false);
    }, [token, user, onSuccess, setIsOpen]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Edit Account</Heading>

        <Form onSubmit={form.handleSubmit(updateUser)}>
            <Label htmlFor="edit-account-name">Name</Label>
            <Input id="edit-account-name" type="text" {...form.register('name')} placeholder="Name" />

            <Label htmlFor="edit-account-email">Email Address</Label>
            <Input id="edit-account-email" type="text" {...form.register('email')} placeholder="Email" />

            <Label htmlFor="edit-account-password">Password</Label>
            <Input id="edit-account-password" type="password" {...form.register('password')} placeholder="Password" />

            <Button type="submit" variant="primary">Save</Button>
        </Form>
    </Dialog>
}
