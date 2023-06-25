import { useMemo } from 'react';
import { styled } from 'styled-components';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useUserId } from '../hooks/api';
import { Badge, LighterBadge } from './common/badge';
import { Card as _Card, Content as _Content, Heading } from './common/card';
import { Circle } from './common/circle';
import { HoistedRow, Row } from './common/row';

/*
interface ExerciseCardProps {
    exercise: Exercise;
    onAddClick: () => void;
    onDeleteClick: () => void;
}
*/

export function ExerciseCard({ exercise, onAddClick, onDeleteClick }) {
    // Only show the delete button if the user is the creator of the exercise
    const userId = useUserId();
    const creatorId = useMemo(() => exercise.creator['id'] ? exercise.creator.id : exercise.creator, [exercise.creator]);
    const isCreator = userId === creatorId;

    return <Card>
        <Image src={exercise.imageUrl} />

        <Content>
            <Heading>{exercise.name}</Heading>

            <Row>
                <Badge>{exercise.bodyPart}</Badge>
                {exercise.muscles.map(muscle => <LighterBadge key={muscle}>{muscle}</LighterBadge>)}
            </Row>

            <p>{exercise.description}</p>

            <HoistedRow>
                {isCreator && <Circle role="button" variant="danger" onClick={onDeleteClick}><Trash2Icon /></Circle>}
                <Circle role="button" variant="primary" onClick={onAddClick}><PlusIcon /></Circle>
            </HoistedRow>
        </Content>
    </Card>
}

const Card = styled(_Card)`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const Image = styled.img`
    height: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 0.5rem 0 0 0.5rem;
`;

const Content = styled(_Content)`
    grid-column: span 2 / span 2;
`;

/*
interface ExerciseCardProps {
    exercise: Exercise;
    onAdd: () => void;
}


export function ExerciseCard({ exercise, onAdd }) {
    const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);

    const creatorId = exercise.creator['id'] ? exercise.creator.id : exercise.creator;
    const userId = useMemo(() => localStorage.getItem('id'), []);
    // const token = useMemo(() => localStorage.getItem('token'), []);

    const deleteExercise = useCallback(async () => { }, []);

    return <Card>
        <Image src={exercise.imageUrl} />

        <Content>
            <h2>{exercise.name}</h2>

            <Row>
                <Badge>{exercise.bodyPart}</Badge>

                {exercise.muscles.map(muscle => <LighterBadge key={muscle}>{muscle}</LighterBadge>)}
            </Row>

            <p>{exercise.description}</p>

            <HoistedRow>
                {creatorId === userId && <RedCircle role="button" onClick={() => setIsDeletePromptOpen(true)}><Trash2Icon /></RedCircle>}
                <Circle role="button" onClick={onAdd}><PlusIcon /></Circle>
            </HoistedRow>
        </Content>

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

const Circle = styled(Circle)`
    background-color: hsl(var(--primary-color));
    &:hover { background-color: hsl(var(--primary-color) / 80%); }
`;

const RedCircle = styled(Circle)`
    background-color: hsl(0, 80%, 60%);
    &:hover { background-color: hsl(0 80% 60% / 80%); }
`;
*/