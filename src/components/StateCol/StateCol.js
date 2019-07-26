import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

const StateCol = props => {
    const { title, FSMtasks, updateTask } = props;
    return (
        <div>
            <div>{title}</div>
            <div className="state-col-container">
                <div className="tasks-container">
                    {FSMtasks.map(FSMtask => {
                        return (
                            <Task
                                key={FSMtask.task.id}
                                updateTask={updateTask}
                                task={FSMtask}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

StateCol.propTypes = {
    title: PropTypes.string,
    FSMtasks: PropTypes.array,
    updateTask: PropTypes.func,
    children: PropTypes.node
};

export default StateCol;
