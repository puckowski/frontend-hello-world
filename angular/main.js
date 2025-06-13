// @ts-check

/**
 * @file Buildless Angular 17 app
 * @license CC0-1.0
 */

import "@angular/compiler";
import "zone.js";

import { TitleCasePipe } from "./common.development.mjs";
import { HttpClient, provideHttpClient } from "./http.js";
import {
    Component,
    Injectable,
    effect,
    inject,
    signal,
} from "./core.development.mjs";
import { toSignal } from "./rxjs-interop.development.js";
import { bootstrapApplication } from "./platform-browser.development.mjs";

class AppService {
    static {
        Injectable({ providedIn: "root" })(this);
    }

    /** @readonly */
    static #urlBase = "https://jsonplaceholder.typicode.com";

    /** @readonly */
    #httpClient = inject(HttpClient);

    getUsers() {
        return this.#httpClient.get(`${AppService.#urlBase}/users`);
    }

    /** @param {*} userId */
    getPosts(userId) {
        return this.#httpClient.get(`${AppService.#urlBase}/posts`, {
            params: { userId },
        });
    }
}

class AppComponent {
    static {
        Component({
            standalone: true,
            selector: "app-root",
            imports: [TitleCasePipe],
            template: `
        <h1>Show Posts</h1>
        <label>
          Select User: 
          <select (change)="selectedUserId.set($event.target.value)">
            <option hidden selected></option>
            @for (user of users(); track user.id) {
              <option value="{{user.id}}">
                &#64;{{user.username}}: {{user.name}}
              </option>
            }
          </select>
        </label>
        <ul>
          @for (post of posts(); track post.id) {
            <li>{{post.title | titlecase}}</li>
          }
        </ul>
        <p>
          Powered by
          <a href="https://jsonplaceholder.typicode.com/" target="_blank">
            JSONPlaceholder
          </a>
        </p>
        `,
        })(this);
    }

    /** @readonly */
    #appService = inject(AppService);

    /** @protected @readonly */
    users = toSignal(this.#appService.getUsers());
    /** @protected @readonly */
    selectedUserId = signal(/** @type {*} */(undefined));
    /** @protected @readonly */
    posts = signal(/** @type {*} */(undefined));

    constructor() {
        effect((onCleanup) => {
            const selectedUserId = this.selectedUserId();
            if (selectedUserId !== undefined) {
                const subscription = this.#appService.getPosts(selectedUserId)
                    .subscribe((posts) => this.posts.set(posts));
                onCleanup(() => subscription.unsubscribe());
            }
        });
    }
}

await bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
    ],
});