import React from 'react';
import { hot } from 'react-hot-loader/root';
import './app.scss';
import Sprint from './components/Sprint/Sprint';

const App = () => {
    return (
        <div className="full-screen">
            <h1>Finite State Machine - Jira Clone</h1>
            <Sprint />
        </div>
    );
};

export default hot(App);
