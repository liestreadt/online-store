import Model from './app/Model';
import './sass/style.scss';

const model = new Model(window.location.href);
model.loadProducts().then(() => {
    console.log('im here too early');
});
