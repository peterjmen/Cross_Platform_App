import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Dialog } from './dialog';
import { Button } from './button';
import { useApiUrl } from '../hooks/api';
import { Error, Form, Input, Label } from './form';

/*
interface EditAccountProps {
    isOpen: boolean;
    setIsOpen: () => void;
    email: string;
    name: string;
    token: string;
}
*/

export function EditAccount({ isOpen, setIsOpen, token, ...defaultValues }) {
    const navigate = useNavigate();
    const { formState: { errors }, ...form } = useForm({ defaultValues });
    const [error, setError] = useState(null);

    async function updateUser() {
        return fetch(useApiUrl('users/@me'), {
            method: 'PATCH',
            // Replace all the empty strings with undefined
            body: JSON.stringify(form.getValues(), (_, value) => value || undefined),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token,
            })
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('name', data.name);
                navigate(0);
            })
            .finally(() => setIsOpen(false))
    }

    useEffect(() => {
        if (errors.name) setError('Name is a required field');
        else if (errors.email) setError('Email is a required field');
        else if (errors.password) setError('Password is a required field');
        else setError(null);
    }, [errors.name, errors.email, errors.password]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Edit Account Information</Heading>

        <Form onSubmit={form.handleSubmit(updateUser)}>
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" type="text" {...form.register('name')} placeholder="Name" />

            <Label htmlFor="edit-email">Email Address</Label>
            <Input id="edit-email" type="text" {...form.register('email')} placeholder="Email" />

            <Label htmlFor="edit-password">Password</Label>
            <Input id="edit-password" type="password" {...form.register('password')} placeholder="Password" />

            <Button type="submit" variant="primary" style={{ width: '100%' }}>Save</Button>

            <Error error={error}>{error ?? "Hello world"}</Error>
        </Form>
    </Dialog>
}

const Heading = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
`;
