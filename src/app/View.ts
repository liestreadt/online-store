import { DualSlider } from '../dual-slider/dual';
import createModal from './view-methods/store-page/create-modal';
import createFooter from './view-methods/store-page/create-footer';
import createHeader from './view-methods/store-page/create-header';
import createStoreFilters from './view-methods/store-page/create-store-filters';
import createSortingSection from './view-methods/store-page/create-sorting-section';
import {
    calculateImages,
    createProdDetailsContainer,
} from './view-methods/prod-detail-page/create-prod-details-container';
import createCartSummary from './view-methods/cart-page/create-cart-summary';

import {
    ProductDetails,
    DummyJSON,
    FilterParamsValues,
    filterParamsKeys,
    InitialFilterValues,
    ModelData,
    ElementsToListen,
    EventTargetsIDEnum,
    PageCase,
    FilterKeys,
} from './intefaces/types';
import createCartItem from './view-methods/cart-page/create-cart-item';
import createCartContainer from './view-methods/cart-page/create-cart-container';
import { CURRENCY_SYMBOL, SLIDER_MAX_ID, SLIDER_MIN_ID } from './constants/constants';
import { checkSearchFocused } from './tools/Functions';
import Cart from './Cart';

class View {
    modelData: Partial<ModelData>;
    constructor(ModelData: Partial<ModelData>) {
        this.modelData = ModelData;
        this.renderPage();
    }
    renderPage() {
        if (document.readyState !== 'complete') {
            //TODO: if no product is sutable for filters, show empty sorting area
            this.renderLoadingPage();
        } else {
            this.renderHeader();
            this.renderMain();
            switch (this.modelData.page) {
                case PageCase.store:
                    {
                        this.renderStorePage();
                        this.getDualSlider();
                    }
                    break;
                case PageCase.details:
                    {
                        this.renderProdDetailsPage();
                        const asd = this.modelData.filteredProducts?.find(
                            (item) => item.id === this.modelData.detailsID
                        );
                        if (asd) {
                            calculateImages(asd).then((data) => {
                                console.log(data);
                                this.renderImages(data);
                            });
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

    renderImages(data: string[]) {
        const cont = document.querySelector('#details-images');
        if (cont) {
            cont.innerHTML += `
                ${data
                    .map((item) => {
                        return `<img src="${item}" alt="title">`;
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
                    ${this.modelData.cart && this.getCartSummary(this.modelData.cart)}
                </main>
            `;
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
        document.body.innerHTML += createModal();
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
        return createProdDetailsContainer(data, mainImageSrc);
    }
    getCartContainer(cart: Cart | null): string {
        return createCartContainer(cart);
    }
    getCartSummary(cart: Cart): string {
        return createCartSummary(cart);
    }
    getButtonsArray() {
        return [...document.body.querySelectorAll('button')];
    }
    copyURLtoClipboard() {
        console.log('copy url');
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
                cards: document.body.querySelector(`#${EventTargetsIDEnum.cards}`),
            },
            cart: {
                pageBack: document.querySelector(`#${EventTargetsIDEnum.PAGE_BACK}`),
                pageForward: document.querySelector(`#${EventTargetsIDEnum.PAGE_FORWARD}`),
                listLimit: document.querySelector(`#${EventTargetsIDEnum.LIST_LIMIT}`),
                cartList: document.querySelector(`#${EventTargetsIDEnum.CART_LIST}`),
                promoInput: document.querySelector(`#${EventTargetsIDEnum.PROMO}`),
                buyButton: document.querySelector(`#${EventTargetsIDEnum.BUY}`),
            },
            details: {
                images: document.body.querySelector('.details__aside-slides'),
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
        const mainImg = document.body.querySelector('.details__main-picture') as HTMLDivElement;
        if (mainImg) {
            mainImg.setAttribute(
                'style',
                `
                background: url('${imageSource}');
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
            `
            );
        }
    }
}

export default View;
