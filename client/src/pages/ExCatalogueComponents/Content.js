import React from 'react';
import ExerciseList from './ExerciseList';
import ExercisesInProgram from './ExercisesInProgram';

const Content = ({
    cataloguedExercise,
    handleTickBox,
    handleDelete,
    handleAdd,
    handleRemove,
}) => {
    const exercisesInProgram = cataloguedExercise.filter(
        exercise => exercise.checked
    );
    const hasExercisesInProgram = exercisesInProgram.length > 0;

    return <main>
        <h2 className="Heading for exercise catalogue list">
            Exercise Catalogue:
        </h2>
        {cataloguedExercise.length ? (
            <div className="content">
                <div className="exerciseCatalogueList">
                    <ExerciseList
                        cataloguedExercise={cataloguedExercise}
                        handleTickBox={handleTickBox}
                        handleDelete={handleDelete}
                        handleAdd={handleAdd}
                        handleRemove={handleRemove}
                    />
                </div>
                {hasExercisesInProgram ? (
                    <div className="exercisesInProgramList">
                        <h2>Exercises in Program:</h2>
                        <ExercisesInProgram
                            exercises={exercisesInProgram}
                            handleRemove={handleRemove}
                            handleTickBox={handleTickBox}
                        />
                    </div>
                ) : (
                    <h2>No exercises added to program</h2>
                )}
            </div>
        ) : (
            <p style={{ marginTop: '2rem' }}>The catalogue is empty</p>
        )}
    </main>;
};

export default Content;
