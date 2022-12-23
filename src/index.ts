import Model from './app/Model';
import './sass/style.scss';

(async () => {
    const model = new Model(window.location.href);
    model.loadProducts().then(async () => {
        console.log('im here too early');
        model.readParamsFromURL();
        model.findInitialFilterValues();
    });
})();
