import { DualSlider } from '../dual-slider/dual';
import createModal from './view-methods/store-page/create-modal';
import createFooter from './view-methods/store-page/create-footer';
import createHeader from './view-methods/store-page/create-header';
import createStoreFilters from './view-methods/store-page/create-store-filters';
import createSortingSection from './view-methods/store-page/create-sorting-section';
import createProdDetailsContainer from './view-methods/prod-detail-page/create-prod-details-container';
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
        if (!this.modelData.filteredProducts) {
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
        // skeleton for the future, when current product will be given after click on detail
        const products = this.modelData.filteredProducts;
        if (containerMain && products) {
            containerMain.outerHTML = `
                <main class="main-details">
                    ${this.getProdDetailsContainer(products[1])}
                </main>
            `;
        }
    }
    renderCartPage() {
        const containerMain = document.querySelector('main');
        const cartItems = this.modelData.cart?.products;
        if (containerMain) {
            containerMain.outerHTML = `
                <main class="main-cart">
                    ${this.getCartContainer(cartItems ?? null)}
                    ${this.getCartSummary()}
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
    getProdDetailsContainer(data: ProductDetails): string {
        return createProdDetailsContainer(data);
    }
    getCartContainer(products: Cart['products'] | null): string {
        return createCartContainer(products);
    }
    getCartSummary(): string {
        return createCartSummary();
    }
    getButtonsArray() {
        return [...document.body.querySelectorAll('button')];
    }
    copyURLtoClipboard() {
        console.log('copy url');
    }
    getElementsForEvents(): ElementsToListen {
        return {
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
        };
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
}

export default View;
