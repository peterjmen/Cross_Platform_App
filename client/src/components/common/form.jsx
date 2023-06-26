import { styled } from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export const Label = styled.label`
    margin-right: auto;
`;


export const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid hsl(var(--border-color));
    border-radius: 12px;  
`;

export const Error = styled.p`
    color: ${({ error }) => error ? 'red' : 'transparent; user-select: none'};
`;
