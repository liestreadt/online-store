import { EventTargetsIDEnum } from '../intefaces/types';
import { ModelData } from '../intefaces/types';

export default function getStoreFilters(modelData: Partial<ModelData>): string {
    return `
        <section class="side-filter">
            <div class="side-filter__control-buttons">
                <button id="${EventTargetsIDEnum.reset}" class="side-filter__reset">
                    Reset Filters
                </button>
                <button id="${EventTargetsIDEnum.copy}" class="side-filter__copy">
                    Copy Link
                </button>
            </div>
            <div class="side-filter__field">
                <h2 class="side-filter__filter-header header_small">
                    Categories
                </h2>
                <div id="${EventTargetsIDEnum.category}" class="side-filter__items-container">
                    ${modelData.allCategories
                        ?.map((item) => {
                            return `
                                <div class="category-item">
                                    <input
                                        type="checkbox"
                                        id="input-${item}"
                                        class="filter-item__checkbox">
                                    <label
                                        for="input-${item}"
                                        class="filter-item__label">
                                        ${item}
                                    </label>
                                    <span class="filter-item__amount">(5/5)</span>
                                </div>
                            `;
                        })
                        .join('')}
                </div>
            </div>
            <div class="side-filter__field">
                <h2 class="side-filter__filter-header header_small">
                    Brands
                </h2>
                <div id="${EventTargetsIDEnum.brand}" class="side-filter__items-container">
                    ${modelData.allBrands
                        ?.map((item) => {
                            return `
                                <div class="brand-item">
                                    <input
                                        type="checkbox"
                                        id="input-${item}"
                                        class="filter-item__checkbox">
                                    <label
                                        for="input-${item}"
                                        class="filter-item__label">
                                        ${item}
                                    </label>
                                    <span class="filter-item__amount">(5/5)</span>
                                </div>
                            `;
                        })
                        .join('')}
                </div>
            </div>
            <div id="${EventTargetsIDEnum.price}" class="side-filter__field">
                <h2 class="side-filter__filter-header header_small">
                    Price
                </h2>
            </div>
            <div id="${EventTargetsIDEnum.stock}" class="side-filter__field">
                <h2 class="side-filter__filter-header header_small">
                    Stock
                </h2>
            </div>
        </section>
    `;
}
