import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {

    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        const { logout } = this.props;
        return (
            <Fragment>
                <NavLink onClick={logout} href="#">
                    LOGOUT
                </NavLink>
            </Fragment>
        )
    }
}


const mapDispatchToProps = { logout }

export default connect(null, mapDispatchToProps)(Logout);
