import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '../components/common/button';
import { Error, Form, Input, Label } from '../components/common/form';
import { useApiUrl } from '../hooks/api';

export function RegisterPage() {
    const navigate = useNavigate();
    const { formState: { errors }, ...form } = useForm();
    const [error, setError] = useState(null);

    const registerUser = useCallback(async () => {
        const result = await fetch(useApiUrl('users'), {
            method: 'PUT',
            body: JSON.stringify(form.getValues()),
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
            .then(response => response.json());

        if (result.success) {
            localStorage.setItem('name', result.name);
            localStorage.setItem('id', result.id);
            localStorage.setItem('token', result.token);
            navigate('/');
        } else {
            setError(result.details);
        }
    }, [form, navigate, setError]);

    useEffect(() => {
        if (errors.name) setError('Name is a required field');
        else if (errors.email) setError('Email is a required field');
        else if (errors.password) setError('Password is a required field');
        else setError(null);
    }, [errors.name, errors.email, errors.password]);

    return <Container>

        <Content>
            <h1>Create an Account</h1>

            <Form onSubmit={form.handleSubmit(registerUser)}>
                <Label htmlFor="register-name">Name</Label>
                <Input id="register-name" type="text" {...form.register('name', { required: true })} placeholder="Type your name..." />

                <Label htmlFor="register-email">Email Address</Label>
                <Input id="register-email" type="text" {...form.register('email', { required: true })} placeholder="Type your email address..." />

                <Label htmlFor="register-name">Password</Label>
                <Input id="register-name" type="password" {...form.register('password', { required: true })} placeholder="Type your password..." />

                <Button type="submit" variant="primary">Sign In</Button>

                <Error error={error}>{error ?? "Hello world"}</Error>
            </Form>
        </Content>

        <Blue>
            <h2>Already have an account?</h2>

            <p>
                Lorem ipsum dolor sit amet consectetur<br />adipisicing elit. Quisquam, voluptatum.
            </p>

            <Link to="/login">
                <Button variant="primary-inverted">Sign In</Button>
            </Link>
        </Blue>

    </Container>;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: var(--min-height);
`;

const Content = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 24px;
    padding: 24px;

    h1 {
        font-size: 4rem;
        font-weight: bold;
    }
`;

const Blue = styled.section`
    width: 50%;
    background-image: url('/blue-pattern.png');
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 24px;
    padding: 24px;

    h2 {
        font-size: 2rem;
        font-weight: semibold;
    }
`;
