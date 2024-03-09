import React from 'react';

import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

function UserIsAuthenticated(props) {
    const { isLoggedIn, children } = props;

    return <React.Fragment>{!isLoggedIn ? <Navigate to="/login" /> : children}</React.Fragment>;
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

export default connect(mapStateToProps, null)(UserIsAuthenticated);
