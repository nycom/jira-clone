import React from 'react';
import { hot } from 'react-hot-loader/root';
import Sprint from './components/Sprint/Sprint';
import './app.scss';

const App = () => {
    return (
        <div className="full-screen">
            <Sprint />
        </div>
    );
};

export default hot(App);
