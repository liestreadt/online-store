export default function createCartSummary(): string {
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
