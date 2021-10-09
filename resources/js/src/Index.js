import React from 'react';
import ReactDOM from 'react-dom';
import { HomeApp } from './HomeApp';

function Index() {
    return (
        <HomeApp />
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
