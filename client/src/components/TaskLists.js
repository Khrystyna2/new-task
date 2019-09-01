import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';


class TaskList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems();
    }

    render() {
        const { item: { items }, deleteItem, isAuthenticated } = this.props;
        return (
            <ListGroup>
                {items.map(({ _id, name }) => (
                    <ListGroupItem key={_id} className="d-flex justify-content-between">
                        {name}
                        {isAuthenticated ? <Button
                            color="danger"
                            size="sm"
                            onClick={() => deleteItem(_id)}
                        >&times;</Button> : null}

                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = { getItems, deleteItem }

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);