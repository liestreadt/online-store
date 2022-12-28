import {
    ProductDetail,
    DummyJSON,
    FilterParamsValues,
    filterParamsKeys,
    InitialFilterValues,
    ModelData,
    ElementsToListenStore,
} from './intefaces/types';

class View {
    modelData: Partial<ModelData>;
    constructor(ModelData: Partial<ModelData>) {
        this.modelData = ModelData;
        console.log(this.modelData.allBrands);
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
        this.renderFooter();
        this.renderModal();
    }
    renderStorePage() {
        const containerMain = document.querySelector('main');
        if (containerMain) {
            containerMain.outerHTML = `
                <main class="main-store">
                    ${this.getStoreFilters()}
                    ${this.getSortingSection()}
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
    renderHeader() {
        document.body.innerHTML = `
            <header class="header">
                <a href="#!" class="header__logo">
                    <span class="header__logo-bag">
                        🛍
                    </span>
                    <h1 class="header__store-name">Online Store</h1>
                </a>
                <p class="header__total">
                    Cart total: <span class="header__total-price">€6,232.00</span>
                </p>
                <a href="#!" class="header__goods-number">10</a>
            </header>
        `;
    }
    renderMain() {
        document.body.innerHTML += `
            <main></main>
        `;
    }
    renderFooter() {
        document.body.innerHTML += `
            <footer class="footer">
                <p class="footer__year">2022</p>
                <a href="https://github.com/neemkashu" class="footer__github">neemkashu</a>
                <a href="https://github.com/liestreadt" class="footer__github">liestreadt</a>
                <a href="https://rs.school/js/" class="footer__logo"></a>
            </footer>
        `;
    }
    renderModal() {
        document.body.innerHTML += `
            <section class="modal">
                <form class="modal__window">
                    <h2 class="modal__header">Personal details</h2>
                    <div class="modal__name">
                        <input
                            type="text"
                            placeholder="Name"
                            class="modal__name-input">
                    </div>
                    <div class="modal__number">
                        <input
                            type="text"
                            placeholder="Phone number"
                            class="modal__number-input">
                    </div>
                    <div class="modal__address">
                        <input
                            type="text"
                            placeholder="Delivery address"
                            class="modal__address-input">
                    </div>
                    <div class="modal__e-mail">
                        <input
                            type="email"
                            placeholder="E-mail"
                            class="modal__e-mail-input">
                    </div>
                    <div class="modal__debit-card">
                        <h2 class="modal__header">Debit / Credit card details</h2>
                        <div class="modal__debit-card-data">
                            <div class="modal__debit-card-number">
                                <input
                                    type="text"
                                    placeholder="Enter card number"
                                    class="modal__debit-card-number-input">
                            </div>
                            <div class="modal__debit-card-other">
                                Valid to: <input class="modal__debit-card-valid-to-input">
                                CVC2 / CVV2: <input class="modal__debit-card-cvc-input">
                            </div>
                        </div>
                        <button class="modal__btn-confirm">
                            CONFIRM
                        </button>
                    </div>
                </form>
            </section>
        `;
    }
    getStoreFilters() {
        return `
            <section class="side-filter">
                <div class="side-filter__control-buttons">
                    <button class="side-filter__reset">
                        Reset Filters
                    </button>
                    <button class="side-filter__copy">
                        Copy Link
                    </button>
                </div>
                <div class="side-filter__field">
                    <h2 class="side-filter__filter-header header_small">
                        Categories
                    </h2>
                    <div class="side-filter__items-container">
                        ${this.modelData.allCategories
                            ?.map((i) => {
                                return `
                                    <div class="category-item">
                                        <input
                                            type="checkbox"
                                            id="input-${i}"
                                            class="filter-item__checkbox">
                                        <label
                                            for="input-${i}"
                                            class="filter-item__label">
                                            ${i}
                                        </label>
                                        <span class="filter-item__amount">(5/5)</span>
                                    </div>
                                `;
                            })
                            .join('')}
                    </div>
                </div>
                <div class="side-filter__field">
                    <h2 class="side-filter__filter-header header_small">
                        Brands
                    </h2>
                    <div class="side-filter__items-container">
                        ${this.modelData.allBrands
                            ?.map((i) => {
                                return `
                                    <div class="brand-item">
                                        <input
                                            type="checkbox"
                                            id="input-${i}"
                                            class="filter-item__checkbox">
                                        <label
                                            for="input-${i}"
                                            class="filter-item__label">
                                            ${i}
                                        </label>
                                        <span class="filter-item__amount">(5/5)</span>
                                    </div>
                                `;
                            })
                            .join('')}
                    </div>
                </div>
                <div class="side-filter__field">
                    <h2 class="side-filter__filter-header header_small">
                        Price
                    </h2>
                    <input
                        type="range"
                        id="input-price"
                        class="filter-item__dual-range">
                </div>
                <div class="side-filter__field">
                    <h2 class="side-filter__filter-header header_small">
                        Stock
                    </h2>
                    <input
                        type="range"
                        id="input-stock"
                        class="filter-item__dual-range">
                </div>
            </section>
        `;
    }
    getSortingSection() {
        return `
            <section class="sorting">
                <div class="sorting-header">
                    <select name="" id="sorting-menu" class="sorting__menu">
                        <option value="default-sort" class="sorting-option" selected>Sort default</option>
                        <option value="ascending-price" class="sorting-option">Sort by price (ascending)</option>
                        <option value="desending-price" class="sorting-option">Sort by price (descending)</option>
                        <option value="ascending-rating" class="sorting-option">Sort by rating (ascending)</option>
                        <option value="descending-rating" class="sorting-option">Sort by rating (descending)</option>
                    </select>
                    <div class="sorting__total-found">
                        Found: <span class="sorting__amount">${this.modelData.filteredProducts?.length}</span>
                    </div>
                    <input
                        type="text"
                        name=""
                        id="sorting-search"
                        class="sorting__search"
                        placeholder="Search product">
                    <div class="sorting__view-buttons">
                        Choose view: <button class="sorting__tiny-view">📱</button>
                        <button class="sorting__small-view">💻</button>
                    </div>
                </div>
                <div class="sorting__card-container sorting__card-container_small">
                    ${this.modelData.filteredProducts?.map((i) => this.getCard(i)).join('')}
                </div>
            </section>
        `;
    }
    getCard(obj: ProductDetail) {
        return `
            <div class="product-card">
                <h2 class="product-card__header header_small">
                    ${obj.title}
                </h2>
                <div
                    class="product-card__body"
                    style="
                        background: url('${
                            obj.images.filter((i) => i.match(/thumbnail/)).length
                                ? obj.images.filter((i) => i.match(/thumbnail/))
                                : obj.images[0]
                        }');
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;">
                    <div class="product-card__info">
                        <div class="product-card__info-item">
                            Category: <span class="product-card__category-text">${obj.category}</span>
                        </div>
                        <div class="product-card__info-item">
                            Brand: <span class="product-card__brand-text">${obj.brand}</span>
                        </div>
                        <div class="product-card__info-item">
                            Price: <span class="product-card__price-text">€${obj.price}</span>
                        </div>
                        <div class="product-card__info-item">
                            Discount: <span class="product-card__discount-text">${obj.discountPercentage} %</span>
                        </div>
                        <div class="product-card__info-item">
                            Rating: <span class="product-card__rating-text">${obj.rating}</span>
                        </div>
                        <div class="product-card__info-item">
                            Stock: <span class="product-card__stock-text">${obj.stock}</span>
                        </div>
                    </div>
                    <div class="product-card__controls">
                        <button class="product-card__btn-add-to-cart">
                            ADD TO CART
                        </button>
                        <a href="#!" class="product-card__link-to-details">
                            DETAILS
                        </a>
                    </div>
                </div>
            </div>
        `;
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
    getElementsForEvents() {
        console.log('get elements to add to listeners');
    }
}

export default View;
