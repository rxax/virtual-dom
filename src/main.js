import render from './components/render';
import mount from './components/mount';
import {Button, H3Tag, Input, HtmlTag, LabeledInput} from "./components/HtmlTagLibrary";

/**
 * Forms Example
 */
const forms = HtmlTag('form', {
    attrs: {
        id: 'forms-example-form',
    },
    children: [
        H3Tag('A simple form example'),
        LabeledInput('Full name', {placeholder:'Enter Full Name',class:'form-control'}, null, {class:'form-group'}),
        LabeledInput('E-mail', {placeholder:'Enter Email',class:'form-control'}, null, {class:'form-group'}),
        LabeledInput('City', {class:'form-control'}, null, {class:'form-group'}),
        Button('Send', {class:'btn btn-default'}),
    ]
});
const form_app = render(forms);
mount(form_app, document.getElementById('forms-example'));


const virtual_app = HtmlTag('div', {
    attrs: {
        id: 'basic-app',
    },
    children: [
        'Demo',
        HtmlTag('img', {
            attrs: {
                src: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGU3ZDBzOTZjeDc5a3E1emo1ZWVhOXk1anE3aHdxcXFtNWVvbzIzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OuQmhmAAdJFLi/giphy.gif',
            },
        }),
    ],
});

//const app = render(virtual_app);
//mount(app, document.getElementById('basic-app'));