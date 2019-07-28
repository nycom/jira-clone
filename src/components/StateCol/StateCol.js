import React from 'react';
import PropTypes from 'prop-types';
import './StateCol.scss';
import Task from '../Task/Task';
import { Container, Header } from 'semantic-ui-react';

const StateCol = props => {
    const { title, FSMtasks, handleTaskStateChange, active } = props;
    const handleDrop = e => {
        handleTaskStateChange(title);
    };
    const allowDrop = ev => {
        ev.preventDefault();
    };
    return (
        <div className="state-col-container">
            <div className="state-col-header">
                <Header className="state-col-header" size="medium">
                    {title}
                </Header>
            </div>
            <Container>
                <div
                    onDragOver={allowDrop}
                    onDrop={handleDrop}
                    className={
                        'tasks-container ' + (active ? 'active-col' : '')
                    }>
                    {FSMtasks.map(FSMtask => {
                        return (
                            <Task key={FSMtask.baseTask.id} task={FSMtask} />
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};

StateCol.propTypes = {
    title: PropTypes.string,
    active: PropTypes.bool,
    FSMtasks: PropTypes.array,
    handleTaskStateChange: PropTypes.func,
    children: PropTypes.node
};

export default StateCol;
