import { EventTargetsIDEnum } from '../../intefaces/types';
import { ModelData, SortVariantsEnum } from '../../intefaces/types';
import createSroreCard from './create-store-card';

export default function createSortingSection(modelData: Partial<ModelData>): string {
    return `
        <section class="sorting">
            <div class="sorting-header">
                <select name="" id="${EventTargetsIDEnum.sorting}" class="sorting__menu">
                    <option value="${SortVariantsEnum.DEFAULT}" class="sorting-option">Sort default</option>
                    <option value="${
                        SortVariantsEnum.PRICE_ASCENDING
                    }" class="sorting-option">Sort by price (ascending)</option>
                    <option value="${
                        SortVariantsEnum.PRICE_DESCENDING
                    }" class="sorting-option">Sort by price (descending)</option>
                    <option value="${
                        SortVariantsEnum.RATING_ASCENDING
                    }" class="sorting-option">Sort by rating (ascending)</option>
                    <option value="${
                        SortVariantsEnum.RATING_DESCENDING
                    }" class="sorting-option">Sort by rating (descending)</option>
                </select>
                <div class="sorting__total-found">
                    Found: <span class="sorting__amount">${modelData.filteredProducts?.length}</span>
                </div>
                <input
                    type="text"
                    name=""
                    id="${EventTargetsIDEnum.searching}"
                    class="sorting__search"
                    placeholder="Search product">
                <div id="${EventTargetsIDEnum.viewButtons}" class="sorting__view-buttons">
                    Choose view: <button class="sorting__tiny-view">📱</button>
                    <button class="sorting__small-view">💻</button>
                </div>
            </div>
            <div class="sorting__card-container sorting__card-container_small">
                ${modelData.filteredProducts?.map((i) => createSroreCard(i)).join('')}
            </div>
        </section>
    `;
}
