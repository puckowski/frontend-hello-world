'use strict'

import { render, createSignal, html } from "./solid-web/solid-web.js"

function Counter() {
    const [count, setCount] = createSignal(0);
    const increment = () => setCount(count() + 1);

    return html`
      <button type="button" onClick=${increment}>
        Click: ${count}
      </button>
    `;
}

render(Counter, document.getElementById('solid-hello'));
