import { useCallback } from 'react';
import { useApiUrl, useToken } from '../../hooks/api';
import { Button } from '../common/button';
import { Heading } from '../common/card';
import { Dialog } from '../common/dialog';
import { Row } from '../common/row';

/*
interface DeleteExercisePromptProps {
    exercise: Exercise;
    onSuccess: (exercise: Exercise) => void;
    isOpen: boolean;
    setIsOpen: () => void;
}
*/

/**
 * Displays a prompt to confirm the deletion of an exercise.
 * @param {DeleteExercisePromptProps} props
 */
export function DeleteExercisePrompt({ exercise, onSuccess, isOpen, setIsOpen }) {
    // Grab the token from local storage
    const token = useToken();

    // Called when the "Yes" button is clicked
    const deleteExercise = useCallback(async () => {
        const result = await fetch(useApiUrl(`exercises/${exercise.id}`), {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': token })
        }).then(response => response.json());

        // Trigger the onSuccess callback and close the dialog
        if (result.success) onSuccess(exercise);
        setIsOpen(false);
    }, [token, exercise, onSuccess, setIsOpen]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Are you sure you want to delete this exercise?</Heading>

        <Row>
            <Button
                variant="danger"
                onClick={deleteExercise}
            >Yes</Button>
            <Button
                variant="primary-inverted"
                onClick={() => setIsOpen(false)}
            >No</Button>
        </Row>
    </Dialog>
}
