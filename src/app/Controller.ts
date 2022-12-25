import View from './View';
import Model from './Model';

interface ElementsToListenStore {
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
        this.addListeners();
    }
    initViewAndListeners() {
        this.view = new View(this.model.modelData);
        this.addListeners();
    }
    addListeners() {
        switch (this.model.modelData.page) {
            case 'store': {
                const elementsToListen: Partial<ElementsToListenStore> = {} // = this.view.getElementsForEvents();

                console.log('add event listeners to buttons and other inputs');
                console.log('be sure handle events by class handler');
                elementsToListen.reset?.addEventListener('click', this);
            }
        }
    }
    handleEvent(event: Event): void {
        if (event.target instanceof HTMLElement) {

            switch (event.target.id) {
            // this switch case is not pretty;
            // any suggestions how to construct method name from
            // event.target and call it are welcome!

                case eventTargetsID.reset:{
                    this.resetEvent();
                    break;
                }
                case eventTargetsID.copy:{
                    this.copyEvent();
                    break;
                }
                case eventTargetsID.category:{
                    this.copyEvent();
                    break;
                }
                case eventTargetsID.brand:{
                    this.categoryEvent(event);
                    break;
                }
                case eventTargetsID.price:{
                    break;
                }
                case eventTargetsID.stock:{
                    break;
                }
                case eventTargetsID.sorting:{
                    break;
                }
                case eventTargetsID.searching:{
                    break;
                }
                case eventTargetsID.viewButtons:{
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
        console.log('this.model.resetFilters()');
        this.initViewAndListeners();
    }
    private copyEvent() {
        console.log('this.view.copyURLtoClipboard()');
    }
    private categoryEvent(event: Event) {
        console.log('be prepared to handle both input or label click');
        if (event.currentTarget instanceof HTMLElement) {
            console.log(`
                this.model.applyFilter(event.currentTarget.id);
            `);
            this.initViewAndListeners();
        }
    }
    private brandEvent() {

    }
    private priceEvent() {

    }
    private stockEvent() {

    }
    private sortingEvent() {

    }
    private searchingEvent() {

    }
    private viewButtonsEvent() {

    }
}