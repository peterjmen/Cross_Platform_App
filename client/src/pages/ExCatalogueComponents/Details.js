import React from 'react';

const Details = ({ lengthOfArray }) => {
    return <h3>
        {lengthOfArray} {lengthOfArray === 1 ? 'item' : 'items'} added to
        program
    </h3>;
};

export default Details;
