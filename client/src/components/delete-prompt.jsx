import { Button } from './common/button';
import { Dialog } from './common/dialog';
import { Heading } from './common/card';
import { Row } from './common/row';

/*
interface DeletePromptProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onConfirm: () => void;
}
*/

export function DeletePrompt({ isOpen, setIsOpen, onConfirm }) {
    return <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
    >
        <Heading>Are you sure you want to delete this?</Heading>

        <Row>
            <Button variant="danger" onClick={() => { setIsOpen(false); onConfirm(); }}>Yes</Button>
            <Button variant="primary-inverted" onClick={() => setIsOpen(false)}>No</Button>
        </Row>
    </Dialog>
}
