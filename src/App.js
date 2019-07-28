import React from 'react';
import { hot } from 'react-hot-loader/root';
import Sprint from './components/Sprint/Sprint';
import './app.scss';

const App = () => {
    return (
        <div className="full-screen">
            <div className="app-header">Finite State Machine - Jira Clone</div>
            <Sprint />
        </div>
    );
};

export default hot(App);
