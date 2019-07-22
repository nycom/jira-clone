import State from './State';

class StateMachine {
    constructor(config) {
        this._states = {};
        this._initialState = null;
        if (config instanceof Array) {
            config.forEach(item => {
                const state = new State(item.name, item.transitions);
                const transitions = config.transitions;
                if (transitions) {
                    transitions.forEach(function(transition) {
                        state.addTransition(
                            transition.action,
                            transition.target
                        );
                    });
                }
                this._addState(state, item.initial || false);
            });
        }
    }

    start() {
        if (!this._initialState) {
            console.error(
                'State Machine cannot start. No initialState states defined.'
            );
        }
        this._transitionTo(this._initialState, null);
    }

    get states() {
        return this._states;
    }

    get initialState() {
        return this._initialState;
    }
    get currentState() {
        return this._currentState;
    }

    getStatesAmount() {
        return Object.keys(this.states).length;
    }

    getStateByName(stateName) {
        return this._states[stateName];
    }

    action(action) {
        const newStateTarget = this._currentState.getTarget(action);
        const newState = this._states[newStateTarget];
        // Only transition if this action in valid
        if (newState) {
            this._transitionTo(newState, action);
        }
    }
    _transitionTo(nextState) {
        this._currentState = nextState;
    }

    _addState(state) {
        if (state === null || this._states[state.name]) {
            return null;
        }
        this._states[state.name] = state;
        return state;
    }
    setInitialState(stateName) {
        const state = this._states[stateName];
        state
            ? (this._initialState = state)
            : console.error('state does not exist!');
    }

    removeState(stateName) {
        var state = this._states[stateName];
        if (state === null) {
            return null;
        }
        delete this._states[stateName];
        return state;
    }
}

export default StateMachine;
