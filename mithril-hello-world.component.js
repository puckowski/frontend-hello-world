const Counter = {
    count: 0,

    increment() {
        this.count++;
    },

    decrement() {
        this.count--;
    },

    view() {
        return m('div', [
            m('h2', `Count: ${this.count}`),
            m('button', { onclick: () => this.increment() }, 'Increment'),
            m('button', { onclick: () => this.decrement() }, 'Decrement'),
        ]);
    },
};

m.mount(document.getElementById('mithril-app'), Counter);
