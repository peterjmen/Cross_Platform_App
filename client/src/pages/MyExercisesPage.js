import React, { useEffect, useState } from 'react';

function MyExercisesPage() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/v0/exercises')
            .then(res => res.json())
            .then(data => setExercises(data.exercises))
            .catch(error => console.error('Error fetching exercises:', error));
    }, []);

    return <>
        {exercises.length === 0 && <p>Loading or no exercises found</p>}

        {exercises.length > 0 && <code>
            {JSON.stringify(exercises, null, 4)}
        </code>}
    </>;
}

export default MyExercisesPage;

//Paulo code
// import React from 'react';

// function MyExercisesPage() {
//   return (
//     <div>
//       <h1>My Exercises Page</h1>
//       <p>This is the my exercises page content.</p>
//     </div>
//   );
// }

// export default MyExercisesPage;
