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
                {onDeleteClick && isCreator && <Circle role="button" variant="danger" onClick={onDeleteClick}><Trash2Icon /></Circle>}
                {onAddClick && <Circle role="button" variant="primary" onClick={onAddClick}><PlusIcon /></Circle>}
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
