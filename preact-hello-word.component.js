import { h, Component, render } from './preact.js';

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return h('div', null,
      h('p', null, `Count: ${this.state.count}`),
      h('button', { onClick: this.increment }, 'Increment'),
      h('button', { onClick: this.decrement }, 'Decrement')
    );
  }
}

render(h(Counter, null), document.getElementById('app'));