import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Input, NavLink, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { clearError } from '../actions/errorActions';


class RegisterModal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearError: PropTypes.func.isRequired
    }

    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        message: null
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        const { modal } = this.state;

        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
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

        const { name, email, password } = this.state;

        const newUser = {
            name,
            email,
            password
        };

        this.props.register(newUser);

    }

    render() {
        const { modal, message } = this.state;
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    REGISTER
                </NavLink>

                <Modal
                    isOpen={modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register </ModalHeader>
                    <ModalBody>
                        {message ? <Alert color="danger">{message}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
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
                            >Register</Button>
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

const mapDispatchToProps = { register, clearError }

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);