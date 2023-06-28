import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Button } from '../components/common/button';
import { Heading, Card as _Card, Content as _Content } from '../components/common/card';
import { Grid } from '../components/common/grid';
import { ExerciseCard } from '../components/exercise-card';
import { ProgramCard } from '../components/program-card';
import { DeleteExercisePrompt } from '../components/prompts/delete-exercise';
import { DeleteProgramPrompt } from '../components/prompts/delete-program';
import { EditAccountPrompt } from '../components/prompts/edit-account';
import { ProgramPickerPrompt } from '../components/prompts/program-picker';
import { useApiUrl, useToken, useUserId } from '../hooks/api';
import { EditExercisePrompt } from '../components/prompts/edit-exercise';

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
    const [isAccountEditProgramOpen, setIsAccountEditProgramOpen] = useState(false);

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

    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isPickerPromptOpen, setIsPickerPromptOpen] = useState(false);
    const [isEditExercisePromptOpen, setIsEditExercisePromptOpen] = useState(false);
    const [isDeleteExercisePromptOpen, setIsDeleteExercisePromptOpen] = useState(false);

    const [selectedProgram, setSelectedProgram] = useState(null);
    const [isDeleteProgramPromptOpen, setIsDeleteProgramPromptOpen] = useState(false);

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
                onClick={() => setIsAccountEditProgramOpen(true)}
                style={{ marginRight: '1rem' }}
            >Edit</Button>
        </Card>

        <EditAccountPrompt
            user={user}
            onSuccess={user => setUser(user)}
            isOpen={isAccountEditProgramOpen}
            setIsOpen={setIsAccountEditProgramOpen}
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
                onEditClick={() => {
                    setSelectedExercise(exercise);
                    setIsEditExercisePromptOpen(true);
                }}
                onDeleteClick={() => {
                    setSelectedExercise(exercise);
                    setIsDeleteExercisePromptOpen(true);
                }}
            />)}
        </Grid>}

        {selectedTab === 'programs' && <Grid>
            {programs.map(program => <ProgramCard
                key={program.id}
                program={program}
                onDeleteClick={() => {
                    setSelectedProgram(program);
                    setIsDeleteExercisePromptOpen(true);
                }}
            />)}
        </Grid>}

        <ProgramPickerPrompt
            exercise={selectedExercise}
            programs={programs}
            onSuccess={(_, exercise) => setExercises(exercises => exercises.map(e => e.id === exercise.id ? exercise : e))}
            isOpen={isPickerPromptOpen}
            setIsOpen={setIsPickerPromptOpen}
        />

        <EditExercisePrompt
            exercise={selectedExercise}
            onSuccess={(_, exercise) => setExercises(exercises => exercises.map(e => e.id === exercise.id ? exercise : e))}
            isOpen={isEditExercisePromptOpen}
            setIsOpen={setIsEditExercisePromptOpen}
        />

        <DeleteExercisePrompt
            exercise={selectedExercise}
            onSuccess={exercise => {
                setExercises(exercises => exercises.filter(e => e.id !== exercise.id));

                const programExercises = programs.reduce((all, program) => all.concat(program.exercises), []);
                const exerciseIds = programExercises.map(exercise => exercise.id);
                if (exerciseIds.includes(exercise.id)) getMyPrograms();
            }}
            isOpen={isDeleteExercisePromptOpen}
            setIsOpen={setIsDeleteExercisePromptOpen}
        />

        <DeleteProgramPrompt
            program={selectedProgram}
            onSuccess={program => setPrograms(programs => programs.filter(p => p.id !== program.id))}
            isOpen={isDeleteProgramPromptOpen}
            setIsOpen={setIsDeleteProgramPromptOpen}
        />
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
`;

const Card = styled(_Card)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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
