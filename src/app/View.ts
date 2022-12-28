import { DualSlider } from '../dual-slider/dual';
import createSortingSection from './view-methods/createSortingSection';
import createModal from './view-methods/createModal';
import createFooter from './view-methods/createFooter';
import createHeader from './view-methods/createHeader';
import createStoreFilters from './view-methods/createStoreFilters';

import {
    ProductDetail,
    DummyJSON,
    FilterParamsValues,
    filterParamsKeys,
    InitialFilterValues,
    ModelData,
    ElementsToListen,
    EventTargetsIDEnum,
} from './intefaces/types';

class View {
    modelData: Partial<ModelData>;
    constructor(ModelData: Partial<ModelData>) {
        this.modelData = ModelData;
        this.renderPage();
    }
    renderPage() {
        this.renderHeader();
        this.renderMain();
        switch (this.modelData.page) {
            case 'store':
                {
                    this.renderStorePage();
                }
                break;
            case 'details':
                {
                    this.renderProdDetailsPage();
                }
                break;
            case 'cart':
                {
                    this.renderCartPage();
                }
                break;
            default:
                {
                    this.renderStorePage();
                }
                break;
        }
        this.getDualSlider();
        this.renderFooter();
        this.renderModal();
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
        if (containerMain) {
            containerMain.outerHTML = `
                <main class="main-details">
                    ${this.getProdDetailsContainer()}
                </main>
            `;
        }
    }
    renderCartPage() {
        const containerMain = document.querySelector('main');
        if (containerMain) {
            containerMain.outerHTML = `
                <main class="main-cart">
                    ${this.getCartContainer()}
                    ${this.getCartSummary()}
                </main>
            `;
        }
    }
    renderMain() {
        document.body.innerHTML += `<main></main>`;
    }
    renderHeader() {
        document.body.innerHTML = createHeader();
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
        const dualSliderPrice = new DualSlider(0, 500);
        const dualSliderStock = new DualSlider(0, 500);
        if (sliderContainerPrice) dualSliderPrice.insertSlider(sliderContainerPrice);
        if (sliderContainerStock) dualSliderStock.insertSlider(sliderContainerStock);
    }
    getProdDetailsContainer(
        obj: ProductDetail = {
            id: 1,
            title: 'title',
            description: 'desc',
            price: 123,
            discountPercentage: 15,
            brand: 'brand',
            category: 'category',
            images: ['asd', 'sda'],
            rating: 4.5,
            stock: 55,
        }
    ) {
        return `
            <section class="breadcrumbs">
                <span class="breadcrumbs__item">Store</span>
                ⇨
                <span class="breadcrumbs__item">${obj.category}</span>
                ⇨
                <span class="breadcrumbs__item">${obj.brand}</span>
                ⇨
                <span class="breadcrumbs__item">${obj.title}</span>
            </section>
            <section class="details">
                <h2 class="details__header header_medium">
                    <span class="details__header-text">${obj.title}</span>
                </h2>
                <div class="details__body">
                    <div class="details__aside-slides">
                        <img src="https://i.dummyjson.com/data/products/6/1.png" alt="macbook_id">
                        <img src="https://i.dummyjson.com/data/products/6/2.jpg" alt="macbook_id">
                        <img src="https://i.dummyjson.com/data/products/6/3.png" alt="macbook_id">
                        <img src="https://i.dummyjson.com/data/products/6/4.jpg" alt="macbook_id">
                    </div>
                    <div class="details__main-picture">
                        <img src="https://i.dummyjson.com/data/products/6/3.png" alt="macbook_id">
                    </div>
                    <div class="details__info">
                        <div class="details__description details-item">
                            <h2 class="details-item__head header_small">
                                Description:
                            </h2>
                            <div class="details__description-text details-item__body">
                                ${obj.description}
                            </div>
                        </div>
                        <div class="details__discount details-item">
                            <h2 class="details-item__head header_small">
                                Discount Percentage:
                            </h2>
                            <div class="details__discount-text details-item__body">
                                ${obj.discountPercentage} %
                            </div>
                        </div>
                        <div class="details__rating details-item">
                            <h2 class="details-item__head header_small">
                                Rating:
                            </h2>
                            <div class="details__rating-text details-item__body">
                                ${obj.rating}
                            </div>
                        </div>
                        <div class="details__stock details-item">
                            <h2 class="details-item__head header_small">
                                Stock:
                            </h2>
                            <div class="details__stock-text details-item__body">
                                ${obj.stock}
                            </div>
                        </div>
                        <div class="details__brand details-item">
                            <h2 class="details-item__head header_small">
                                Brand:
                            </h2>
                            <div class="details__brand-text details-item__body">
                                ${obj.brand}
                            </div>
                        </div>
                        <div class="details__category details-item">
                            <h2 class="details-item__head header_small">
                                Category:
                            </h2>
                            <div class="details__category-text details-item__body">
                                ${obj.category}
                            </div>
                        </div>
                    </div>
                    <div class="details__controls">
                        <div class="details__price">
                            Price: <span class="details__price-text">€1565</span>
                        </div>
                        <button class="details__btn-add-to-cart">
                            Add to cart
                        </button>
                        <button class="details__btn-buy-now">
                            Buy Now
                        </button>
                    </div>
                </div>
            </section>
        `;
    }
    getCartContainer() {
        return `
            <section class="cart">
                <h2 class="cart__header header_medium">
                    <div class="cart__title">
                        Products In Cart
                    </div>
                    <div class="cart__amount">
                        Items in cart: <span class="cart__amount-num">2</span>
                    </div>
                    <div class="cart__pagination">
                        <div class="pagination-text">
                            Page:
                        </div>
                        <a class="pagination-left">
                            ←
                        </a>
                        <div class="pagination-current">
                            1
                        </div>
                        <a class="pagination-right">
                            →
                        </a>
                    </div>
                </h2>
                <div class="cart__list">
                    ${this.getCartItem()}
                </div>
            </section>
        `;
    }
    getCartItem(
        obj: ProductDetail = {
            id: 1,
            title: 'title',
            description: 'desc',
            price: 123,
            discountPercentage: 15,
            brand: 'brand',
            category: 'category',
            images: ['asd', 'sda'],
            rating: 4.5,
            stock: 55,
        }
    ) {
        return `
            <div class="cart-item">
                <div class="cart-item__num">
                    1
                </div>
                <div class="cart-item__pic">
                    img
                </div>
                <div class="cart-item__info">
                    <div class="cart-item__title">
                        ${obj.title}
                    </div>
                    <div class="cart-item__description">
                        ${obj.description}
                    </div>
                    <div class="cart-item__metrics">
                        <span class="cart-item__rating">Rating: ${obj.rating}</span>
                        <span class="cart-item__discount">Discount: ${obj.discountPercentage}%</span>
                    </div>
                </div>
                <div class="cart-item__manage">
                    <div class="cart-item__amount">
                        Stock: <span class="amount-in-stock">${obj.stock}</span>
                    </div>
                    <div class="cart-item__controls">
                        <button class="controls-increase">
                            +
                        </button>
                        <div class="controls-count">
                            5
                        </div>
                        <button class="controls-decrease">
                            -
                        </button>
                    </div>
                    <div class="cart-item__price">
                        €46.00
                    </div>
                </div>
            </div>
        `;
    }
    getCartSummary() {
        return `
            <sidebar class="summary">
                <h2 class="summary__header">
                    Summary
                </h2>
                <div class="summary__body">
                    <div class="summary__left-side">
                        <div class="summary__amount">
                            Products in your cart: <span class="summary__prod-amount">3</span>
                        </div>
                        <div class="summary__total">
                            Total price: €<span class="summary__total-price">540</span>
                        </div>
                    </div>
                    <div class="summary__right-side">
                        <div class="summary__promo">
                            <input
                                type="search"
                                placeholder="Enter promo code"
                                class="summary__promo-input"
                            >
                        </div>
                        <div class="summary__example">
                            Test promo-codes: "RSS", "EPAM"
                        </div>
                    </div>
                    <button class="summary__btn-buy">
                        Buy Now
                    </button>
                </div>
            </sidebar>
        `;
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
            },
        };
    }
}

export default View;
