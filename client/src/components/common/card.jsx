import { styled } from 'styled-components';

export const Card = styled.section`
    position: relative;
    height: 100%;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
`;

export const Heading = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;