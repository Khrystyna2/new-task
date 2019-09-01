import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import TaskList from './components/TaskLists';
import ItemModal from './components/ItemModal';
import { loadUser } from './actions/authActions';
import TaskItem from './components/TaskItem';
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <TaskList />
            <Row>
              <TaskItem />
            </Row>
          </Container>
        </div>
      </Provider>
    );
  }

}

export default App;


