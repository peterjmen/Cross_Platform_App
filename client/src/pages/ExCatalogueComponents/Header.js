import React from 'react';

// const Header = props => {
const Header = ({ stringPropertyUno }) => {
    return <div>
        <h1>Exercise Catalogue Header</h1>
        {/* <h5>{props.stringPropertyUno}</h5> */}
        <h5>{stringPropertyUno}</h5>
    </div>;
};

Header.defaultProps = {
    stringPropertyUno: 'Default Title',
};

export default Header;
