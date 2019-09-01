import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearError } from '../actions/errorActions';


class LoginModal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired
    }

    state = {
        modal: false,
        email: '',
        password: '',
        message: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        const { modal } = this.state;

        if (error !== prevProps.error) {
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ message: error.message.message });
            } else {
                this.setState({ message: null });
            }
        }

        if (modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearError();
        this.setState({ modal: !this.state.modal })
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const user = {
            email,
            password
        }

        this.props.login(user);

    }

    render() {
        const { modal, message } = this.state;
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    LOGIN
                </NavLink>

                <Modal
                    isOpen={modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Login  </ModalHeader>
                    <ModalBody>
                        {message ? <Alert color="danger">{message}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button
                                color="dark"
                                className="mt-4 w-100"
                            >Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

const mapDispatchToProps = { login, clearError }

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);