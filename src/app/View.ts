import { DualSlider } from '../dual-slider/dual';
import createModal from './view-methods/store-page/create-modal';
import createFooter from './view-methods/store-page/create-footer';
import createHeader from './view-methods/store-page/create-header';
import createStoreFilters from './view-methods/store-page/create-store-filters';
import createSortingSection from './view-methods/store-page/create-sorting-section';
import { createProdDetailsContainer } from './view-methods/prod-detail-page/create-prod-details-container';
import createCartSummary from './view-methods/cart-page/create-cart-summary';
import createCartItem from './view-methods/cart-page/create-cart-item';
import createCartContainer from './view-methods/cart-page/create-cart-container';
import { calculateImages } from './tools/helpers';

import {
    ProductDetails,
    DummyJSON,
    FilterParamsValues,
    filterParamsKeys,
    InitialFilterValues,
    ModelData,
    ElementsToListen,
    ElementsToValidate,
    EventTargetsIDEnum,
    PageCase,
    FilterKeys,
} from './intefaces/types';
import { CURRENCY_SYMBOL, SLIDER_MAX_ID, SLIDER_MIN_ID } from './constants/constants';
import { checkSearchFocused } from './tools/helpers';
import Cart from './Cart';
import { SummaryUpdater } from './view-methods/cart-page/SummaryUpdater';

class View {
    modelData: Partial<ModelData>;
    summaryUpdater: SummaryUpdater;
    constructor(ModelData: Partial<ModelData>) {
        this.modelData = ModelData;
        this.summaryUpdater = new SummaryUpdater(this.modelData.promo ?? null, this.modelData.cart ?? null);
        this.renderPage();
    }
    renderPage() {
        if (document.readyState !== 'complete') {
            this.renderLoadingPage();
        } else {
            this.renderHeader();
            this.renderMain();
            let inputField: EventTargetsIDEnum | null = null;
            switch (this.modelData.page) {
                case PageCase.store:
                    {
                        this.renderStorePage();
                        this.getDualSlider();
                        inputField = EventTargetsIDEnum.searching;
                    }
                    break;
                case PageCase.details:
                    {
                        this.renderProdDetailsPage();
                        const currentProduct = this.modelData.filteredProducts?.find(
                            (item) => item.id === this.modelData.detailsID
                        );
                        if (currentProduct) {
                            if (!currentProduct.isImagesUnique) {
                                calculateImages(currentProduct).then(() => {
                                    this.renderImages(currentProduct.images, currentProduct.title);
                                });
                            } else {
                                this.renderImages(currentProduct.images, currentProduct.title);
                            }
                        }
                    }
                    break;
                case PageCase.cart:
                    {
                        this.renderCartPage();
                    }
                    break;
                case PageCase.error:
                    {
                        console.log('DRAW ERROR PAGE');
                    }
                    break;
                default:
                    {
                        this.renderStorePage();
                        this.getDualSlider();
                    }
                    break;
            }
            this.renderFooter();
            this.renderModal();
            this.addFocusToLastUsed();
        }
    }

    renderImages(data: string[], title: string) {
        const imagesContainer = document.querySelector('#details-images');
        if (imagesContainer) {
            imagesContainer.innerHTML = `
                ${data
                    .map((item) => {
                        return `<img src="${item}" alt="${title}">`;
                    })
                    .join('')}
            `;
        }
    }

    renderLoadingPage() {
        document.body.innerHTML = `
            <main class="main-loading">
                <h1 class="loading">Loading</h1>
                <div class="loading__spinner"></div>
            </main>
        `;
    }
    renderStorePage() {
        const containerMain = document.querySelector('main');
        if (containerMain) {
            containerMain.outerHTML = `
                <main class="main-store">
                    ${this.getStoreFilters(this.modelData)}
                    ${this.getSortingSection(this.modelData)}
                </main>
            `;
        }
    }
    renderProdDetailsPage() {
        const containerMain = document.querySelector('main');
        const currentProduct = this.modelData.filteredProducts?.find((item) => item.id === this.modelData.detailsID);
        const mainImageSrc = this.modelData.detailsMainImageSrc;
        if (containerMain && currentProduct && mainImageSrc) {
            containerMain.outerHTML = `
                <main class="main-details">
                    ${this.getProdDetailsContainer(currentProduct, mainImageSrc)}
                </main>
            `;
        }
    }
    renderCartPage() {
        const containerMain = document.querySelector('main');

        if (containerMain) {
            containerMain.outerHTML = `
                <main class="main-cart">
                    ${this.getCartContainer(this.modelData.cart ?? null)}
                    ${this.modelData.cart && this.getCartSummary(this.modelData)}
                </main>
            `;
            this.summaryUpdater.updateFieldsAndListeners();
        }
    }
    renderMain() {
        document.body.innerHTML += `<main></main>`;
    }
    renderHeader() {
        document.body.innerHTML = createHeader(this.modelData);
    }
    renderFooter() {
        document.body.innerHTML += createFooter();
    }
    renderModal() {
        const modalDisplayStatus = this.modelData.modalDisplayStatus;
        if (modalDisplayStatus) {
            document.body.innerHTML += createModal(modalDisplayStatus);
        }
    }

