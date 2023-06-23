import { useCallback, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

export function Dialog({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        dialogRef.current.close();
        if (isOpen) dialogRef.current.showModal();
    }, [isOpen]);

    const onClick = useCallback(({ target }) => {
        if (target === dialogRef.current) onClose();
    }, [onClose]);

    return <Container
        ref={dialogRef}
        onClose={onClose}
        onClick={onClick}
    >
        <Content>
            {children}
        </Content>
    </Container>
}

const Container = styled.dialog`
    margin: auto;
    background-color: hsl(var(--background-color));
    border: 1px solid hsl(var(--border-color));
    border-radius: 0.5rem;
`;

const Content = styled.div`
    padding: 2rem;
    min-width: 20rem;
`;
