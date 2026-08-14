# Ultra-lightweight Virtual DOM

This project is a small virtual DOM implementation built in plain JavaScript. It demonstrates the core ideas behind a VDOM: create a tree of virtual nodes, render it to real DOM elements, and patch the DOM when state changes.

## How it works

The app uses a very small model:

- `HtmlTag(tagName, { attrs, children })` creates a virtual node
- `render(node)` turns the virtual tree into a real DOM tree
- `diff(oldTree, newTree)` compares two trees and produces an update patch
- `patch(node, oldTree, newTree)` applies the diff to the existing DOM node
- `start(app, mountId)` mounts the app into the page

This keeps the project easy to read and is a good learning example for understanding how VDOM libraries work at a basic level.

## Project structure

- `src/main.js` bootstraps the app and demonstrates state-driven updates
- `src/components/HtmlTagLibrary.js` contains the virtual-element creation helpers
- `src/components/render.js` converts virtual nodes into real DOM elements
- `src/components/diff.js` compares old and new virtual trees
- `src/components/mount.js` mounts the rendered output into the page
- `src/components/start.js` starts the app

## Running the demo

From the project root, run:

```bash
npm install
npm run dev
```

Then open the local Parcel URL, usually:

```text
http://localhost:1234
```

## Creating a virtual node

```js
import { HtmlTag, H3Tag, LabeledInput, Button, App } from "./components/HtmlTagLibrary";
import { BOOTSTRAP } from "./utils/bootstrap";

const form = HtmlTag('form', {
  attrs: { id: 'demo-form' },
  children: [
    H3Tag('A simple form example'),
    LabeledInput('Full name', {
      id: 'full-name',
      placeholder: 'Enter Your Name',
      ...BOOTSTRAP.FORM_CTRL,
    }, BOOTSTRAP.FORM_GROUP),
    LabeledInput('E-mail', {
      id: 'email',
      placeholder: 'Enter Email',
      ...BOOTSTRAP.FORM_CTRL,
    }, BOOTSTRAP.FORM_GROUP),
    Button('Send', { type: 'button', class: 'btn btn-default' }),
  ],
});

const app = App({
  attrs: { id: 'forms-example-form' },
  children: [form],
});
```

## Starting the app

```js
import { start } from "./components/start";

start(app, 'forms-example');
```

## Updating the app state

The app keeps a plain JavaScript state object and rebuilds the VDOM tree whenever inputs change:

```js
const state = {
  'Full name': '',
  'E-mail': '',
  'City': '',
};

const nextTree = buildApp({
  ...state,
  'Full name': 'Ada',
});

patch(appNode, currentTree, nextTree);
currentTree = nextTree;
```

This is the essential VDOM pattern:

1. update application state
2. create a new virtual tree
3. compare against the previous tree
4. patch the real DOM

## Example: form value summary

The sample app binds input events to updates and renders a summary block below the button using the virtual tree. That keeps the UI synchronized without directly mutating the DOM at every keystroke.

## Notes

This implementation is intentionally small and educational. It is not a production-grade VDOM engine like React or Vue. It focuses on the core mechanics that make virtual DOM work:

- node structure and attribute handling
- child reconciliation
- DOM replacement and patching
- state-driven rerendering

## Useful commands

```bash
npm run dev
```

Launches the app in development mode with Parcel.

```bash
npx parcel build src/index.html --no-source-maps
```

Builds a production bundle.

![Alt text](docs/forms.jpg?raw=true "Title")