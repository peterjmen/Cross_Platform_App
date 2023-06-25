import { styled } from 'styled-components';

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    button { flex: 1; }
`;

export const HoistedRow = styled(Row)`
    position: absolute;
    top: 1rem;
    right: 1rem;
`;
