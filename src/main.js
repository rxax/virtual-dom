import {Button, H3Tag, HtmlTag, LabeledInput, App} from "./components/HtmlTagLibrary";
import {BOOTSTRAP} from "./utils/bootstrap";
import {start} from "./components/start";
import {patch} from "./components/diff";

const fieldOrder = ['Full name', 'E-mail', 'City'];

const buildSummary = (values) => {
    const text = fieldOrder
        .map((label) => `${label}: ${values[label] || '(empty)'}`)
        .join('\n');

    return HtmlTag('div', {
        attrs: {
            id: 'form-summary',
            class: 'well well-sm',
            style: 'margin-top: 15px; white-space: pre-line;'
        },
        children: [text || 'No values yet']
    });
};

const buildForm = (values) => HtmlTag('form', {
    attrs: {
        id: 'demo-form'
    },
    children: [
        H3Tag('A simple form example'),
        LabeledInput('Full name', {
            id: 'full-name',
            value: values['Full name'],
            placeholder: 'Enter Your Name',
            ...BOOTSTRAP.FORM_CTRL,
        }, BOOTSTRAP.FORM_GROUP),
        LabeledInput('E-mail', {
            id: 'email',
            value: values['E-mail'],
            placeholder: 'Enter Email',
            ...BOOTSTRAP.FORM_CTRL,
        }, BOOTSTRAP.FORM_GROUP),
        LabeledInput('City', {
            id: 'city',
            value: values['City'],
            ...BOOTSTRAP.FORM_CTRL,
        }, BOOTSTRAP.FORM_GROUP),
        Button('Send', { type: 'button', class: 'btn btn-default' }),
        buildSummary(values),
    ]
});

const buildApp = (values) => App({
    attrs: { id: 'forms-example-form' },
    children: [buildForm(values)]
});

const state = {
    'Full name': '',
    'E-mail': '',
    'City': '',
};

let currentTree = buildApp(state);
start(currentTree, 'forms-example');

const appNode = document.getElementById('forms-example-form');
const formNode = document.getElementById('demo-form');

const updateFromForm = () => {
    if (!formNode) {
        return;
    }

    const nextState = {
        'Full name': document.getElementById('full-name')?.value || '',
        'E-mail': document.getElementById('email')?.value || '',
        'City': document.getElementById('city')?.value || '',
    };

    const nextTree = buildApp(nextState);
    patch(appNode, currentTree, nextTree);
    currentTree = nextTree;
};

formNode.addEventListener('input', updateFromForm);
formNode.addEventListener('change', updateFromForm);

