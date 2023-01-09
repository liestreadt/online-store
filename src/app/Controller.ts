import View from './View';
import Model from './Model';
import {
    ElementsToListen,
    ElementsToValidate,
    FilterKeys,
    PageCase,
    InputValueStringLength,
    SortVariantsEnum,
    EventTargetsIDEnum,
    ViewVariantsEnum,
} from './intefaces/types';
import { DECREASE_ID_PREFIX, INCREASE_ID_PREFIX, SLIDER_MAX_ID, SLIDER_MIN_ID } from './constants/constants';

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
        const elementsToValidate: ElementsToValidate = this.view.getElementsForValidation();
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

                elementsToListen.modalWindow?.addEventListener('click', this);
                elementsToValidate.form?.addEventListener('submit', this);
                elementsToValidate.formElements.name?.addEventListener('input', this);
                elementsToValidate.formElements.number?.addEventListener('input', this);
                elementsToValidate.formElements.address?.addEventListener('input', this);
                elementsToValidate.formElements.email?.addEventListener('focusout', this);
                elementsToValidate.formElements.debitCardNumber?.addEventListener('input', this);
                elementsToValidate.formElements.debitCardExpireDate?.addEventListener('input', this);
                elementsToValidate.formElements.debitCardCode?.addEventListener('input', this);
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
                console.log('No elements to listen');
                break;
            }
        }

        elementsToValidate.formElements.name?.addEventListener('focusout', (event: Event) => {
            const input = event.target as HTMLInputElement;
            const regexName = /(^[^\s]{3,})(\s{1})([^\s]{3,})$/gi;
            if (!input.value.match(regexName)) {
                console.log('name Error');
                this.model.modelData.modalErrors.modalName = true;
                this.view.hadleModalInputError(input);
            } else {
                console.log('name Passed');
                this.model.modelData.modalErrors.modalName = false;
                this.view.hadleModalInputPassed(input);
            }
            console.log(input);
        });
        elementsToValidate.formElements.number?.addEventListener('focusout', (event: Event) => {
            const input = event.target as HTMLInputElement;
            const regexNumber = /\+(\d{9})/g;
            if (!input.value.match(regexNumber)) {
                this.model.modelData.modalErrors.modalNumber = true;
                this.view.hadleModalInputError(input);
            } else {
                this.model.modelData.modalErrors.modalNumber = false;
                this.view.hadleModalInputPassed(input);
            }
            console.log(input);
        });
        elementsToValidate.formElements.address?.addEventListener('focusout', (event: Event) => {
            const input = event.target as HTMLInputElement;
            const regexAddress = /(^[^\s]{5,})(\s{1})([^\s]{5,})(\s{1})([^\s]{5,})$/gi;
            if (!input.value.match(regexAddress)) {
                this.model.modelData.modalErrors.modalAddress = true;
                this.view.hadleModalInputError(input);
            } else {
                this.model.modelData.modalErrors.modalAddress = false;
                this.view.hadleModalInputPassed(input);
            }
            console.log(input);
        });
        elementsToValidate.formElements.debitCardNumber?.addEventListener('focusout', (event: Event) => {
            const input = event.target as HTMLInputElement;
            const regexDebitNumber = /^(\d{4}\s\d{4}\s\d{4}\s\d{4})$/g;
            if (!input.value.match(regexDebitNumber)) {
                this.model.modelData.modalErrors.modalDebitNumber = true;
                this.view.hadleModalInputError(input);
            } else {
                this.model.modelData.modalErrors.modalDebitNumber = false;
                this.view.hadleModalInputPassed(input);
            }
            console.log(input);
        });
        elementsToValidate.formElements.debitCardExpireDate?.addEventListener('focusout', (event: Event) => {
            const input = event.target as HTMLInputElement;
            const regexValidTo = /^(\d{2}\s\/\s\d{2})$/g;
            if (!input.value.match(regexValidTo)) {
                this.model.modelData.modalErrors.modalDebitValidTo = true;
                this.view.hadleModalInputError(input);
            } else {
                this.model.modelData.modalErrors.modalDebitValidTo = false;
                this.view.hadleModalInputPassed(input);
            }
            console.log(input);
        });
        elementsToValidate.formElements.debitCardCode?.addEventListener('focusout', (event: Event) => {
            const input = event.target as HTMLInputElement;
            const regexDebitNumber = /^(\d{3})$/g;
            if (!input.value.match(regexDebitNumber)) {
                this.model.modelData.modalErrors.modalDebitCode = true;
                this.view.hadleModalInputError(input);
            } else {
                this.model.modelData.modalErrors.modalDebitCode = false;
                this.view.hadleModalInputPassed(input);
            }
            console.log(input);
        });
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
            [EventTargetsIDEnum.modalWindow]: this.modalWindowEvent,

            [EventTargetsIDEnum.modalForm]: this.modalFormEvent,
            [EventTargetsIDEnum.modalName]: this.modalNameEvent,
            [EventTargetsIDEnum.modalNumber]: this.modalNumberEvent,
            [EventTargetsIDEnum.modalAddress]: this.modalAddressEvent,
            [EventTargetsIDEnum.modalEmail]: this.modalEmailEvent,
            [EventTargetsIDEnum.modalDebitNumber]: this.modalDebitNumberEvent,
            [EventTargetsIDEnum.modalDebitValidTo]: this.modalDebitValidToEvent,
            [EventTargetsIDEnum.modalDebitCode]: this.modalDebitCodeEvent,
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
    private modalWindowEvent(event: Event): void {
        const modalWindow = event.target as HTMLDivElement;
        if (modalWindow.id === EventTargetsIDEnum.modalWindow) {
            modalWindow.style.display = 'none';
        }
    }
    private modalFormEvent(event: Event): void {
        event.preventDefault();
        if (Object.values(this.model.modelData.modalErrors).includes(true)) {
            this.view.handleFormError();
        } else {
            console.log('Confirmed!');
            this.view.handleFormPassed();
        }
    }
    private modalNameEvent(event: Event): void {
        this.model.resetCart();
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[_0-9/\\?.*\-+,><{}\\[\]()!@#;:\\$%\\^&="№|`~]/g, '');
    }
    private modalNumberEvent(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^0-9\\+]/g, '');
        input.value = input.value.replace(/\+{2,}/g, '+');
    }
    private modalAddressEvent(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[_/\\?.*\-+,><{}\\[\]()!@#;:\\$%\\^&="№|`~]/g, '');
    }
    private modalEmailEvent(event: Event): void {
        const input = event.target as HTMLInputElement;
        const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (!input.value.match(regexEmail)) {
            this.model.modelData.modalErrors.modalEmail = true;
            this.view.hadleModalInputError(input);
        } else {
            this.model.modelData.modalErrors.modalEmail = false;
            this.view.hadleModalInputPassed(input);
        }
    }
    private modalDebitNumberEvent(event: Event): void {
        const input = event.target as HTMLInputElement;
        let cardCode = input.value.replace(/[^\d]/g, '').substring(0, 16);
        const cardASD = cardCode.match(/.{1,4}/g)?.join(' ');
        if (cardCode && cardASD) {
            cardCode = cardCode !== '' ? cardASD : '';
        }
        input.value = cardCode;
    }
    private modalDebitValidToEvent(event: Event): void {
        const input = event.target as HTMLInputElement;
        const inputType = (event as InputEvent).inputType;

        let debitValidToReplacedInput = input.value.replace(/[^\d]/g, '').substring(0, 4);
        const debitValidToModifiedInput = debitValidToReplacedInput.match(/.{1,2}/g)?.join(' / ');
        if (debitValidToReplacedInput && debitValidToModifiedInput) {
            debitValidToReplacedInput = debitValidToReplacedInput !== '' ? debitValidToModifiedInput : '';
        }
        input.value = debitValidToReplacedInput;

        if (input.value.length === InputValueStringLength.ONE && inputType === 'insertText') {
            input.value = input.value.replace(/[2-9]/g, '');
        }
        if (input.value.slice(0, 1) === '1' && input.value.length === 2 && inputType === 'insertText') {
            input.value = input.value.replace(/[3-9]/g, '');
        }
    }
    private modalDebitCodeEvent(event: Event): void {
        const input = event.target as HTMLInputElement;
        input.value = input.value.replace(/[^\d]/g, '');
        if (input.value.length === InputValueStringLength.FOUR) {
            input.value = input.value.slice(0, 3);
        }
    }
    private detailsImagesEvent(event: Event): void {
        if (event.target instanceof HTMLImageElement) {
            this.model.modelData.detailsMainImageSrc = event.target.src;
            this.view.handleDetailsImagesClick(event.target.src);
        }
    }
}
