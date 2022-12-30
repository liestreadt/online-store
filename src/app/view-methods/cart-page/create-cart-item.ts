import { ProductDetail } from '../../intefaces/types';

export default function createCartItem(obj: ProductDetail): string {
    return `
        <div class="cart-item">
            <div class="cart-item__num">
                1
            </div>
            <div class="cart-item__pic"
                style="
                background: url(${
                    obj.images.filter((i) => i.match(/thumbnail/)).length
                        ? obj.images.filter((i) => i.match(/thumbnail/))
                        : obj.images[0]
                });
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                ">
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
