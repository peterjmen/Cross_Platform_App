import { styled } from 'styled-components';

export const Badge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    background-color: hsl(var(--primary-color) / 80%);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
`;

export const LighterBadge = styled(Badge)`
    background-color: hsl(var(--primary-color) / 60%);
`;
