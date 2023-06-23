import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '../components/button';
import { Error, Form, Input, Label } from '../components/form';
import { useApiUrl } from '../hooks/api';

export function LoginPage() {
    const navigate = useNavigate();
    const { formState: { errors }, ...form } = useForm();
    const [error, setError] = useState(null);

    const loginUser = useCallback(async () => {
        const result = await fetch(useApiUrl('users'), {
            method: 'POST',
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
        if (errors.email) setError('Email is a required field');
        else if (errors.password) setError('Password is a required field');
        else setError(null);
    }, [errors.email, errors.password]);

    return <Container>

        <Blue>
            <h2>New here?</h2>

            <p>
                Lorem ipsum dolor sit amet consectetur<br />adipisicing elit. Quisquam, voluptatum.
            </p>

            <Link to="/register">
                <Button variant="primary-inverted">Sign Up</Button>
            </Link>
        </Blue>

        <Content>
            <h1>Login to Your Account</h1>

            <Form onSubmit={form.handleSubmit(loginUser)}>
                <Label htmlFor="login-email">Email Address</Label>
                <Input id="login-email" type="text" {...form.register('email', { required: true })} placeholder="Tyoe your email address..." />

                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" {...form.register('password', { required: true })} placeholder="Type your password..." />

                <Button type="submit" variant="primary">Sign In</Button>
                <Error error={error}>{error ?? "Hello world"}</Error>
            </Form>
        </Content>

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
