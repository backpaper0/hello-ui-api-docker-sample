import React from 'react';
import ReactDOM from 'react-dom';
import { ReduceStore, Container } from 'flux/utils';
import { Dispatcher } from 'flux';

const HelloDispatcher = new Dispatcher();

const ActionTypes = {
    UPDATE_NAME: Symbol(),
    SET_MESSAGE: Symbol()
};

class HelloStoreClass extends ReduceStore {
    getInitialState() {
        return 'Hello, world!';
    }
    reduce(state, { type, payload }) {
        switch (type) {
            case ActionTypes.SET_MESSAGE: {
                const { hello } = payload;
                return hello;
            }
            default:
                return state;
        }
    }
}

const HelloStore = new HelloStoreClass(HelloDispatcher);

class NameStoreClass extends ReduceStore {
    getInitialState() {
        return 'world';
    }
    reduce(state, { type, payload }) {
        switch (type) {
            case ActionTypes.UPDATE_NAME: {
                const { name } = payload;
                return name;
            }
            default:
                return state;
        }
    }
}

const NameStore = new NameStoreClass(HelloDispatcher);

const updateName = (name) => {
    HelloDispatcher.dispatch({
        type: ActionTypes.UPDATE_NAME,
        payload: { name }
    });
};

const sayHello = (name) => {
    const body = new URLSearchParams({ name });
    fetch('http://localhost:8080/hello', {
        method: 'POST',
        body
    })
        .then(response => response.text())
        .then(hello => {
            HelloDispatcher.dispatch({
                type: ActionTypes.SET_MESSAGE,
                payload: { hello }
            });
        })
};

const App = ({ name, hello }) => (
    <div>
        <h1>{hello}</h1>
        <p>
            <input type="text" value={name} onChange={event => updateName(event.target.value)} />
            <button onClick={event => sayHello(name)}>Submit</button>
        </p>
    </div>
);

const getStores = () => [HelloStore, NameStore];

const calculateState = () => {
    return {
        name: NameStore.getState(),
        hello: HelloStore.getState()
    };
};

const AppContainer = Container.createFunctional(App, getStores, calculateState);

ReactDOM.render(<AppContainer />, document.getElementById('root'));
