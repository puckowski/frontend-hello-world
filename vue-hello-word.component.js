import {
    ref,
    createApp
} from './vue.js';

createApp({
    setup() {
        const count = ref(0)

        const increment = () => {
            count.value++
        }

        const decrement = () => {
            count.value--
        }

        return {
            count,
            increment,
            decrement
        }
    }
}).mount('#vue-app')
