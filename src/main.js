import createElement from './components/createElement';

const app = createElement('div', {
    attrs: {
        id: 'app',
    },
    children: [
        createElement('img', {
            attrs: {
                src: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGU3ZDBzOTZjeDc5a3E1emo1ZWVhOXk1anE3aHdxcXFtNWVvbzIzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OuQmhmAAdJFLi/giphy.gif',
            },
        }),
    ],
});

console.log(app);