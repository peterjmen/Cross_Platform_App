import { useCallback } from "react";
import { useApiUrl, useToken } from "../../hooks/api";
import { Button } from "../common/button";
import { Heading } from "../common/card";
import { Dialog } from "../common/dialog";
import { Row } from "../common/row";

/*
interface DeleteProgramPromptProps {
    program: Program;
    onSuccess: (program: Program) => void;
    isOpen: boolean;
    setIsOpen: () => void;
}
*/

/**
 * Displays a prompt to confirm the deletion of a program.
 * @param {DeleteProgramPromptProps} props
 */
export function DeleteProgramPrompt({ program, onSuccess, isOpen, setIsOpen }) {
    // Grab the token from local storage
    const token = useToken();

    // Called when the "Yes" button is clicked
    const deleteProgram = useCallback(async () => {
        const result = await fetch(useApiUrl(`programs/${program.id}`), {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': token })
        }).then(response => response.json());

        // Trigger the onSuccess callback and close the dialog
        if (result.success) onSuccess(program);
        setIsOpen(false);
    }, [token, program, onSuccess, setIsOpen]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Are you sure you want to delete this program?</Heading>

        <Row>
            <Button
                variant="danger"
                onClick={deleteProgram}
            >Yes</Button>
            <Button
                variant="primary-inverted"
                onClick={() => setIsOpen(false)}
            >No</Button>
        </Row>
    </Dialog>
}