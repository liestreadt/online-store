import { EventTargetsIDEnum } from '../../intefaces/types';
import { ModelData } from '../../intefaces/types';
import createStoreCard from './create-store-card';
import createStoreCardTiny from './create-store-card-tiny';

export default function createSortingSection(modelData: Partial<ModelData>): string {
    const currentViewFunc = modelData.currentView === 'view-small' ? createStoreCard : createStoreCardTiny;
    const currentCardContainerSize = modelData.currentView === 'view-small' ? 'small' : 'tiny';
    return `
        <section class="sorting">
            <div class="sorting-header">
                <select name="" id="${EventTargetsIDEnum.sorting}" class="sorting__menu">
                    <option value="default-sort" class="sorting-option" selected>Sort default</option>
                    <option value="ascending-price" class="sorting-option">Sort by price (ascending)</option>
                    <option value="desending-price" class="sorting-option">Sort by price (descending)</option>
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
                    Choose view: <button id="view-tiny" class="sorting__tiny-view">📱</button>
                    <button id="view-small" class="sorting__small-view">💻</button>
                </div>
            </div>
            <div class="sorting__card-container sorting__card-container_${currentCardContainerSize}">
                ${modelData.filteredProducts?.map((i) => currentViewFunc(i)).join('')}
            </div>
        </section>
    `;
}
