import { useCallback } from 'react';
import { styled } from 'styled-components';
import { useApiUrl, useToken, useUserName } from '../../hooks/api';
import { Button } from '../common/button';
import { Heading } from '../common/card';
import { Dialog } from '../common/dialog';

/*
interface ProgramPickerPromptProps {
    exercise: Exercise;
    programs: Program[];
    onSuccess: (exercise: Exercise, program: Program) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
*/

/**
 * Displays a prompt to choose a program to add an exercise to.
 * @param {ProgramPickerPromptProps} props
 */
export function ProgramPickerPrompt({ exercise, programs = [], onSuccess, isOpen, setIsOpen }) {
    // Grab the token from local storage
    const token = useToken();
    // Grab the user's name from local storage
    const name = useUserName();

    // Called when the exercise is added to an existing program
    const addExerciseToProgram = useCallback(async (program) => {
        // Adds the exercise to the programs exercises array
        const exerciseIds = program.exercises.map(exercise => exercise.id);
        exerciseIds.push(exercise.id);

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
        if (result.success) onSuccess(exercise, program);
        setIsOpen(false);
    }, [token, exercise, onSuccess, setIsOpen]);

    // Called when the exercise is added to a brand new program
    const createProgramAndAddExercise = useCallback(async () => {
        // Send a PUT request to create a new program
        const result = await fetch(useApiUrl('programs'), {
            method: 'PUT',
            body: JSON.stringify({
                // Currently just uses some default data
                name: `${name}'s Program`,
                description: `A new program for ${name}!`,
                // Add the exercise to the program
                exercises: [exercise.id],
                sets: 1,
                repetitions: 1,
                rest: 1,
                frequency: 'once a day',
            }),
            headers: new Headers({
                'Authorization': token,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());

        // Trigger the onSuccess callback and close the dialog
        if (result.success) onSuccess(exercise, result);
    }, [token, exercise, onSuccess, programs]);

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Choose a program</Heading>

        <List>
            {programs.map(program => <Program
                key={program.id}
                role="button"
                onClick={() => addExerciseToProgram(program)}
            >{program.name}</Program>)}
        </List>

        <Button
            variant="primary"
            style={{ width: '100%' }}
            onClick={createProgramAndAddExercise}
        >Create a new program</Button>
    </Dialog>
}

const List = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 1rem 0;
    padding: 0;
`;

const Program = styled.li`
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border: 1px solid hsl(var(--border-color));

    transition: background-color 0.1s ease-in-out;
    &:hover { background-color: lightgrey; }

    &:first-of-type {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }

    &:last-of-type {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
`;
