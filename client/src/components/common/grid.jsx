import { styled } from 'styled-components';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }

    & > * {
        width: 100%;
    }
`;
