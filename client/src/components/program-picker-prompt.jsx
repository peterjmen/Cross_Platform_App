import { styled } from 'styled-components';
import { Button } from './common/button';
import { Dialog } from './common/dialog';
import { Heading } from './common/card';

/*
interface ProgramPickerPromptProps {
    programs: Program[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSelect: (program: Program) => void;
    onNewProgramClick: () => void;
}
*/

export function ProgramPickerPrompt({ programs, isOpen, setIsOpen, onSelect, onNewProgramClick }) {
    const handleSelect = program => {
        setIsOpen(false);
        onSelect(program);
    };

    return <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Heading>Choose a program</Heading>

        <List>
            {programs.map(program => <Program
                key={program.id}
                role="button"
                onClick={() => handleSelect(program)}
            >{program.name}</Program>)}
        </List>

        <Button variant="primary" style={{ width: '100%' }} onClick={() => {
            setIsOpen(false);
            onNewProgramClick();
        }}>Create a new program</Button>
    </Dialog>
}

const List = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 1rem 0;
    padding: 0;
`;

const Program = styled.li`
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border: 1px solid hsl(var(--border-color));

    transition: background-color 0.1s ease-in-out;
    &:hover { background-color: lightgrey; }

    &:first-of-type {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
    }

    &:last-of-type {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }
`;
