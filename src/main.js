import {Button, H3Tag, HtmlTag, LabeledInput, EMPTY, App} from "./components/HtmlTagLibrary";
import {BOOTSTRAP} from "./utils/bootstrap";
import {start} from "./components/start";

/**
 * Simple Form Example
 */
const forms = HtmlTag('form', {
    children: [
        H3Tag('A simple form example'),
        LabeledInput('Full name', {placeholder:'Enter Your Name',...BOOTSTRAP.FORM_CTRL}, EMPTY, BOOTSTRAP.FORM_GROUP),
        LabeledInput('E-mail', {placeholder:'Enter Email',...BOOTSTRAP.FORM_CTRL}, EMPTY, BOOTSTRAP.FORM_GROUP),
        LabeledInput('City', {... BOOTSTRAP.FORM_CTRL}, EMPTY, BOOTSTRAP.FORM_GROUP),
        Button('Send', {class:'btn btn-default'}),
    ]
});

/**
 * The starting point
 */
const app = App({
    attrs: {
        id: 'forms-example-form',
    },
    children: [
        forms,
    ]
})

// start the virtual dom
start(app, 'forms-example');

