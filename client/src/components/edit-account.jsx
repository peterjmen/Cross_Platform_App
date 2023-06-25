import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useApiUrl, useToken } from '../hooks/api';
import { Button } from './common/button';
import { Dialog } from './common/dialog';
import { Error, Form, Input, Label } from './common/form';
import { Heading } from './common/card';

/*
interface EditAccountProps {
    email: string;
    name: string;
    isOpen: boolean;
    setIsOpen: () => void;
}
*/

export function EditAccount({ isOpen, setIsOpen, ...defaultValues }) {
    const navigate = useNavigate();
    const token = useToken();

    const { formState: { errors }, ...form } = useForm({ defaultValues });
    const [error, setError] = useState(null);

    const updateUser = useCallback(async () => {
        const result = await fetch(useApiUrl('users/@me'), {
            method: 'PATCH',
            // Replace all the empty strings with undefined
            body: JSON.stringify(form.getValues(), (_, value) => value || undefined),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        }).then(response => response.json());

        if (result.success) {
            localStorage.setItem('name', result.name);
            // Refresh the page to update the name in the header
            navigate(0);
        } else {
            setError(result.details);
        }

        setIsOpen(false);
    }, [token]);

    useEffect(() => {
        if (errors.name) setError('Name is a required field');
        else if (errors.email) setError('Email is a required field');
        else if (errors.password) setError('Password is a required field');
        else setError(null);
    }, [errors.name, errors.email, errors.password]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Edit Account</Heading>

        <Form onSubmit={form.handleSubmit(updateUser)}>
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" type="text" {...form.register('name')} placeholder="Name" />

            <Label htmlFor="edit-email">Email Address</Label>
            <Input id="edit-email" type="text" {...form.register('email')} placeholder="Email" />

            <Label htmlFor="edit-password">Password</Label>
            <Input id="edit-password" type="password" {...form.register('password')} placeholder="Password" />

            <Button type="submit" variant="primary">Save</Button>

            {error && <Error>{error}</Error>}
        </Form>
    </Dialog>
}
