import { ProductDetail } from '../../intefaces/types';

export default function createSroreCard(obj: ProductDetail) {
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
