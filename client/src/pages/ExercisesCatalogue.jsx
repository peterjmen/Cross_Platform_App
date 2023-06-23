import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
    margin: 20px;
`;

const Heading = styled.h1`
    color: #0099ff;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`;

const SearchBar = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #888888;
    border-radius: 4px;
    margin-bottom: 20px;
`;

const TableContainer = styled.div`
    max-height: 180px;
    overflow-y: scroll;
    border: 1px solid #888888;
    margin-bottom: 20px;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    padding: 8px;
    background-color: #0099ff;
    color: #ffffff;
    font-weight: bold;
    border-bottom: 1px solid hsl(var(--border-color));
`;

const TableData = styled.td`
    padding: 8px;
    border-bottom: 1px solid hsl(var(--border-color));
`;

const CheckboxInput = styled.input`
    margin-right: 5px;
`;

const RemoveButton = styled.button`
    background-color: red;
    border: none;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const SelectedExercisesContainer = styled.div`
    margin-top: 40px;
`;

const SelectedExercisesTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

export function ExercisesCatalogue() {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/v0/exercises')
            .then((res) => res.json())
            .then((data) => {
                const initialExercises = data.exercises.map((exercise) => ({
                    ...exercise,
                    selected: false,
                }));
                setExercises(initialExercises);
                setFilteredExercises(initialExercises);
            });
    }, []);

    useEffect(() => {
        const filteredResults = exercises.filter(
            (exercise) =>
                exercise.name.toLowerCase().includes(search.toLowerCase()) ||
                exercise.bodyPart
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                exercise.description
                    .toLowerCase()
                    .includes(search.toLowerCase()),
        );
        setFilteredExercises(filteredResults);
    }, [exercises, search]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleCheckboxChange = (exerciseId) => {
        setExercises((prevExercises) => {
            const updatedExercises = prevExercises.map((exercise) =>
                exercise.id === exerciseId
                    ? {...exercise, selected: !exercise.selected}
                    : exercise,
            );
            const selectedExercises = updatedExercises.filter(
                (exercise) => exercise.selected,
            );
            setSelectedExercises(selectedExercises);
            return updatedExercises;
        });
    };

    const handleRemoveExercise = (exerciseId) => {
        setExercises((prevExercises) => {
            const updatedExercises = prevExercises.map((exercise) =>
                exercise.id === exerciseId
                    ? {...exercise, selected: false}
                    : exercise,
            );
            const selectedExercises = updatedExercises.filter(
                (exercise) => exercise.selected,
            );
            setSelectedExercises(selectedExercises);
            return updatedExercises;
        });
    };

    return (
        <PageContainer>
            <Heading>Exercise Catalogue</Heading>
            <SearchBar
                type='text'
                value={search}
                onChange={handleSearchChange}
                placeholder='Search exercises...'
            />
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <TableHeader>Image</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Body Part</TableHeader>
                            <TableHeader>Description</TableHeader>
                            <TableHeader>Select</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExercises.length === 0 ? (
                            <tr>
                                <TableData colSpan={5}>
                                    No matching exercises found
                                </TableData>
                            </tr>
                        ) : (
                            filteredExercises.map((exercise) => (
                                <tr key={exercise.id}>
                                    <TableData>
                                        <img
                                            src={exercise.imageUrl}
                                            alt='Exercise'
                                            width='50'
                                            height='50'
                                        />
                                    </TableData>
                                    <TableData>{exercise.name}</TableData>
                                    <TableData>{exercise.bodyPart}</TableData>
                                    <TableData>
                                        {exercise.description}
                                    </TableData>
                                    <TableData>
                                        <CheckboxInput
                                            type='checkbox'
                                            checked={exercise.selected}
                                            onChange={() =>
                                                handleCheckboxChange(
                                                    exercise.id,
                                                )
                                            }
                                        />
                                    </TableData>
                                </tr>
                            ))
                        )}
                    </tbody>
                </StyledTable>
            </TableContainer>
            <SelectedExercisesContainer>
                <Heading>Exercises added to program</Heading>
                <TableContainer>
                    <StyledTable>
                        <thead>
                            <tr>
                                <TableHeader>Name</TableHeader>
                                <TableHeader>Body Part</TableHeader>
                                <TableHeader>Description</TableHeader>
                                <TableHeader></TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedExercises.length === 0 ? (
                                <tr>
                                    <TableData colSpan={4}>
                                        No exercises selected
                                    </TableData>
                                </tr>
                            ) : (
                                selectedExercises.map((exercise) => (
                                    <tr key={exercise.id}>
                                        <TableData>{exercise.name}</TableData>
                                        <TableData>
                                            {exercise.bodyPart}
                                        </TableData>
                                        <TableData>
                                            {exercise.description}
                                        </TableData>
                                        <TableData>
                                            <RemoveButton
                                                onClick={() =>
                                                    handleRemoveExercise(
                                                        exercise.id,
                                                    )
                                                }
                                            >
                                                -
                                            </RemoveButton>
                                        </TableData>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </StyledTable>
                </TableContainer>
            </SelectedExercisesContainer>
        </PageContainer>
    );
}
