import { EyeIcon, Trash2Icon } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useUserId } from '../hooks/api';
import { Badge } from './common/badge';
import { Card, Content, Heading } from './common/card';
import { Circle } from './common/circle';
import { HoistedRow, Row } from './common/row';

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
                <Badge>{program.exercises.length} Exercises</Badge>
            </Row>
            <p>
                {program.description}
            </p>

            <HoistedRow>
                {onDeleteClick && isCreator && <Circle role="button" variant="danger" onClick={onDeleteClick}><Trash2Icon /></Circle>}
                <Link to={`/programs/${program.id}`}><Circle variant="primary"><EyeIcon /></Circle></Link>
            </HoistedRow>
        </Content>
    </Card>
}
