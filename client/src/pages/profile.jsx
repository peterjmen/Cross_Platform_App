import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { ExerciseCard } from '../components/exercise-card';
import { EditAccount } from '../components/edit-account';
import { Button } from '../components/button';
import { ProgramCard } from '../components/program-card';
import { useApiUrl } from '../hooks/api';
import { ProgramPicker } from '../components/program-picker';

export function ProfilePage() {

    const navigate = useNavigate();
    const id = useMemo(() => localStorage.getItem('id'), []);
    const token = useMemo(() => localStorage.getItem('token'), []);

    const [isLoading, setIsLoading] = useState(true);

    const [selectedTab, setSelectedTab] = useState('exercises');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [isProgramPickerOpen, setIsProgramPickerOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const [user, setUser] = useState(null);
    const [exercises, setExercises] = useState(null);
    const [programs, setPrograms] = useState(null);

    const getCurrentUser = useCallback(async () => {
        const url = new URL('/v0/users/@me', 'http://localhost:3001');

        return fetch(url, { headers: new Headers({ 'Authorization': token }) })
            .then(response => response.json())
            .then(({ success, ...data }) => success ? setUser(data) : null);
    }, [token, setUser]);

    const getMyExercises = useCallback(async () => {
        const url = new URL('/v0/exercises', 'http://localhost:3001');
        url.searchParams.append('creator', id);

        return fetch(url, { headers: new Headers({ 'Authorization': token }) })
            .then(response => response.json())
            .then(data => data.success ? setExercises(data.exercises) : null);
    }, [token, id, setExercises]);

    const getMyPrograms = useCallback(async () => {
        const url = new URL('/v0/programs', 'http://localhost:3001');
        url.searchParams.append('creator', id);

        return fetch(url, { headers: new Headers({ 'Authorization': token }) })
            .then(response => response.json())
            .then(data => data.success ? setPrograms(data.programs) : null);
    }, [token, id, setPrograms]);

    const addExerciseToProgram = useCallback(async (program, exercise) => {
        const copy = program.exercises.map(e => e.id);
        console.log('pre-push', program.exercises, copy);
        copy.push(exercise.id);
        console.log('post-push', copy);

        const result = await fetch(useApiUrl(`programs/${program.id}`), {
            method: 'PATCH',
            body: JSON.stringify({ exercises: copy }),
            headers: new Headers({
                'Authorization': token,
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json());

        if (result.success) {
            const newPrograms = programs.map(p => p.id === result.id ? result : p);
            setPrograms(newPrograms);
        } else {
            console.error(result);
        }
    }, [token, programs, setPrograms]);

    useEffect(() => {
        if (!id || !token) return navigate('/login');
        void Promise.all([getCurrentUser(), getMyExercises(), getMyPrograms()])
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <>Loading...</>

    return <Container>
        <Card>
            <CardContent>
                <h2>{user.name}'s Profile</h2>
            </CardContent>

            <Button onClick={() => setIsEditorOpen(true)} variant="primary">Edit Account</Button>
        </Card>

        <EditAccount isOpen={isEditorOpen} setIsOpen={setIsEditorOpen} token={token} {...user} />

        <TabGroup>
            <Tab selected={selectedTab === 'exercises'} onClick={() => setSelectedTab('exercises')}>Created Exercises</Tab>
            <Tab selected={selectedTab === 'programs'} onClick={() => setSelectedTab('programs')}>Created Programs</Tab>
        </TabGroup>

        {selectedTab === 'exercises' && <Grid>
            {exercises.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise} onAdd={() => {
                setSelectedExercise(exercise);
                setIsProgramPickerOpen(true);
            }} />)}
        </Grid>}

        {selectedTab === 'programs' && <Grid>
            {programs.map(program => <ProgramCard key={program.id} program={program} />)}
        </Grid>}

        {programs && <ProgramPicker
            programs={programs}
            isOpen={isProgramPickerOpen}
            setIsOpen={setIsProgramPickerOpen}
            onSelect={program => addExerciseToProgram(program, selectedExercise)}
        />}
    </Container>
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Card = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    padding: 1rem;
    width: 100%;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    h2 {
        margin: 0;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        font-weight: 600;
    }
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