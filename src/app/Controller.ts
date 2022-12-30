import View from './View';
import Model from './Model';
import { ElementsToListen, FilterKeys, sortVariantsEnum } from './intefaces/types';
import { EventTargetsIDEnum } from './intefaces/types';

function getIDfromLabelInput(element: HTMLElement | null): string | null {
    if (element instanceof HTMLInputElement) {
        return element.id;
    }
    if (element instanceof HTMLLabelElement) {
        return element.htmlFor;
    }
    return null;
}
export class Controller {
    model: Model;
    view: View;
    constructor() {
        this.model = new Model(document.location.href);
        this.view = new View(this.model.modelData);
        this.model.loadProducts().then(() => {
            this.initViewAndListeners();
        });
    }
    initViewAndListeners(): void {
        this.view = new View(this.model.modelData);
        this.addListeners();
    }
    addListeners(): void {
        window.addEventListener('hashchange', this);
        window.addEventListener('popstate', this);
        switch (this.model.modelData.page) {
            default:
                {
                    //type Keys = keyof ElementsToListenStore;
                    //type Values = ElementsToListenStore[Keys];
                    //const elementsToListen: Values = this.view.getElementsForEvents();
                    const elementsToListen: ElementsToListen['store'] = this.view.getElementsForEvents().store;

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
                break;
        }
    }

    handleEvent(event: Event): void {
        const handlers = {
            [EventTargetsIDEnum.reset]: this.resetEvent,
            [EventTargetsIDEnum.copy]: this.copyEvent,
            [EventTargetsIDEnum.category]: this.categoryEvent,
            [EventTargetsIDEnum.brand]: this.brandEvent,
            [EventTargetsIDEnum.price]: this.priceEvent,
            [EventTargetsIDEnum.stock]: this.stockEvent,
            [EventTargetsIDEnum.sorting]: this.sortingEvent,
            [EventTargetsIDEnum.searching]: this.searchingEvent,
            [EventTargetsIDEnum.viewButtons]: this.viewButtonsEvent,
        };
        if (event.type === 'hashchange' || event.type === 'popstate') {
            console.log('handle for hash change');
            console.log(`
            this.model.changePage(event.currentTarget.href);
            this.initViewAndListeners();
            `);
            return;
        }
        if (event.currentTarget instanceof HTMLElement) {
            const currentID = event.currentTarget.id as EventTargetsIDEnum;
            handlers[currentID].call(this, event);
            return;
        }
        console.log(`No event handler for ${event.type} and ${event.target}`);
    }
    private resetEvent(event: Event): void {
        console.log('this.model.resetFilters()');
        this.initViewAndListeners();
    }
    private copyEvent(event: Event): void {
        console.log('this.view.copyURLtoClipboard()');
    }
    private categoryEvent(event: Event): void {
        if (event.target instanceof HTMLElement) {
            const inputID = getIDfromLabelInput(event.target);
            //console.log('CATEGORY EVENT, id is ', inputID);
            if (inputID) {
                const cutLength = 'input-'.length;
                this.model.createQueryParamFromEvent('category', inputID.slice(cutLength));
            }
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
        if (event.target instanceof HTMLOptionElement) {
            const key = 'sorting' as FilterKeys;
            this.model.createQueryParamFromEvent(key, event.target?.value);
            this.model.applyQueryParam();
            this.model.sortProducts(event.target?.value as sortVariantsEnum);
        }
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