    getStoreFilters(data: Partial<ModelData>): string {
        return createStoreFilters(data);
    }
    getSortingSection(data: Partial<ModelData>) {
        return createSortingSection(data);
    }
    getDualSlider() {
        const sliderContainerPrice = document.querySelector(`#${EventTargetsIDEnum.price}`) as HTMLElement;
        const sliderContainerStock = document.querySelector(`#${EventTargetsIDEnum.stock}`) as HTMLElement;

        const minPrice = this.modelData.initialFilterValues?.minPrice || 0;
        const minUserPrice = this.modelData.shownProductInfo?.minPrice || 0;
        const maxPrice = this.modelData.initialFilterValues?.maxPrice || Infinity;
        const maxUserPrice = this.modelData.shownProductInfo?.maxPrice || Infinity;

        const minStock = this.modelData.initialFilterValues?.minStock || 0;
        const minUserStock = this.modelData.shownProductInfo?.minStock || 0;
        const maxStock = this.modelData.initialFilterValues?.maxStock || Infinity;
        const maxUserStock = this.modelData.shownProductInfo?.maxStock || Infinity;

        const dualSliderPrice = new DualSlider(minPrice, maxPrice, minUserPrice, maxUserPrice, CURRENCY_SYMBOL);
        const dualSliderStock = new DualSlider(minStock, maxStock, minUserStock, maxUserStock);
        if (sliderContainerPrice) dualSliderPrice.insertSlider(sliderContainerPrice);
        if (sliderContainerStock) dualSliderStock.insertSlider(sliderContainerStock);
    }
    getProdDetailsContainer(data: ProductDetails, mainImageSrc: string): string {
        return createProdDetailsContainer(
            data,
            mainImageSrc,
            this.modelData.cart?.checkProductInCart(`${data.id}`) ?? false
        );
    }
    getCartContainer(cart: Cart | null): string {
        return createCartContainer(cart);
    }
    getCartSummary(modelData: Partial<ModelData>): string {
        return createCartSummary(modelData);
    }
    getButtonsArray() {
        return [...document.body.querySelectorAll('button')];
    }
    getElementsForValidation(): ElementsToValidate {
        return {
            form: document.body.querySelector(`#${EventTargetsIDEnum.modalForm}`),
            formElements: {
                name: document.body.querySelector(`#${EventTargetsIDEnum.modalName}`),
                number: document.body.querySelector(`#${EventTargetsIDEnum.modalNumber}`),
                address: document.body.querySelector(`#${EventTargetsIDEnum.modalAddress}`),
                email: document.body.querySelector(`#${EventTargetsIDEnum.modalEmail}`),
                debitCardNumber: document.body.querySelector(`#${EventTargetsIDEnum.modalDebitNumber}`),
                debitCardExpireDate: document.body.querySelector(`#${EventTargetsIDEnum.modalDebitValidTo}`),
                debitCardCode: document.body.querySelector(`#${EventTargetsIDEnum.modalDebitCode}`),
            },
        };
    }
    getElementsForEvents(): ElementsToListen {
        const elements: ElementsToListen = {
            store: {
                reset: document.body.querySelector(`#${EventTargetsIDEnum.reset}`),
                copy: document.body.querySelector(`#${EventTargetsIDEnum.copy}`),
                category: document.querySelector(`#${EventTargetsIDEnum.category}`),
                brand: document.querySelector(`#${EventTargetsIDEnum.brand}`),
                price: document.querySelector(`#${EventTargetsIDEnum.price}`),
                stock: document.querySelector(`#${EventTargetsIDEnum.stock}`),
                sorting: document.body.querySelector(`#${EventTargetsIDEnum.sorting}`),
                searching: document.body.querySelector(`#${EventTargetsIDEnum.searching}`),
                viewButtons: document.body.querySelector(`#${EventTargetsIDEnum.viewButtons}`),
                modalWindow: document.body.querySelector(`#${EventTargetsIDEnum.modalWindow}`),
                cards: document.body.querySelector(`#${EventTargetsIDEnum.cards}`),
            },
            cart: {
                pageBack: document.querySelector(`#${EventTargetsIDEnum.PAGE_BACK}`),
                pageForward: document.querySelector(`#${EventTargetsIDEnum.PAGE_FORWARD}`),
                listLimit: document.querySelector(`#${EventTargetsIDEnum.LIST_LIMIT}`),
                cartList: document.querySelector(`#${EventTargetsIDEnum.CART_LIST}`),
                promoInput: document.querySelector(`#${EventTargetsIDEnum.PROMO}`),
                buyButton: document.querySelector(`#${EventTargetsIDEnum.BUY}`),
                modalWindow: document.body.querySelector(`#${EventTargetsIDEnum.modalWindow}`),
            },
            details: {
                images: document.body.querySelector('.details__aside-slides'),
                detailsAddToCart: document.body.querySelector(`#${EventTargetsIDEnum.detailsAddToCart}`),
                buyButton: document.querySelector(`#${EventTargetsIDEnum.BUY}`),
                modalWindow: document.body.querySelector(`#${EventTargetsIDEnum.modalWindow}`),
            },
        };
        return elements;
    }
    addFocusToLastUsed() {
        const searchField = document.querySelector(`#${EventTargetsIDEnum.searching}`);
        const isSearchFocused = checkSearchFocused();

        if (isSearchFocused && searchField instanceof HTMLInputElement) {
            const textLength = searchField.value.length;
            searchField.focus();
            searchField.setSelectionRange(textLength, textLength);
        }
    }
    handleDetailsImagesClick(imageSource: string): void {
        const mainImg = document.body.querySelector('#details-main-image') as HTMLImageElement;
        if (mainImg) {
            mainImg.setAttribute('src', `${imageSource}`);
        }
    }
    handleCopyLinkClick(button: HTMLButtonElement) {
        button.innerText = 'Copied!';
        button.style.backgroundColor = 'rgba(246, 227, 255, 0.9)';
        setTimeout(() => {
            button.innerText = 'Copy Link';
            button.style.backgroundColor = 'rgb(164, 164, 245)';
        }, 1000);
    }
    hadleModalInputError(input: HTMLInputElement) {
        input.classList.add('error');
        const inputErrorMessage = input.parentNode?.querySelector('.input-error-message') as HTMLDivElement;
        inputErrorMessage.style.display = 'flex';
    }
    hadleModalInputPassed(input: HTMLInputElement) {
        input.classList.remove('error');
        const inputErrorMessage = input.parentNode?.querySelector('.input-error-message') as HTMLDivElement;
        inputErrorMessage.style.display = 'none';
    }
    toggleModalErrorMessage(display: string) {
        const formErrorMessage = document.body.querySelector('#modal-error-message') as HTMLDivElement;
        if (formErrorMessage) {
            formErrorMessage.style.display = `${display}`;
        }
    }
    handleFormError() {
        this.toggleModalErrorMessage('block');
        const modalErrors = this.modelData.modalErrors;
        for (const key in modalErrors) {
            if (modalErrors[key as keyof typeof modalErrors]) {
                const currentInput = document.body.querySelector(`#${key}`) as HTMLInputElement;
                this.hadleModalInputError(currentInput);
            }
        }
    }
    handleFormPassed() {
        this.toggleModalErrorMessage('none');
        const modalWindow = document.body.querySelector(`#${EventTargetsIDEnum.modalWindow}`) as HTMLDivElement;
        modalWindow.innerHTML = `
            <div class="modal__confirmed-window">
                Thanks for order. You will be redirected to main page in 3 seconds.
            </div>
        `;
    }
}

export default View;
