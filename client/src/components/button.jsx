import styled, { css } from 'styled-components';

export const Button = styled.button`
    border-radius: 50px;
    padding: 8px 40px;
    transition: background-color 0.2s;

    ${(props) => Button.variants[props.variant]}
`;

Button.variants = {
    primary: css`
        background-color: hsl(var(--primary-color));
        color: white;
        &:hover { background-color: hsl(var(--primary-color-lighter)); };
    `,
    secondary: css`
        background-color: hsl(var(--secondary-color));
        color: black;
        &:hover { background-color: hsl(var(--secondary-color) / 90%); };
    `,
};
