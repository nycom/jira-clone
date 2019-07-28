import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Dropdown } from 'semantic-ui-react';
import './Task.scss';
import { clearTask, selectTask, updateTask } from '../../store/actions';

const Task = props => {
    const { task, dispatch } = props;

    const handleOnChange = (e, data) => {
        task.sm.action(data.value);
        dispatch(
            updateTask({
                ...task.baseTask,
                currentState: task.sm.currentState.name
            })
        );
    };
    const onDragStart = e => {
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('text/plain', task.baseTask.id);
        dispatch(
            selectTask({
                task: task.baseTask,
                transitions: task.sm.currentState.transitions
            })
        );
    };

    const onDragEnd = () => {
        dispatch(clearTask());
    };
    const transitionOptions = Object.keys(
        task.sm.currentState?.transitions
    ).map(transition => {
        return { key: transition, value: transition, text: transition };
    });

    return (
        <div
            className="task"
            draggable
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}>
            <Card>
                <Card.Content
                    header={task.baseTask.name}
                    meta={task.baseTask.id}
                />
                <Card.Content description={task.baseTask.description} />
                <Card.Content extra>
                    <Dropdown
                        placeholder="Select Action"
                        fluid
                        selection
                        onChange={handleOnChange}
                        options={transitionOptions}
                    />
                </Card.Content>
            </Card>
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.object,
    dispatch: PropTypes.func,
    jiraConfig: PropTypes.array
};

export default connect()(Task);
