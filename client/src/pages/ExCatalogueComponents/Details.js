import React from 'react';

const Details = ({ lengthOfArray }) => {
    return <h3>
        {lengthOfArray} {lengthOfArray === 1 ? 'item' : 'items'} In Catalogue
    </h3>;
};

export default Details;
