import { useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { DeletePrompt } from './delete-prompt';
import { Link } from 'react-router-dom';
import { EyeIcon, Trash2Icon } from 'lucide-react';

/*
interface ProgramCardProps {
    program: Program;
}
*/

export function ProgramCard({ program }) {
    const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);

    const creatorId = program.creator['id'] ? program.creator.id : program.creator;
    const userId = useMemo(() => localStorage.getItem('id'), []);

    const deleteProgram = useCallback(async () => { }, []);

    return <Card>
        <Content>
            <h2>{program.name}</h2>

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
                {creatorId === userId && <RedCircle role="button" onClick={() => setIsDeletePromptOpen(true)}><Trash2Icon /></RedCircle>}
                <Link to={`/programs/${program.id}`}><PrimaryCircle><EyeIcon /></PrimaryCircle></Link>
            </HoistedRow>
        </Content>

        <DeletePrompt
            isOpen={isDeletePromptOpen}
            setIsOpen={setIsDeletePromptOpen}
            onConfirm={deleteProgram}
        />
    </Card>
}

const Card = styled.section`
    position: relative;
    height: 100%;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Content = styled.div`
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
