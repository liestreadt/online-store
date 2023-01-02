import { EventTargetsIDEnum } from '../intefaces/types';
import { ModelData } from '../intefaces/types';
import createSroreCard from './createStoreCard';

export default function createSortingSection(modelData: Partial<ModelData>): string {
    return `
        <section class="sorting">
            <div class="sorting-header">
                <select name="" id="${EventTargetsIDEnum.sorting}" class="sorting__menu">
                    <option value="default-sort" class="sorting-option">Sort default</option>
                    <option value="ascending-price" class="sorting-option">Sort by price (ascending)</option>
                    <option value="descending-price" class="sorting-option">Sort by price (descending)</option>
                    <option value="ascending-rating" class="sorting-option">Sort by rating (ascending)</option>
                    <option value="descending-rating" class="sorting-option">Sort by rating (descending)</option>
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
