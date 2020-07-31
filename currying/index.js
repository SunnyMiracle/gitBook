const redux = require('redux');
const thunk = require('redux-thunk');
const logger = require('redux-logger');


const action_1 = 'ACTION_1';
const action_2 = 'ACTION_2';

const initData = 100;
const rd = (state = {}, action) => {
    switch (action.type) {
        case action_1: {
            return {
                ...state,
                age: action.age,
            };
        }
        case action_2: {
            return {
                ...state,
                name: action.name,
            };
        }
        default: return state
    }
}

const loggerMiddleware = store => next => action => {
    console.log('loggerMiddleware', action.type);
    next(action);
    console.log(store.getState());
    console.groupEnd();
}

const store = redux.applyMiddleware(thunk.default, loggerMiddleware)(redux.createStore)(rd, {});

store.dispatch({
    type: action_1,
    age: 10
});
store.dispatch((dispatch, getState) => {
    setTimeout(() => {
        dispatch({
            type: action_2,
            name: '123'
        });
    }, 2000);
})

