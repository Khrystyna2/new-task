import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import { connect } from 'react-redux'
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import Logout from './Logout';

import PropTypes from 'prop-types';

class AppNavbar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isOpen } = this.state;
        const { auth: { isAuthenticated, user } } = this.props;

        const authLink = (
            <Fragment>
                <NavItem>
                    <strong className="navbar-text mr-2">{user ? `Welcome ${user.name}` : ''}</strong>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )

        const guestLink = (
            <Fragment>
                <NavItem>
                    <LoginModal />
                </NavItem>
                <NavItem>
                    <RegisterModal />
                </NavItem>
            </Fragment>
        )
        return (
            <>
                <Navbar color="warning" dark expand="md" className="mb-4 py-3">
                    <Container>
                        <NavbarBrand href="/">LOGO</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLink : guestLink}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar) 