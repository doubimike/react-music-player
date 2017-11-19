import Root from './root';
import React from 'react'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';



render(
    <AppContainer>
        <Root />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./components/hello', () => {
        const NewRoot = require('./root').default;
        render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}




