export default function getCartPage(): string {
    return `
        <main class="main-cart">
            <section class="cart">
                <div class="cart__header">
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
                </div>
                <div class="cart__list">
                    <div class="cart-item">
                        <div class="cart-item__num">
                            1
                        </div>
                        <div class="cart-item__pic">
                            123
                        </div>
                        <div class="cart-item__info">
                            <div class="cart-item__title">
                                Metal Ceramic Flower
                            </div>
                            <div class="cart-item__description">
                                Metal Ceramic Flower Chandelier Home Lighting American Vintage Hanging Lighting Pendant Lamp
                            </div>
                            <div class="cart-item__metrics">
                                <span class="cart-item__rating">Rating: 4.5</span>
                                <span class="cart-item__discount">Discount: 10.5%</span>
                            </div>
                        </div>
                        <div class="cart-item__manage">
                            <div class="cart-item__amount">
                                Stock: <span class="amount-in-stock">146</span>
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
                </div>
            </section>
            <sidebar class="summary">
                <div class="summary__header">
                    Summary
                </div>
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
        </main>
    `;
}
