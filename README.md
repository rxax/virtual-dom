## Ultra-lightweight Virtual Dom Implementation




How to run the demo:

`npm run dev` then open `http://localhost:1234`


![Alt text](docs/forms.jpg?raw=true "Title")


#### Create a Form with 3 inputs and one button

```js
const forms = HtmlTag('form', {
    children: [
        H3Tag('A simple form example'),
        LabeledInput('Full name', {placeholder:'Enter Your Name',...BOOTSTRAP.FORM_CTRL},  BOOTSTRAP.FORM_GROUP),
        LabeledInput('E-mail', {placeholder:'Enter Email',...BOOTSTRAP.FORM_CTRL},  BOOTSTRAP.FORM_GROUP),
        LabeledInput('City', {... BOOTSTRAP.FORM_CTRL}, BOOTSTRAP.FORM_GROUP),
        Button('Send', {class:'btn btn-default'}),
    ]
});
```

#### Create the App

```js
const app = App({
    attrs: {
        id: 'forms-example-form',
    },
    children: [
        forms,
    ]
})
```

#### And finally start the app

```js
start(app, 'forms-example');
```