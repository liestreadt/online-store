import View from './View';
import Model from './Model';
import { ElementsToListen, ElementsToValidate, FilterKeys, sortVariantsEnum } from './intefaces/types';
import { EventTargetsIDEnum } from './intefaces/types';
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
        // this.addListenersToModalElems();
    }
    addListeners(): void {
        window.addEventListener('hashchange', this);
        //window.addEventListener('popstate', this);

        switch (this.model.modelData.page) {
            default:
                {
                    //type Keys = keyof ElementsToListenStore;
                    //type Values = ElementsToListenStore[Keys];
                    //const elementsToListen: Values = this.view.getElementsForEvents();
                    const elementsToListen: ElementsToListen['store'] = this.view.getElementsForEvents().store;
                    const elementsToValidate: ElementsToValidate = this.view.getElementsForValidation();

                    elementsToListen.reset?.addEventListener('click', this);
                    elementsToListen.copy?.addEventListener('click', this);
                    elementsToListen.category?.addEventListener('click', this);
                    elementsToListen.brand?.addEventListener('click', this);
                    elementsToListen.price?.addEventListener('change', this);
                    elementsToListen.stock?.addEventListener('change', this);
                    elementsToListen.sorting?.addEventListener('change', this);
                    elementsToListen.searching?.addEventListener('input', this);
                    elementsToListen.viewButtons?.addEventListener('click', this);

                    elementsToValidate.form?.addEventListener('submit', this);
                    elementsToValidate.formElements.name?.addEventListener('input', this);
                    elementsToValidate.formElements.number?.addEventListener('input', this);
                    elementsToValidate.formElements.address?.addEventListener('input', this);
                    elementsToValidate.formElements.email?.addEventListener('input', this);
                    elementsToValidate.formElements.debitCardNumber?.addEventListener('input', this);
                    elementsToValidate.formElements.debitCardExpireDate?.addEventListener('input', this);
                    elementsToValidate.formElements.debitCardCode?.addEventListener('input', this);
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

            [EventTargetsIDEnum.modalForm]: this.modalFormEvent,
            [EventTargetsIDEnum.modalName]: this.modalNameEvent,
            [EventTargetsIDEnum.modalNumber]: this.modalNumberEvent,
            [EventTargetsIDEnum.modalAddress]: this.modalAddressEvent,
            [EventTargetsIDEnum.modalEmail]: this.modalEmailEvent,
            [EventTargetsIDEnum.modalDebitNumber]: this.modalDebitNumberEvent,
            [EventTargetsIDEnum.modalDebitValidTo]: this.modalDebitValidToEvent,
            [EventTargetsIDEnum.modalDebitCode]: this.modalDebitCodeEvent,
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
        if (event.target instanceof HTMLOptionElement) {
            const key = 'sorting' as FilterKeys;
            this.model.createQueryParamFromEvent(key, event.target?.value);
            this.model.applyQueryParam();
            this.model.sortProducts(event.target?.value as sortVariantsEnum);
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
    private modalFormEvent(event: Event) {
        event.preventDefault();
        if (Object.values(this.model.modelData.modalErrors).includes(true)) {
            console.log('Please fill the fields correctly');
            console.log(Object.values(this.model.modelData.modalErrors));
            this.view.handleFormError();
        } else {
            console.log('Confirmed!');
            this.view.handleFormPassed();
        }
    }
    private modalNameEvent(event: Event) {
        const input = event.target as HTMLInputElement;
        const regexName = /(^[^\s]{3,})(\s{1})([^\s]{3,})$/gi;
        input.value = input.value.replace(/[_0-9/\\?.*\-+,><{}\\[\]()!@#;:\\$%\\^&="№|`~]/g, '');
        if (!input.value.match(regexName)) {
            console.log('name Error');
            this.model.modelData.modalErrors.name = true;
            this.view.hadleModalInputError(input);
        } else {
            console.log('name Passed');
            this.model.modelData.modalErrors.name = false;
            this.view.hadleModalInputPassed(input);
        }
    }
    private modalNumberEvent(event: Event) {
        const input = event.target as HTMLInputElement;
        const regexNumber = /\+(\d{9})/g;
        input.value = input.value.replace(/[^0-9\\+]/g, '');
        input.value = input.value.replace(/\+{2,}/g, '+');
        if (!input.value.match(regexNumber)) {
            console.log('number Error');
            this.model.modelData.modalErrors.number = true;
            this.view.hadleModalInputError(input);
        } else {
            console.log('number Passed');
            this.model.modelData.modalErrors.number = false;
            this.view.hadleModalInputPassed(input);
        }
    }
    private modalAddressEvent(event: Event) {
        const input = event.target as HTMLInputElement;
        const regexAddress = /(^[^\s]{5,})(\s{1})([^\s]{5,})(\s{1})([^\s]{5,})$/gi;
        input.value = input.value.replace(/[_0-9/\\?.*\-+,><{}\\[\]()!@#;:\\$%\\^&="№|`~]/g, '');
        if (!input.value.match(regexAddress)) {
            console.log('name Error');
            this.model.modelData.modalErrors.address = true;
            this.view.hadleModalInputError(input);
        } else {
            console.log('adress Passed');
            this.model.modelData.modalErrors.address = false;
            this.view.hadleModalInputPassed(input);
        }
    }
    private modalEmailEvent(event: Event) {
        const input = event.target as HTMLInputElement;
        const regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (!input.value.match(regexEmail)) {
            console.log('email error');
            this.model.modelData.modalErrors.email = true;
            this.view.hadleModalInputError(input);
        } else {
            console.log('email Passed');
            this.model.modelData.modalErrors.email = false;
            this.view.hadleModalInputPassed(input);
        }
    }
    private modalDebitNumberEvent(event: Event) {
        const input = event.target as HTMLInputElement;
        const regexDebitNumber = /^(\d{16})$/g;
        input.value = input.value.replace(/[^0-9]/g, '');
        if (!input.value.match(regexDebitNumber)) {
            console.log('debitNumber Error');
            this.model.modelData.modalErrors.debitNumber = true;
            this.view.hadleModalInputError(input);
        } else {
            console.log('debitNumber Passed');
            this.model.modelData.modalErrors.debitNumber = false;
            this.view.hadleModalInputPassed(input);
        }
    }
    private modalDebitValidToEvent(event: Event) {
        const input = event.target as HTMLInputElement;
        const inputType = (event as InputEvent).inputType;
        input.value = input.value.replace(/[^\d\\/]/g, '');
        // input.value = input.value.replace(/^([0-9]{2})$/g, `${input.value} / `);
        const regexDebitValidTo = /^[0-9]{2}$/g;
        console.log(event);
        console.log('value', input.value);
        console.log('length', input.value.length);
        console.log('last', input.value.at(-1));
        if (input.value.length === 2 && inputType === 'insertText') {
            input.value += '/';
            console.log('ValidTo Error');
        }
        if (input.value.length === 3 && inputType === 'deleteContentBackward') {
            input.value.slice(-1);
        }
    }
    private modalDebitCodeEvent(event: Event) {
        const input = event.target as HTMLInputElement;
        const regexDebitNumber = /^(\d{3})$/g;
        input.value = input.value.replace(/[^0-9]/g, '');
        if (!input.value.match(regexDebitNumber)) {
            console.log('debitCode Error');
            this.model.modelData.modalErrors.debitCode = true;
            this.view.hadleModalInputError(input);
        } else {
            console.log('debitCode Passed');
            this.model.modelData.modalErrors.debitCode = false;
            this.view.hadleModalInputPassed(input);
        }
    }

    // private addListenersToModalElems() {
    //     this.view.getElementsForValidation().formElements.name?.addEventListener('focusout', (event) => {
    //         const regexName = /(\w{3,})(\s{1,})(\w{3,})/g;
    //         const input = event.target as HTMLInputElement;
    //         if (!input.value.match(regexName)) {
    //             console.log('valid Error');
    //         }
    //     });
    //     this.view.getElementsForValidation().formElements.number?.addEventListener('focusout', (event) => {
    //         const regexName = /\+(\d{9})/g;
    //         const input = event.target as HTMLInputElement;
    //         if (!input.value.match(regexName)) {
    //             console.log('valid Error');
    //         }
    //     });
    // }
}
