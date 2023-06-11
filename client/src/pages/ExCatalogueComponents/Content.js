import AddToCatalogue from './AddToCatalogue';
import ExerciseList from './ExerciseList';

const Content = ({
    name,
    // setName, (not needed)
    cataloguedExercise,
    // setCataloguedExercise, (not needed)
    handleClick,
    handleChange,
    handleSubmitExercise,
    handleTickBox,
    handleDelete,
    handleAdd,
    handleRemove,
}) => {
    return <main>
        <h2 className="Heading for exercise catalogue list">
            Exercise Catalogue:
        </h2>
        {cataloguedExercise.length ? (
            <div className="content">
                <div className="exerciseCatalogueList">
                    <ExerciseList
                        name={name}
                        cataloguedExercise={cataloguedExercise}
                        handleClick={handleClick}
                        handleChange={handleChange}
                        handleSubmitExercise={handleSubmitExercise}
                        handleTickBox={handleTickBox}
                        handleDelete={handleDelete}
                        handleAdd={handleAdd}
                        handleRemove={handleRemove}
                    />
                </div>
            </div>
        ) : (
            <p style={{ marginTop: '2rem' }}>The catalogue is empty</p>
        )}
    </main>;
};

export default Content;
