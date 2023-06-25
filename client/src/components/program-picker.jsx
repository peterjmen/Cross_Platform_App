import { styled } from 'styled-components';
import { Dialog } from './dialog';
import { Button } from './button';

/*
interface ProgramPickerProps {
    programs: Program[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSelect: (program: Program) => void;
}
*/

export function ProgramPicker({ programs, isOpen, setIsOpen, onSelect }) {
    function handleSelect(program) {
        onSelect(program);
        setIsOpen(false);
    }

    return <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
    >
        <Heading>Choose a program</Heading>

        <List>
            {programs.map(program => <Program
                key={program.id}
                role="button"
                onClick={() => handleSelect(program)}
            >{program.name}</Program>)}
        </List>

        {/* Maybe just create a program with a default name then call the handleSelect method */}
        <Button variant="primary" style={{ width: '100%' }}>Create a new program</Button>
    </Dialog>
}

const Heading = styled.h3`
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
`;

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
