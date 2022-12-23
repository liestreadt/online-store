export default function getSideFilter(): string {
    return `
        <section class="side-filter">
            <div class="side-filter__control-buttons">
                <button class="side-filter__reset summary__btn-buy">
                    Reset Filters
                </button>
                <button class="side-filter__copy summary__btn-buy">
                    Copy Link
                </button>
            </div>
            <div class="side-filter__field">
                <h2 class="side-filter__filter-header">
                    Category
                </h2>
                <div class="side-filter__items-container">
                    <div class="category-item">
                        <input
                            type="checkbox"
                            id="input-smartphones"
                            class="filter-item__checkbox">
                        <label
                            for="input-smartphones"
                            class="filter-item__label">
                            smartphones
                        </label>
                        <span class="filter-item__amount">
                            (5/5)
                        </span>
                    </div>
                    <div class="category-item">
                        <input
                            type="checkbox"
                            id="input-skincare">
                        <label
                            for="input-skincare"
                            class="filter-item__label">
                            skincare
                        </label>
                        <span class="filter-item__amount">
                            (5/5)
                        </span>
                    </div>
                </div>
            </div>
            <div class="side-filter__field">
                <h2 class="side-filter__filter-header">
                    Brand
                </h2>
                <div class="side-filter__items-container">
                    <div class="brand-item">
                        <input
                            type="checkbox"
                            id="input-apple"
                            class="filter-item__checkbox">
                        <label
                            for="input-apple"
                            class="filter-item__label">
                            apple
                        </label>
                        <span class="filter-item__amount">
                            (5/5)
                        </span>
                    </div>
                    <div class="brand-item">
                        <input
                            type="checkbox"
                            id="input-samsung">
                        <label
                            for="input-samsung"
                            class="filter-item__label">
                            samsung
                        </label>
                        <span class="filter-item__amount">
                            (0/2)
                        </span>
                    </div>
                </div>
            </div>
            <div class="side-filter__field">
                <h2 class="side-filter__filter-header">
                    Price
                </h2>
                    <input
                        type="range"
                        id="input-price"
                        class="filter-item__dual-range">
            </div>
            <div class="side-filter__field">
                <h2 class="side-filter__filter-header">
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
