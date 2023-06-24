
import { styled } from 'styled-components';
import { Button } from './button';
import { Dialog } from './dialog';


/*
interface DeletePromptProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onConfirm: (program: Program) => void;
}
*/

export function DeletePrompt({ isOpen, setIsOpen, onConfirm }) {
    return <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
    >
        <Heading>Are you sure you want to delete this?</Heading>

        <Row>
            <Button variant="primary" onClick={() => {
                setIsOpen(false);
                onConfirm();
            }}>Yes</Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>No</Button>
        </Row>
    </Dialog>
}

const Heading = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
`;

const Row = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    button { flex: 1; }
`;