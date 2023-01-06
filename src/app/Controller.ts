import View from './View';
import Model from './Model';
import { ElementsToListen, FilterKeys, PageCase, SortVariantsEnum } from './intefaces/types';
import { EventTargetsIDEnum, CartEventTargetsIDEnum } from './intefaces/types';
import { SLIDER_MAX_ID, SLIDER_MIN_ID } from './constants/constants';

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
        //window.addEventListener('popstate', this);

        switch (this.model.modelData.page) {
            case PageCase.store: {
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
                elementsToListen.cards?.addEventListener('click', this);
                break;
            }
            case PageCase.cart: {
                const elementsToListen: ElementsToListen['cart'] = this.view.getElementsForEvents().cart;

                elementsToListen.pageBack?.addEventListener('click', this);
                elementsToListen.pageForward?.addEventListener('click', this);
                elementsToListen.listLimit?.addEventListener('change', this);
                elementsToListen.cartList?.addEventListener('click', this);
                elementsToListen.promoInput?.addEventListener('change', this);
                elementsToListen.buyButton?.addEventListener('click', this);
                break;
            }
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
            [EventTargetsIDEnum.cards]: this.addToCartEvent,

            [CartEventTargetsIDEnum.PAGE_BACK]: this.pageBackEvent,
            [CartEventTargetsIDEnum.PAGE_FORWARD]: this.pageForwardEvent,
            [CartEventTargetsIDEnum.LIST_LIMIT]: this.listLimitEvent,
            [CartEventTargetsIDEnum.CART_LIST]: this.cartListEvent,
            [CartEventTargetsIDEnum.PROMO]: this.promoInputEvent,
            [CartEventTargetsIDEnum.BUY]: this.buyButtonEvent,
        };
        if (event.type === 'hashchange') {
            // || event.type === 'popstate'
            this.model.updatePage();
            this.initViewAndListeners();
            return;
        }
        if (event.currentTarget instanceof HTMLElement) {
            const currentID = event.currentTarget.id as EventTargetsIDEnum;
            handlers[currentID].call(this, event);
            return;
        }
        console.log(`No event handler for ${event.type} and ${event.target}`);
    }
    pageBackEvent() {
        console.log('pageBackEvent!');
    }
    pageForwardEvent() {
        console.log('pageForwardEvent!');
    }
    listLimitEvent() {
        console.log('listLimitEvent!');
    }
    cartListEvent() {
        console.log('cartListEvent!');
    }
    promoInputEvent() {
        console.log('promoInputEvent!');
    }
    buyButtonEvent() {
        console.log('buyButtonEvent!');
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
            if (inputID) {
                const cutLength = 'input-'.length;
                this.model.createQueryParamFromEvent('category', inputID.slice(cutLength));
            }
            this.initViewAndListeners();
        }
    }
    private brandEvent(event: Event): void {
        if (event.target instanceof HTMLElement) {
            const inputID = getIDfromLabelInput(event.target);
            if (inputID) {
                const cutLength = 'input-'.length;
                this.model.createQueryParamFromEvent('brand', inputID.slice(cutLength));
            }
            this.initViewAndListeners();
        }
    }
    private priceEvent(event: Event): void {
        if (event.target instanceof HTMLInputElement) {
            const inputID = event.target.id;
            const priceKey: FilterKeys = inputID === SLIDER_MAX_ID ? 'priceMax' : 'priceMin';
            const secondValue =
                inputID === SLIDER_MAX_ID
                    ? this.model.shownProductInfo?.minPrice
                    : this.model.shownProductInfo?.maxPrice;
            this.model.createQueryParamFromEvent(priceKey, event.target.value, secondValue);
        }
        this.initViewAndListeners();
    }
    private stockEvent(event: Event): void {
        if (event.target instanceof HTMLInputElement) {
            const inputID = event.target.id;
            const stockKey: FilterKeys = inputID === SLIDER_MAX_ID ? 'stockMax' : 'stockMin';
            const secondValue =
                inputID === SLIDER_MAX_ID
                    ? this.model.shownProductInfo?.minStock
                    : this.model.shownProductInfo?.maxStock;
            this.model.createQueryParamFromEvent(stockKey, event.target.value, secondValue);
        }
        this.initViewAndListeners();
    }
    private sortingEvent(event: Event): void {
        if (event.target instanceof HTMLSelectElement) {
            const key = 'sorting';
            this.model.createQueryParamFromEvent(key, event.target?.value);
            this.model.sortProducts(event.target?.value as SortVariantsEnum);
        }
        this.initViewAndListeners();
    }
    private searchingEvent(event: Event): void {
        if (event.target instanceof HTMLInputElement) {
            const text = event.target.value;
            this.model.createQueryParamFromEvent('searching', text);
        }
        this.initViewAndListeners();
    }
    private viewButtonsEvent(event: Event): void {
        console.log(`
            this.model.applyQueryParam(event.currentTarget);
        `);
        this.initViewAndListeners();
    }
    private addToCartEvent(event: Event): void {
        if (event.target instanceof HTMLButtonElement) {
            const length = `${EventTargetsIDEnum.cards}-`.length;
            const cardID = event.target.id.slice(length);
            const isInCart = this.model.cart?.checkProductInCart(cardID);

            if (isInCart) {
                this.model.cart?.drop(cardID);
            } else {
                this.model.cart?.addNew(cardID);
            }
            this.initViewAndListeners();
        }
    }
}
