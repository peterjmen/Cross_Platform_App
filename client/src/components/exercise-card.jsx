import { useState } from 'react';
import { styled } from 'styled-components';
import { ProgramPicker } from './program-picker';

/*
interface ExerciseCardProps {
    exercise: Exercise;
    programs: Program[];
}
*/

export function ExerciseCard({ exercise, programs = [] }) {
    const [isProgramPickerOpen, setIsProgramPickerOpen] = useState(false);

    return <Card>
        <Image src={exercise.imageUrl} />

        <Content>
            <h2>{exercise.name}</h2>

            <BadgeContainer>
                <BodyPartBadge>{exercise.bodyPart}</BodyPartBadge>

                {exercise.muscles.map(muscle => <MuscleBadge>{muscle}</MuscleBadge>)}
            </BadgeContainer>

            <p>{exercise.description}</p>

            <AddToProgramButton onClick={() => setIsProgramPickerOpen(true)}>
                {/* + */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <rect x="10" y="2" width="4" height="20" rx="3" ry="3" />
                    <rect x="2" y="10" width="20" height="4" rx="3" ry="3" />
                </svg>
            </AddToProgramButton>
        </Content>

        {/* The program picker is the same for every exercise, it would be better to only have one but this will do for now */}
        {/* We could just pass isOpen and setIsOpen props for another picker */}
        <ProgramPicker
            programs={programs}
            isOpen={isProgramPickerOpen}
            setIsOpen={setIsProgramPickerOpen}
            onSelect={console.log}
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

const BadgeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const BodyPartBadge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    background-color: hsl(var(--primary-color) / 80%);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
`;

const MuscleBadge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    background-color: hsl(var(--primary-color) / 60%);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
`;

// circle with a plus sign in it
const AddToProgramButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: hsl(var(--primary-color));
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: hsl(var(--primary-color) / 80%);
    }
`;
