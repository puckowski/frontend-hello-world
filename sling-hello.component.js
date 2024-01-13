import { markup, textNode } from "./sling.js";

export class HelloWorldComponent {
	constructor() {
        this.count = 0;
	}

    incrementCount() {
        this.count++;
    }

	view() {
		return markup('div', {
            attrs: {
                id: 'sling-hello'
            },
			children: [
				textNode('Count: ' + this.count),
                markup('button', {
                    attrs: {
                        onclick: this.incrementCount.bind(this),
                        style: 'margin-left: 0.5rem;'
                    },
                    children: [
                        textNode('Increment')
                    ]
                }),
                markup('button', {
                    attrs: {
                        onclick: () => this.count--,
                        style: 'margin-left: 0.5rem;'
                    },
                    children: [
                        textNode('Decrement')
                    ]
                })
			]
		});
	}
}
