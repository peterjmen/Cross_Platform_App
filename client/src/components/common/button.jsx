import { styled, css } from 'styled-components';

/*
interface ButtonProps {
    variant: 'primary' | 'primary-inverted' | 'danger';
}
*/

export const Button = styled.button`
    border-radius: 50px;
    padding: 8px 40px;
    transition: background-color 0.2s;

    ${({ variant }) => Button.variants[variant]}
`;

Button.variants = {
    primary: css`
        background-color: hsl(var(--primary-color));
        color: white;
        &:hover { background-color: hsl(var(--primary-color-lighter)); };
    `,
    'primary-inverted': css`
        background-color: white;
        color: black;
        &:hover { background-color: hsl(0 0% 100% / 90%); };
    `,
    danger: css`
        background-color: red;
        color: white;
        &:hover { background-color: hsl(0 100% 50% / 90%); };
    `,
};
