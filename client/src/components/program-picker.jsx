import styled from 'styled-components';
import { Dialog } from './dialog';

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
            {programs.map((program, index, self) => <Program
                key={program.id}
                role="button"
                index={index}
                total={self.length}
                onClick={() => handleSelect(program)}
            >{program.name}</Program>)}
        </List>

        {/* Maybe just create a program with a default name then call the handleSelect method */}
        <NewProgramButton>Create a new program</NewProgramButton>
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
    margin-top: 1rem;
    padding: 0;
`;

const Program = styled.li`
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border: 1px solid hsl(var(--border-color));

    ${({ index, total }) => {
        if (index === 0) return 'border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;';
        if (index === total - 1) return 'border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem;';
    }}

    transition: background-color 0.1s ease-in-out;
    &:hover { background-color: lightgrey; }
`;

const NewProgramButton = styled.button`
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;
    border: 1px solid hsl(var(--border-color));
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background-color: hsl(var(--primary-color));
    transition: background-color 0.1s ease-in-out;
    &:hover { background-color: hsl(var(--primary-color) / 80%); }
`;