import React from 'react';

import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

function UserIsNotAuthenticated(props) {
    const { isLoggedIn, navigateUrl, children } = props;

    return <React.Fragment>{isLoggedIn ? <Navigate to={navigateUrl} /> : children}</React.Fragment>;
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        navigateUrl: state.user.navigateUrl,
    };
};

export default connect(mapStateToProps, null)(UserIsNotAuthenticated);
