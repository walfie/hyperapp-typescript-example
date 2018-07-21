import { h, app, ActionsType, ActionResult, View } from "hyperapp";

interface State {
  count: number;
};

const defaultState: State = {
  count: 0
};

interface Actions {
  getState: () => (state: State) => ActionResult<State>;
  down: (value: number) => (state: State) => ActionResult<State>;
  up: (value: number) => (state: State) => ActionResult<State>;
};

const actions: ActionsType<State, Actions> = {
  getState: () => (state) => { return state; },
  down: (value: number) => (state) => {
    return { count: state.count - value };
  },
  up: (value: number) => (state) => {
    return { count: state.count + value };
  }
};

const view: View<State, Actions> = (state, actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
);

const state = (module.hot.data || {}).state as State || defaultState;
const application = app(state, actions, view, document.body);

if (module.hot) {
  module.hot.dispose(() => {
    module.hot.data.state = application.getState();
  });
}

