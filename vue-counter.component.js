import { ref } from './vue.js'

const VueCounter = {
    setup() {
        const count = ref(0);

        const increment = () => {
            count.value++
        }

        const decrement = () => {
            count.value--
        }

        return { count, increment, decrement }
    },
    template: `
        <div id="vue-app">
            <h1>{{ count }}</h1>
            <button @click="increment">Increment</button>
            <button @click="decrement">Decrement</button>
        </div>
        `
}

export default VueCounter;
