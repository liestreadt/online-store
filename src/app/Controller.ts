import View from './View';
import Model from './Model';

interface ElementsToListenStore {
    reset?: HTMLButtonElement;
    copy?: HTMLButtonElement;
    category: HTMLDivElement;
    brand: HTMLDivElement;
    price: HTMLInputElement; // double-input element
    stock: HTMLInputElement; // double-input element
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
    viewButtons: 'view-buttons-container',
};

export class Controller {
    model: Model;
    view: View;
    constructor() {
        this.model = new Model(document.location.href);
        this.model.loadProducts();
        this.view = new View(this.model.modelData);
        this.addListeners();
    }
    initViewAndListeners(): void {
        this.view = new View(this.model.modelData);
        this.addListeners();
    }
    addListeners(): void {
        window.addEventListener('hashchange', this);
        switch (this.model.modelData.page) {
            case 'store': {
                const elementsToListen: Partial<ElementsToListenStore> = {};
                // replace with
                // const elementsToListen: Partial<ElementsToListenStore> = this.view.getElementsForEvents();

                elementsToListen.reset?.addEventListener('click', this);
                elementsToListen.copy?.addEventListener('click', this);
                elementsToListen.category?.addEventListener('click', this);
                elementsToListen.brand?.addEventListener('click', this);
                elementsToListen.price?.addEventListener('change', this);
                elementsToListen.stock?.addEventListener('change', this);
                elementsToListen.sorting?.addEventListener('change', this);
                elementsToListen.searching?.addEventListener('input', this);
                elementsToListen.viewButtons?.addEventListener('click', this);
            }
        }
    }
    handleEvent(event: Event): void {
        if (event.target instanceof HTMLElement) {
            switch (event.target.id) {
                case eventTargetsID.reset: {
                    this.resetEvent();
                    break;
                }
                case eventTargetsID.copy: {
                    this.copyEvent();
                    break;
                }
                case eventTargetsID.category: {
                    this.categoryEvent(event);
                    break;
                }
                case eventTargetsID.brand: {
                    this.brandEvent(event);
                    break;
                }
                case eventTargetsID.price: {
                    this.priceEvent(event);
                    break;
                }
                case eventTargetsID.stock: {
                    this.stockEvent(event);
                    break;
                }
                case eventTargetsID.sorting: {
                    this.sortingEvent(event);
                    break;
                }
                case eventTargetsID.searching: {
                    this.searchingEvent(event);
                    break;
                }
                case eventTargetsID.viewButtons: {
                    this.viewButtonsEvent(event);
                    break;
                }
            }
        } else {
            if (event.type === 'hashchange') {
                console.log('handle for hash change');
                console.log(`
                this.model.changePage(event.currentTarget.href);
                this.initViewAndListeners();
                `);
            } else {
                throw new Error(`No event handler for ${event.type} and ${event.target}`);
            }
        }
    }
    private resetEvent(): void {
        console.log('this.model.resetFilters()');
        this.initViewAndListeners();
    }
    private copyEvent(): void {
        console.log('this.view.copyURLtoClipboard()');
    }
    private categoryEvent(event: Event): void {
        console.log('be prepared to handle both input or label click');
        if (event.currentTarget instanceof HTMLElement) {
            console.log(`
                this.model.applyQueryParam(event.currentTarget);
            `);
            this.initViewAndListeners();
        }
    }
    private brandEvent(event: Event): void {
        console.log('be prepared to handle both input or label click');
        if (event.currentTarget instanceof HTMLElement) {
            console.log(`
                this.model.applyQueryParam(event.currentTarget);
            `);
            this.initViewAndListeners();
        }
    }
    private priceEvent(event: Event): void {
        console.log(`
            this.model.applyQueryParam(event.currentTarget);
        `);
        this.initViewAndListeners();
    }
    private stockEvent(event: Event): void {
        console.log(`
            this.model.applyQueryParam(event.currentTarget);
        `);
        this.initViewAndListeners();
    }
    private sortingEvent(event: Event): void {
        console.log(`
            this.model.applyQueryParam(event.currentTarget);
        `);
        this.initViewAndListeners();
    }
    private searchingEvent(event: Event): void {
        console.log(`
            this.model.applyQueryParam(event.currentTarget);
        `);
        this.initViewAndListeners();
    }
    private viewButtonsEvent(event: Event): void {
        console.log(`
            this.model.applyQueryParam(event.currentTarget);
        `);
        this.initViewAndListeners();
    }
}
