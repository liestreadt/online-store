import { ProductDetails } from '../../intefaces/types';

export default function createCartItem(product: ProductDetails): string {
    return `
        <div class="cart-item">
            <div class="cart-item__num">
                1
            </div>
            <div class="cart-item__pic"
                style="
                background: url(${
                    product.images.filter((i) => i.match(/thumbnail/)).length
                        ? product.images.filter((i) => i.match(/thumbnail/))
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
                <div class="cart-item__description">
                    ${product.description}
                </div>
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
