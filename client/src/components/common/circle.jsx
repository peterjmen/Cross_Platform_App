import { styled, css } from 'styled-components';

/*
interface CircleProps {
    variant: 'primary' | 'danger';
}
*/

export const Circle = styled.div`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    ${({ variant }) => Circle.variants[variant]}
`;

Circle.variants = {
    primary: css`
        background-color: hsl(var(--primary-color));
        &:hover { background-color: hsl(var(--primary-color) / 80%); }
    `,
    danger: css`
        background-color: hsl(0, 80%, 60%);
        &:hover { background-color: hsl(0 80% 60% / 80%); }
    `,
};
