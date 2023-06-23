import { styled } from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    @media (min-width: 768px) {
        width: 33.333333%;
    }
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
    color: ${props => props.error ? 'red;' : 'transparent; user-select: none;'}
`;
