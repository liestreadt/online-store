export default function getProdDetailsPage(): string {
    return `
        <main class="main-details">
            <section class="breadcrumbs">
                <span class="breadcrumbs__item">Store</span>
                ⇨
                <span class="breadcrumbs__item">Laptops</span>
                ⇨
                <span class="breadcrumbs__item">Apple</span>
                ⇨
                <span class="breadcrumbs__item">MacBookPro</span>
            </section>
            <section class="details">
                <div class="details__header">
                    <span class="details__header-text">asdsdasad</span>
                </div>
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
                            <div class="details-item__head">
                                Description:
                            </div>
                            <div class="details__description-text details-item__body">
                                MacBook Pro 2021 with mini-LED display may launch between September, November
                            </div>
                        </div>
                        <div class="details__discount details-item">
                            <div class="details-item__head">
                                Discount Percentage:
                            </div>
                            <div class="details__discount-text details-item__body">
                                11.02
                            </div>
                        </div>
                        <div class="details__rating details-item">
                            <div class="details-item__head">
                                Rating:
                            </div>
                            <div class="details__rating-text details-item__body">
                                4.57
                            </div>
                        </div>
                        <div class="details__stock details-item">
                            <div class="details-item__head">
                                Stock:
                            </div>
                            <div class="details__stock-text details-item__body">
                                83
                            </div>
                        </div>
                        <div class="details__brand details-item">
                            <div class="details-item__head">
                                Brand:
                            </div>
                            <div class="details__brand-text details-item__body">
                                Apple
                            </div>
                        </div>
                        <div class="details__category details-item">
                            <div class="details-item__head">
                                Category:
                            </div>
                            <div class="details__category-text details-item__body">
                                laptops
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
        </main>
    `;
}
