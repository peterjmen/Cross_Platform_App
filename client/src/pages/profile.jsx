import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '../components/common/button';
import { Heading, Card as _Card, Content as _Content } from '../components/common/card';
import { EditAccount } from '../components/edit-account';
import { ExerciseCard } from '../components/exercise-card';
import { ProgramCard } from '../components/program-card';
import { ProgramPickerPrompt } from '../components/program-picker-prompt';
import { useApiUrl, useToken, useUserId } from '../hooks/api';
import { DeletePrompt } from '../components/delete-prompt';

export function ProfilePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = useUserId();
    const token = useToken();

    // Fetch user, exercises, and programs

    const [user, setUser] = useState(null);
    const [exercises, setExercises] = useState(null);
    const [programs, setPrograms] = useState(null);
    const isLoading = useMemo(() => !user || !exercises || !programs,
        [user, exercises, programs]);

    let rawTab = searchParams.get('tab');
    if (!['exercises', 'programs'].includes(rawTab)) rawTab = 'exercises';
    const [selectedTab, setSelectedTab] = useState(rawTab);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    useEffect(() => {
        setSearchParams({ tab: selectedTab });
    }, [selectedTab]);

    const getCurrentUser = useCallback(async () => {
        return fetch(useApiUrl('users/@me'), { headers: new Headers({ 'Authorization': token }) })
            .then(response => response.json())
            .then(({ success, ...data }) => success ? setUser(data) : null);
    }, [token, setUser]);

    const getMyExercises = useCallback(async () => {
        return fetch(useApiUrl('exercises', { creator: id }))
            .then(response => response.json())
            .then(data => data.success ? setExercises(data.exercises) : null);
    }, [token, id, setExercises]);

    const getMyPrograms = useCallback(async () => {
        return fetch(useApiUrl('programs', { creator: id }))
            .then(response => response.json())
            .then(data => data.success ? setPrograms(data.programs) : null);
    }, [token, id, setPrograms]);

    useEffect(() => {
        if (!id || !token) navigate('/login');
        void Promise.all([getCurrentUser(), getMyExercises(), getMyPrograms()]);
    }, []);

    // Handle exercise and program actions

    const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
    const [isPickerPromptOpen, setIsPickerPromptOpen] = useState(false);

    const [selectedExercise, setSelectedExercise] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);

    const deleteExercise = useCallback(async exercise => {
        const result = await fetch(useApiUrl(`exercises/${exercise.id}`), {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': token }),
        }).then(response => response.json());

        if (result.success) {
            setExercises(exercises => exercises
                .filter(e => e.id !== exercise.id));

            const programExercises = programs.reduce((all, program) => all.concat(program.exercises), []);
            const exerciseIds = programExercises.map(exercise => exercise.id);
            if (exerciseIds.includes(exercise.id)) await getMyPrograms();
        }
    }, [token, programs, setExercises]);

    const deleteProgram = useCallback(async program => {
        const result = await fetch(useApiUrl(`programs/${program.id}`), {
            method: 'DELETE',
            headers: new Headers({ 'Authorization': token }),
        }).then(response => response.json());

        if (result.success)
            setPrograms(programs => programs
                .filter(p => p.id !== program.id));
    }, [token, setPrograms]);

    const addExerciseToProgram = useCallback(async (exercise, program) => {
        const exerciseIds = program.exercises.map(exercise => exercise.id);
        exerciseIds.push(exercise.id);

        const result = await fetch(useApiUrl(`programs/${program.id}`), {
            method: 'PATCH',
            body: JSON.stringify({ exercises: exerciseIds }),
            headers: new Headers({
                'Authorization': token,
                'Content-Type': 'application/json'
            }),
        }).then(response => response.json());

        if (result.success)
            setPrograms(programs => programs
                .map(p => p.id === program.id ? result : p));
    }, [token, setPrograms, exercises]);

    const createProgramAndAddExercise = useCallback(async exercise => {
        // It might be better to use a dialog to ask for the program values, but this is fine for now
        const result = await fetch(useApiUrl('programs'), {
            method: 'PUT',
            body: JSON.stringify({
                name: `${user.name}'s Program`,
                description: `A new program for ${user.name}!`,
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

        if (result.success)
            setPrograms(programs => [...programs, result]);
    }, [token, setPrograms, user]);

    if (isLoading) return <div>Loading...</div>;

    return <Container>
        <Card>
            <Content>
                <Heading>{user.name}'s Profile</Heading>

                <p>
                    This is your profile page. Here you can view your created exercises and programs.
                </p>
            </Content>

            <Button
                variant="primary"
                onClick={() => setIsEditorOpen(true)}
                style={{ marginRight: '1rem' }}
            >Edit</Button>
        </Card>

        <EditAccount
            isOpen={isEditorOpen}
            setIsOpen={setIsEditorOpen}
            {...user}
        />

        <TabGroup>
            <Tab
                selected={selectedTab === 'exercises'}
                onClick={() => setSelectedTab('exercises')}
            >Created Exercises</Tab>
            <Tab
                selected={selectedTab === 'programs'}
                onClick={() => setSelectedTab('programs')}
            >Created Programs</Tab>
        </TabGroup>

        {selectedTab === 'exercises' && <Grid>
            {exercises.map(exercise => <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onAddClick={() => {
                    setSelectedExercise(exercise);
                    setIsPickerPromptOpen(true);
                }}
                onDeleteClick={() => {
                    setSelectedExercise(exercise);
                    setIsDeletePromptOpen(true);
                }}
            />)}
        </Grid>}

        {selectedTab === 'programs' && <Grid>
            {programs.map(program => <ProgramCard
                key={program.id}
                program={program}
                onDeleteClick={() => {
                    setSelectedProgram(program);
                    setIsDeletePromptOpen(true);
                }}
            />)}
        </Grid>}

        <DeletePrompt
            isOpen={isDeletePromptOpen}
            setIsOpen={setIsDeletePromptOpen}
            onConfirm={() => {
                // I dont think this will break in the case of delete vs picker
                if (selectedTab === 'exercises') {
                    deleteExercise(selectedExercise);
                    setSelectedExercise(null);
                } else if (selectedTab === 'programs') {
                    deleteProgram(selectedProgram);
                    setSelectedProgram(null);
                }
            }}
        />

        <ProgramPickerPrompt
            programs={programs}
            isOpen={isPickerPromptOpen}
            setIsOpen={setIsPickerPromptOpen}
            onSelect={program => {
                addExerciseToProgram(selectedExercise, program);
                setSelectedExercise(null);
            }}
            onNewProgramClick={() => {
                createProgramAndAddExercise(selectedExercise)
                setSelectedExercise(null);
            }}
        />
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Card = styled(_Card)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    width: 100%;
`;

const Content = styled(_Content)`
    width: 100%;
    justify-content: center;
    width: 100%;
`;

const TabGroup = styled.div`
    width: 100%;
    display: flex;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Tab = styled.span`
    display: inline-block;
    text-align: center;
    padding: 0.5rem;
    width: 100%;
    cursor: pointer;

    &:first-child {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }

    &:last-child {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
    
    ${({ selected }) => selected ? `
    background-color: hsl(var(--primary-color) / 80%);
    color: white;
    ` : `
    transition: background-color 0.2s ease-in-out;
    &:hover { background-color: #F0F8FF; }
    `}    
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`;
