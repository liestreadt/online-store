import View from './View';
import Model from './Model';
import {
    ElementsToListen,
    FilterKeys,
    PageCase,
    SortVariantsEnum,
    EventTargetsIDEnum,
    ViewVariantsEnum,
    filterParamsKeys,
} from './intefaces/types';
import {
    DECREASE_ID_PREFIX,
    INCREASE_ID_PREFIX,
    PAGES_HASH,
    SLIDER_MAX_ID,
    SLIDER_MIN_ID,
} from './constants/constants';

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
                elementsToListen.promoInput?.addEventListener('input', this);
                elementsToListen.buyButton?.addEventListener('click', this);
                break;
            }
            case PageCase.details: {
                const elementsToListen: ElementsToListen['details'] = this.view.getElementsForEvents().details;
                elementsToListen.images?.addEventListener('click', this);
                elementsToListen.detailsAddToCart?.addEventListener('click', this);
                break;
            }
            default: {
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
            [EventTargetsIDEnum.detailsAddToCart]: this.detailsAddToCartEvent,

            [EventTargetsIDEnum.PAGE_BACK]: this.pageBackEvent,
            [EventTargetsIDEnum.PAGE_FORWARD]: this.pageForwardEvent,
            [EventTargetsIDEnum.LIST_LIMIT]: this.listLimitEvent,
            [EventTargetsIDEnum.CART_LIST]: this.cartListEvent,
            [EventTargetsIDEnum.PROMO]: this.promoInputEvent,
            [EventTargetsIDEnum.BUY]: this.buyButtonEvent,
            [EventTargetsIDEnum.detailsImages]: this.detailsImagesEvent,
        };
        if (event.type === 'hashchange' || event.type === 'popstate') {
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
    pageBackEvent(event: Event) {
        const changeBy = -1;
        this.handlePageEvent(event, changeBy);
    }
    pageForwardEvent(event: Event) {
        const changeBy = 1;
        this.handlePageEvent(event, changeBy);
    }
    handlePageEvent(event: Event, pageChange: number) {
        if (event.target instanceof HTMLElement && this.model.cart) {
            const value = this.model.cart.showProperties.listPage + pageChange;
            this.model.createQueryParamFromEvent('cartListPage', `${value}`);
            this.initViewAndListeners();
        }
    }
    listLimitEvent(event: Event) {
        if (event.target instanceof HTMLInputElement) {
            const newLimit = event.target.value;
            this.model.createQueryParamFromEvent('cartListLimit', newLimit);
            this.initViewAndListeners();
        }
    }
    cartListEvent(event: Event) {
        if (event.target instanceof HTMLButtonElement) {
            const buttonID = event.target.id;
            const lengthIncrease = INCREASE_ID_PREFIX.length;
            const lengthDecrease = INCREASE_ID_PREFIX.length;

            if (buttonID.slice(0, lengthIncrease) === INCREASE_ID_PREFIX) {
                const productID = buttonID.slice(lengthIncrease);
                this.model.cart?.increaseAmount(productID);
                this.model.applyQueryParamsToCart();
            }
            if (buttonID.slice(0, lengthDecrease) === DECREASE_ID_PREFIX) {
                const productID = buttonID.slice(lengthDecrease);
                this.model.cart?.decreaseAmount(productID);
                this.model.applyQueryParamsToCart();
            }
            this.initViewAndListeners();
        }
    }
    promoInputEvent() {
        console.log('promoInputEvent!');
    }
    buyButtonEvent() {
        console.log('buyButtonEvent!');
    }
    private resetEvent(event: Event): void {
        this.model.resetAllParams();
        this.initViewAndListeners();
    }
    private copyEvent(event: Event): void {
        const copyButton = event.target as HTMLButtonElement;
        this.model.copyParams();
        this.view.handleCopyLinkClick(copyButton);
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
        const isValidEventTarget =
            event.target instanceof HTMLButtonElement && event.target.id !== this.model.modelData.currentView;

        if (isValidEventTarget) {
            const viewID = event.target.id;
            const key = 'view';
            this.model.handleViewChange(viewID === ViewVariantsEnum.BIG ? ViewVariantsEnum.BIG : ViewVariantsEnum.BIG);
            this.model.createQueryParamFromEvent(key, viewID);
            this.initViewAndListeners();
        }
    }
    private addToCartEvent(event: Event): void {
        if (event.target instanceof HTMLButtonElement) {
            const length = `${EventTargetsIDEnum.cards}-`.length;
            const cardID = event.target.id.slice(length);
            this.model.cart?.toggleProductInCart(cardID);
            this.initViewAndListeners();
        }
    }
    private detailsAddToCartEvent(event: Event): void {
        if (event.target instanceof HTMLButtonElement) {
            const cardID = this.model.modelData.detailsID;
            this.model.cart?.toggleProductInCart(`${cardID}`);
            this.initViewAndListeners();
        }
    }
    private detailsImagesEvent(event: Event): void {
        if (event.target instanceof HTMLImageElement) {
            this.model.modelData.detailsMainImageSrc = event.target.src;
            this.view.handleDetailsImagesClick(event.target.src);
        }
    }
}
