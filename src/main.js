import createElement from './components/createElement';
import render from './components/render';
import mount from './components/mount';

const virtual_app = createElement('div', {
    attrs: {
        id: 'app',
    },
    children: [
        'Demo',
        createElement('img', {
            attrs: {
                src: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGU3ZDBzOTZjeDc5a3E1emo1ZWVhOXk1anE3aHdxcXFtNWVvbzIzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OuQmhmAAdJFLi/giphy.gif',
            },
        }),
    ],
});

const app = render(virtual_app);
mount(app, document.getElementById('app'));