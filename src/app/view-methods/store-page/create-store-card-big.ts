import { CAPTION_ADD, CAPTION_DROP, PAGES_HASH } from '../../constants/constants';
import { EventTargetsIDEnum, ModelData, ProductDetails } from '../../intefaces/types';

function getCapture(isInCart: boolean): string {
    return isInCart ? CAPTION_DROP.toUpperCase() : CAPTION_ADD.toUpperCase();
}
function getColorModifier(isInCart: boolean): string {
    return isInCart ? 'product-card__btn_added' : '';
}
function getBorderModifier(isInCart: boolean) {
    return isInCart ? 'product-card_added' : '';
}

export default function createStoreCardBig(product: ProductDetails, isInCart: boolean): string {
    return `
        <div class="product-card_big ${getBorderModifier(isInCart)}">
            <h2 class="product-card__header header_small">
                ${product.title}
            </h2>
            <div class="product-card__body">
                <div
                    class="product-card__image"
                    style="
                    background: url('${
                        product.images.filter((i) => i.match(/thumbnail/)).length
                            ? product.images.filter((i) => i.match(/thumbnail/))
                            : product.images[0]
                    }');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;">
                </div>
                <div class="product-card__info">
                    <div class="product-card__info-item">
                        Description: <span class="product-card__description-text">${product.description}</span>
                    </div>
                    <div class="product-card__info-item">
                        Category: <span class="product-card__category-text">${product.category}</span>
                    </div>
                    <div class="product-card__info-item">
                        Brand: <span class="product-card__brand-text">${product.brand}</span>
                    </div>
                    <div class="product-card__info-item">
                        Price: <span class="product-card__price-text">€${product.price}</span>
                    </div>
                    <div class="product-card__info-item">
                        Discount: <span class="product-card__discount-text">${product.discountPercentage} %</span>
                    </div>
                    <div class="product-card__info-item">
                        Rating: <span class="product-card__rating-text">${product.rating}</span>
                    </div>
                    <div class="product-card__info-item">
                        Stock: <span class="product-card__stock-text">${product.stock}</span>
                    </div>
                </div>
                <div class="product-card__controls">
                    <button
                        class="product-card__btn-add-to-cart ${getColorModifier(isInCart)}"
                        id="${EventTargetsIDEnum.cards}-${product.id}">
                        ${getCapture(isInCart)}
                    </button>
                    <a href="${PAGES_HASH.details}${product.id}" class="product-card__link-to-details">
                        DETAILS
                    </a>
                </div>
            </div>
        </div>
    `;
}
