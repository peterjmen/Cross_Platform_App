import { useCallback, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

/*
interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
*/

export function Dialog({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);

    // Whenever the isOpen prop changes, open the dialog
    useEffect(() => {
        // Ensure it is closed before opening
        dialogRef.current.close();
        if (isOpen) dialogRef.current.showModal();
    }, [isOpen]);

    const onClick = useCallback(({ target }) => {
        // When the backdrop is clicked, close the dialog
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
