import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool
	};

	state = {
		modal: false,
		name: ""
	};

	toggle = () => this.setState({ modal: !this.state.modal });

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	onSubmit = e => {
		e.preventDefault();

		const newItem = {
			name: this.state.name
		};

		this.props.addItem(newItem);

		this.toggle();
	};

	render() {
		const { modal } = this.state;
		const { isAuthenticated } = this.props;
		return (
			<div>
				{isAuthenticated ? (
					<Button color="dark" className="my-4" onClick={this.toggle}>
						Add Task
					</Button>
				) : (
					<h5 className="mb-4">Please login</h5>
				)}

				<Modal isOpen={modal} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Add to task list</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="item">Email</Label>
								<Input
									type="text"
									name="name"
									id="item"
									placeholder="Add new task"
									onChange={this.onChange}
								/>
							</FormGroup>
							<Button color="dark" className="mt-4 w-100">
								Add task
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	item: state.item,
	isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { addItem };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemModal);
