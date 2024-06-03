# TODO List App

## Install

Install dependencies with `npm i`.


Node Version: 18.18.0


Npm Version: 9.8.1

## Build

Uses esbuild to bundle js and css.


To see it in local env: copy `src/index.html` into `dist/index.html`, or create a symlink.

Create symlink manually or run `npm run symlink:index`


Then run `npm run dev` and access `localhost:8000`


Note: as not hosting this anywhere, skipped steps for building to a prod environment

## Tests

`npm t`

`npm run coverage`


## Thoughts and decisions

**No frameworks:** rather show "vanilla knowledge" than relying on (nice) preimplemented features


**Building:** ESBuild is fast and more straightforward than, say, Webpack


**State management:** libraries like Redux would be overkill, Zustand is straightforward but an external dependency nonetheless.
`useReducer` seemed more flexible than mere `useState`
`useContext` also used


**App Config:** main idea with App Config is
1. expose an event-like interface to external world like `onAdded`, `onStatusUpdated`
to allow other microfrontends to subscribe to changes that happen in the TODO list
2. allow some customization, like passing custom classNames (kinda like Material UI does)
Haven't implemented that as styling wasn't the focus, but I'd likely use Tailwind if it was
3. allow to hide or show parts of the UI (idea behind the `showAddTodo`)
4. allow some behaviour to be controlled (like choosing storage method)

Drawbacks: Adding configs requires me to implement the respective tests on the main component `TodoListApp`
One can open the console in browser and see some events are logged.
It seems "good enough" for this quick implementation, therefore no automated unit tests for things like "does onAdded gets called"


**Order of events:**
If adding or updating TODOS were async, Redux Sagas could solve that elegantly.
Given the simplicity of this Todo List App, I'm just calling `onAdded`, `onStatusUpdated` functions after the `dispatch` calls


**Desired:**
- Wrap checkbox and todo description into a HTML label tag, so that clicking the text changes the checkbox too
But originally I wanted to separate showing the description from editing the Status
Guess creating a wrapper component whose children are ShowTodo and EditTodoStatus is cleaner than
making EditTodoStatus als child of ShowTodo...


- Maybe a Button to Clear the Storage? Not required by challenge, so skipped implementing that


**Optionals:**
Linter, Prettier, Pre-commit hooks - Good when working in a team, but I'm alone so I'd rather not
spend time setting those ^^


**Save and Load:**
Created two classes to open up the possibility of a Strategy Pattern.
That is also the reason for the `async` function colouring on the Storage class
The strategy could then be passed as a config prop in `AppConfig`
