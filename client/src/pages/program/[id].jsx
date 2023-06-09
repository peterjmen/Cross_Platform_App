import { PDFDownloadLink } from '@react-pdf/renderer';
import ms from 'enhanced-ms';
import { XIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Badge } from '../../components/common/badge';
import { Button } from '../../components/common/button';
import { Content, Heading, Card as _Card } from '../../components/common/card';
import { Circle } from '../../components/common/circle';
import { HoistedRow, Row } from '../../components/common/row';
import { ProgramPDF } from '../../components/pdf/program';
import { EditProgramPrompt } from '../../components/prompts/edit-program';
import { RemoveExercisePrompt } from '../../components/prompts/remove-exercise';
import { useApiUrl, useUserId } from '../../hooks/api';

export function ProgramPage() {
    // Get and edit program

    const params = useParams();
    const [isEditor, setIsEditor] = useState(false);
    const [program, setProgram] = useState(null);

    const userId = useUserId();
    const creatorId = useMemo(() => program?.creator?.['id'] ? program.creator.id : program?.creator, [program?.creator]);
    const isCreator = userId === creatorId;

    useEffect(() => {
        fetch(useApiUrl(`programs/${params.id}`))
            .then(response => response.json())
            .then(({ success, ...program }) => success ? setProgram(program) : null);
    }, [params.id]);

    // Remove exercise from program

    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isRemovePromptOpen, setIsRemovePromptOpen] = useState(false);

    // Render

    if (!program) return <>Loading...</>;

    return <Container>
        <Card>
            <Content style={{ marginRight: 'auto' }}>
                <Heading>{program.name}</Heading>

                <p>{program.description}</p>
            </Content>

            <Column>
                {isCreator && <Button
                    variant="primary"
                    onClick={() => setIsEditor(true)}
                >Edit</Button>}

                <PDFDownloadLink
                    key={program}
                    document={<ProgramPDF program={program} />}
                    fileName={`${program.name}.pdf`}
                >
                    {({ loading }) => <Button
                        variant="primary"
                        disabled={loading}
                    >{loading ? 'Loading...' : 'Download'}</Button>}
                </PDFDownloadLink>
            </Column>
        </Card>

        <EditProgramPrompt
            program={program}
            onSuccess={setProgram}
            isOpen={isEditor}
            setIsOpen={setIsEditor}
        />

        {program.exercises.map((exercise, index) => <Step key={`${exercise.id}-${index}`}>
            <Content>
                <Heading>{index + 1}. {exercise.name}</Heading>

                <p>{exercise.description}</p>

                <Row>
                    <Badge>Sets: {exercise.sets}</Badge>
                    <Badge>Reps: {exercise.repetitions}</Badge>
                    <Badge>Rest: {ms(exercise.rest * 1000)}</Badge>
                    <Badge>Freq: {exercise.frequency}</Badge>
                </Row>

                <HoistedRow>
                    {isCreator && <Circle variant="danger" onClick={() => {
                        setSelectedExercise(exercise);
                        setIsRemovePromptOpen(true);
                    }}><XIcon /></Circle>}
                </HoistedRow>
            </Content>

            <Image src={exercise.imageUrl} />
        </Step>)}

        <RemoveExercisePrompt
            program={program}
            exercise={selectedExercise}
            isOpen={isRemovePromptOpen}
            setIsOpen={setIsRemovePromptOpen}
            onSuccess={program => setProgram(program)}
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

const Step = styled(_Card)`
    padding: 1rem;
    display: flex;

    &:nth-child(odd) {
        margin-right: 40%;
    }
    &:nth-child(even) {
        margin-left: 40%;
    }
`;

const Image = styled.img`
    width: 40%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0.5rem;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;

    width: 10rem;
    button { width: 100%; }
`;
