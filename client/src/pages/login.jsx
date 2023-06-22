import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../components/button';

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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    width: 50%;

    @media (min-width: 768px) {
        width: 33.333333%;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid hsl(var(--border-color));
    border-radius: 12px;  
`;

const Error = styled.p`
    color: ${props => props.error ? 'red;' : 'transparent; user-select: none;'}
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

export function LoginPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(null);

    async function loginUser(formData) {
        // TODO: Replace the hard coded URL with an environment variable
        const result = await fetch('http://localhost:3001/v0/users', {
            method: 'POST',
            body: JSON.stringify(formData),
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
    }

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
                <Button variant="secondary">Sign Up</Button>
            </Link>
        </Blue>

        <Content>
            <h1>Login to Your Account</h1>

            <Form onSubmit={handleSubmit(loginUser)}>
                <Input type="text" {...register('email', { required: true })} placeholder="Email" />
                <Input type="password" {...register('password', { required: true })} placeholder="Password" />
                <Button type="submit" variant="primary">Sign In</Button>
                <Error error={error}>{error ?? "Hello world"}</Error>
            </Form>
        </Content>

    </Container>;
}