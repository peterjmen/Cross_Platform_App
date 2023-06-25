import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useUserId } from '../hooks/api';
import { Badge } from './common/badge';
import { Card, Content } from './common/card';
import { Heading } from './common/card';
import { HoistedRow, Row } from './common/row';
import { Circle } from './common/circle';

/*
interface ProgramCardProps {
    program: Program;
    onDeleteClick: () => void;
}
*/

export function ProgramCard({ program, onDeleteClick }) {
    // Only show the delete button if the user is the creator of the program
    const userId = useUserId();
    const creatorId = useMemo(() => program.creator['id'] ? program.creator.id : program.creator, [program.creator]);
    const isCreator = userId === creatorId;

    return <Card>
        <Content>
            <Heading>{program.name}</Heading>

            <Row>
                <Badge>Exercises: {program.exercises.length}</Badge>
                <Badge>Sets: {program.sets}</Badge>
                <Badge>Reps: {program.repetitions}</Badge>
                <Badge>Rest: {program.rest}</Badge>
            </Row>
            <Row>
                <Badge>Frequency: {program.frequency}</Badge>
            </Row>

            <HoistedRow>
                {isCreator && <Circle role="button" variant="danger" onClick={onDeleteClick}><Trash2Icon /></Circle>}
                <Link to={`/programs/${program.id}`}><Circle variant="primary"><EyeIcon /></Circle></Link>
            </HoistedRow>
        </Content>
    </Card>
}
