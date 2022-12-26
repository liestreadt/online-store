import View from './View';
import Model from './Model';
class Controller {
    model: Model;
    view: View;
    constructor () {
        this.model = new Model(document.location.href);
        this.view = new View(this.model.modelData);
    }
    addListeners() {
        console.log('get buttons array from view');
        switch (this.model.modelData.page) {
            case 'store': {
                console.log('add event listeners to buttons array');
                console.log('be sure handle events by class handler');
            }
        }
    }
}