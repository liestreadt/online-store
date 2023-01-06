import { ProductDetails } from '../../intefaces/types';

export default function createProdDetailsContainer(product: ProductDetails): string {
    return `
        <section class="breadcrumbs">
            <span class="breadcrumbs__item">Store</span>
            ⇨
            <span class="breadcrumbs__item">${product.category}</span>
            ⇨
            <span class="breadcrumbs__item">${product.brand}</span>
            ⇨
            <span class="breadcrumbs__item">${product.title}</span>
        </section>
        <section class="details">
            <h2 class="details__header header_medium">
                <span class="details__header-text">${product.title}</span>
            </h2>
            <div class="details__body">
                <div class="details__aside-slides">
                    ${product.images
                        .map((item) => {
                            return `<img src="${item}" alt="macbook">`;
                        })
                        .join('')}
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
                            ${product.description}
                        </div>
                    </div>
                    <div class="details__discount details-item">
                        <h2 class="details-item__head header_small">
                            Discount Percentage:
                        </h2>
                        <div class="details__discount-text details-item__body">
                            ${product.discountPercentage} %
                        </div>
                    </div>
                    <div class="details__rating details-item">
                        <h2 class="details-item__head header_small">
                            Rating:
                        </h2>
                        <div class="details__rating-text details-item__body">
                            ${product.rating}
                        </div>
                    </div>
                    <div class="details__stock details-item">
                        <h2 class="details-item__head header_small">
                            Stock:
                        </h2>
                        <div class="details__stock-text details-item__body">
                            ${product.stock}
                        </div>
                    </div>
                    <div class="details__brand details-item">
                        <h2 class="details-item__head header_small">
                            Brand:
                        </h2>
                        <div class="details__brand-text details-item__body">
                            ${product.brand}
                        </div>
                    </div>
                    <div class="details__category details-item">
                        <h2 class="details-item__head header_small">
                            Category:
                        </h2>
                        <div class="details__category-text details-item__body">
                            ${product.category}
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
