import { useCallback } from "react";
import { useApiUrl, useToken } from "../../hooks/api";
import { Button } from "../common/button";
import { Heading } from "../common/card";
import { Dialog } from "../common/dialog";
import { Row } from "../common/row";

/*
interface RemoveExercisePromptProps {
    program: Program;
    exercise: Exercise;
    onSuccess: (program: Program, exercise: Exercise) => void;
    isOpen: boolean;
    setIsOpen: () => void;
}
*/

/**
 * Displays a prompt to confirm the removal of an exercise from a program.
 * @param {RemoveExercisePromptProps} props
 */
export function RemoveExercisePrompt({ program, exercise, onSuccess, isOpen, setIsOpen }) {
    // Grab the token from local storage
    const token = useToken();

    // Called when the "Yes" button is clicked
    const removeExercise = useCallback(async () => {
        // Remove the exercise from the programs exercises array
        const exerciseIds = program.exercises.map(e => e.id);
        const index = exerciseIds.indexOf(exercise.id);
        exerciseIds.splice(index, 1);

        // Send a PATCH request to update the program
        const result = await fetch(useApiUrl(`programs/${program.id}`), {
            method: 'PATCH',
            body: JSON.stringify({ exercises: exerciseIds }),
            headers: new Headers({
                'Authorization': token,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());

        // Trigger the onSuccess callback and close the dialog
        if (result.success) onSuccess(result, exercise);
        setIsOpen(false);
    }, [token, program, exercise, onSuccess, setIsOpen]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Are you sure you want to remove this exercise?</Heading>

        <Row>
            <Button
                variant="danger"
                onClick={removeExercise}
            >Yes</Button>
            <Button
                variant="primary-inverted"
                onClick={() => setIsOpen(false)}
            >No</Button>
        </Row>
    </Dialog>
}