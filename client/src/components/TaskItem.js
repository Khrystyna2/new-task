import React, { Component } from 'react';
import { Card, Button, CardFooter, CardBody, CardTitle, CardText } from 'reactstrap';

export class TaskItem extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Special Title Treatment</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Go somewhere</Button>
                    </CardBody>
                    <CardFooter><Button>Go somewhere</Button> <Button>Go somewhere</Button> <Button>Go somewhere</Button></CardFooter>
                </Card>
            </div>
        )
    }
}

export default TaskItem
