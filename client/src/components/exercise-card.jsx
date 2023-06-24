import { useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { ProgramPicker } from './program-picker';
import { DeletePrompt } from './delete-prompt';

/*
interface ExerciseCardProps {
    exercise: Exercise;
    programs: Program[];
}
*/

export function ExerciseCard({ exercise, programs = [] }) {
    const [isProgramPickerOpen, setIsProgramPickerOpen] = useState(false);
    const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);

    const creatorId = exercise.creator['id'] ? exercise.creator.id : exercise.creator;
    const userId = useMemo(() => localStorage.getItem('id'), []);
    // const token = useMemo(() => localStorage.getItem('token'), []);

    const deleteExercise = useCallback(async () => { }, []);

    const addToProgram = useCallback(async program => { }, []);

    return <Card>
        <Image src={exercise.imageUrl} />

        <Content>
            <h2>{exercise.name}</h2>

            <Row>
                <Badge>{exercise.bodyPart}</Badge>

                {exercise.muscles.map(muscle => <LighterBadge>{muscle}</LighterBadge>)}
            </Row>

            <p>{exercise.description}</p>

            <HoistedRow>
                {creatorId === userId && <RedCircle role="button" onClick={() => setIsDeletePromptOpen(true)}>D</RedCircle>}
                <PrimaryCircle role="button" onClick={() => setIsProgramPickerOpen(true)}>A</PrimaryCircle>
            </HoistedRow>
        </Content>

        {/* The program picker is the same for every exercise, it would be better to only have one but this will do for now */}
        {/* We could just pass isOpen and setIsOpen props for another picker */}
        <ProgramPicker
            programs={programs}
            isOpen={isProgramPickerOpen}
            setIsOpen={setIsProgramPickerOpen}
            onSelect={addToProgram}
        />

        <DeletePrompt
            isOpen={isDeletePromptOpen}
            setIsOpen={setIsDeletePromptOpen}
            onConfirm={deleteExercise}
        />
    </Card>
}

const Card = styled.section`
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    height: 100%;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 0.5rem 0 0 0.5rem;
`;

const Content = styled.div`
    grid-column: span 2 / span 2;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    p {
        font-size: 1rem;
        font-weight: 400;
    }
`;

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const Badge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    background-color: hsl(var(--primary-color) / 80%);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
`;

const LighterBadge = styled(Badge)`
    background-color: hsl(var(--primary-color) / 60%);
`;

const HoistedRow = styled(Row)`
    position: absolute;
    top: 1rem;
    right: 1rem;
`;

const Circle = styled.div`
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
`;

const PrimaryCircle = styled(Circle)`
    background-color: hsl(var(--primary-color));
    &:hover { background-color: hsl(var(--primary-color) / 80%); }
`;

const RedCircle = styled(Circle)`
    background-color: hsl(0, 80%, 60%);
    &:hover { background-color: hsl(0 80% 60% / 80%); }
`;