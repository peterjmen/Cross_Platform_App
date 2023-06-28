import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '../components/common/button';
import { Heading } from '../components/common/card';
import { Error, Input, Label, Form as _Form } from '../components/common/form';
import { Grid } from '../components/common/grid';
import { Row } from '../components/common/row';
import { ExerciseCard } from '../components/exercise-card';
import { ProgramPickerPrompt } from '../components/prompts/program-picker';
import { useApiUrl, useToken, useUserId } from '../hooks/api';

export function ExercisesPage() {
    // Search exercises

    const form = useForm();
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    // 'null' indicates loading, empty array indicates no results
    const [exercises, setExercises] = useState(null);

    const searchExercises = useCallback(async ({ query }) => {
        setExercises(null);
        setSearchParams(query ? { query } : {});

        return fetch(useApiUrl('exercises', { query }))
            .then(response => response.json())
            .then(({ success, exercises }) => success ? setExercises(exercises) : null)
            .catch(() => setError('Failed to search exercises'));
    }, [setExercises]);

    // Handle exercise actions

    const id = useUserId();
    const token = useToken();
    const [programs, setPrograms] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isPickerPromptOpen, setIsPickerPromptOpen] = useState(false);

    // Gets the programs of the logged user, used in program picker
    const getMyPrograms = useCallback(async () => {
        if (!id || !token) return;

        return fetch(useApiUrl('programs', { creator: id }))
            .then(response => response.json())
            .then(data => data.success ? setPrograms(data.programs) : null);
    }, [token, id, setPrograms]);

    // Main effect

    useEffect(() => {
        void Promise.all([
            getMyPrograms(),
            searchExercises({ query: searchParams.get('query') ?? '' }),
        ]);
    }, []);

    return <Container>
        <Heading>Browse Exercises</Heading>

        <Form onSubmit={form.handleSubmit(searchExercises)}>
            <Row>
                <Label htmlFor="search-exercises">Search Exercises</Label>
                <Error error={error}>{error ?? "Hello world"}</Error>
            </Row>

            <Row style={{ flexWrap: 'unset' }}>
                <Input id="search-exercises" type="text" {...form.register('query')} placeholder="Type your search..." />
                <Button type="submit" variant="primary">Search</Button>
            </Row>
        </Form>

        {exercises === null && <>Loading...</>}

        {exercises && <Grid>
            {exercises.map(exercise => <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onAddClick={() => {
                    if (!id || !token) return navigate('/login');
                    setSelectedExercise(exercise);
                    setIsPickerPromptOpen(true);
                }}
            />)}
        </Grid>}

        <ProgramPickerPrompt
            exercise={selectedExercise}
            programs={programs ?? []}
            onSuccess={(_, exercise) => setExercises(exercises => exercises.map(e => e.id === exercise.id ? exercise : e))}
            isOpen={isPickerPromptOpen}
            setIsOpen={setIsPickerPromptOpen}
        />
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
`;

const Form = styled(_Form)`
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
`;
