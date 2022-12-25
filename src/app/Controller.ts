import View from './View';
import Model from './Model';

interface ButtonsStore {
    reset?: HTMLButtonElement;
    copy?: HTMLButtonElement;
    category: HTMLDivElement;
    brand: HTMLDivElement;
    priceInput: any; // double-input element
    stockInput: any; // double-input element
    sorting: HTMLSelectElement;
    searching: HTMLInputElement;
    viewButtons: HTMLDivElement;
}
const eventTargetsID = {
    reset: 'button-reset',
    copy: 'button-copy',
    category: 'category-container',
    brand: 'brand-container',
    price: '', // element id which contains price input
    stock: '', // element id which contains stock input
    sorting: 'sorting-options',
    searching: 'searching-field',
    viewButtons: 'view-buttons-container'
}

class Controller {
    model: Model;
    view: View;
    constructor () {
        this.model = new Model(document.location.href);
        this.view = new View(this.model.modelData);
    }
    addListeners() {
        switch (this.model.modelData.page) {
            case 'store': {
                const buttons: Partial<ButtonsStore> = {} // = this.view.getButtonsArray();

                console.log('add event listeners to buttons and other inputs');
                console.log('be sure handle events by class handler');
                buttons.reset?.addEventListener('click', this);
            }
        }
    }
    handleEvent(event: Event): void {
        if (event.target instanceof HTMLElement) {
            switch (event.target.id) {
                case eventTargetsID.reset:{
                    break;
                }
                case eventTargetsID.copy:{
                    break;
                }
                case eventTargetsID.category:{
                    break;
                }
                case eventTargetsID.brand:{
                    break;
                }
            }
        } else {
            if (event.type === 'hashchange') {
                console.log('handle for hash change');
            } else {
                throw new Error(`No event handler for ${event.type} and ${event.target}`);
            }
        }
    }
    private resetEvent() {

    }
}