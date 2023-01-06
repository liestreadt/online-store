import Cart from '../../Cart';
import { CURRENCY_SYMBOL } from '../../constants/constants';
import { ProductCart, ProductDetails } from '../../intefaces/types';

export default function createCartItem(product: ProductCart, index: number, cart: Cart): string {
    const { limit, listPage } = cart?.showProperties;
    const numberInList = index + 1 + limit * (listPage - 1);
    return `
        <div class="cart-item">
            <div class="cart-item__num">
                ${numberInList}
            </div>
            <div class="cart-item__pic"
                style="
                background: url(${
                    product.images.filter((url) => url.match(/thumbnail/)).length
                        ? product.images.filter((url) => url.match(/thumbnail/))
                        : product.images[0]
                });
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                ">
            </div>
            <div class="cart-item__info">
                <div class="cart-item__title">
                    ${product.title}
                </div>
                <p class="cart-item__description">
                    ${product.description}
                </p>
                <div class="cart-item__metrics">
                    <span class="cart-item__rating">Rating: ${product.rating}</span>
                    <span class="cart-item__discount">Discount: ${product.discountPercentage}%</span>
                </div>
            </div>
            <div class="cart-item__manage">
                <div class="cart-item__amount">
                    Stock: <span class="amount-in-stock">${product.stock}</span>
                </div>
                <div class="cart-item__controls">
                    <button class="controls-increase">
                        +
                    </button>
                    <div class="controls-count">
                        ${product.amount}
                    </div>
                    <button class="controls-decrease">
                        -
                    </button>
                </div>
                <div class="cart-item__price">
                    ${CURRENCY_SYMBOL}${product.getProductTotalPrice()}
                </div>
            </div>
        </div>
    `;
}
