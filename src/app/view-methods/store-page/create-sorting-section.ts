import { ModelData, SortVariantsEnum } from '../../intefaces/types';
import { EventTargetsIDEnum } from '../../intefaces/types';
import createStoreCard from './create-store-card';

export default function createSortingSection(modelData: Partial<ModelData>): string {
    const SORT_OPTIONS = Object.values(SortVariantsEnum);
    const sortNamesArr = [
        'default',
        'price ↑ (ascending)',
        'price ↓ (descending)',
        'rating ↑ (ascending)',
        'rating ↓ (descending)',
    ];
    return `
        <section class="sorting">
            <div class="sorting-header">
                <select id="${EventTargetsIDEnum.sorting}" class="sorting__menu">
                    ${SORT_OPTIONS.map((item, index) => {
                        return `
                            <option value="${item}" class="sorting-option" ${
                            item === modelData.currentOption ? 'selected' : ''
                        }>Sort by ${sortNamesArr[index]}</option>
                            `;
                    }).join('')}
                </select>
                <div class="sorting__total-found">
                    Found: <span class="sorting__amount">${modelData.filteredProducts?.length}</span>
                </div>
                <input
                    type="text"
                    name=""
                    id="${EventTargetsIDEnum.searching}"
                    class="sorting__search"
                    value="${modelData.calculatedFilters?.searchName || ''}"
                    placeholder="Search product">
                <div id="${EventTargetsIDEnum.viewButtons}" class="sorting__view-buttons">
                    Choose view: <button class="sorting__tiny-view">📱</button>
                    <button class="sorting__small-view">💻</button>
                </div>
            </div>
            <div class="sorting__card-container sorting__card-container_small" id="${EventTargetsIDEnum.cards}">
                ${modelData.filteredProducts
                    ?.map((product) =>
                        createStoreCard(product, modelData.cart?.checkProductInCart(`${product.id}`) ?? false)
                    )
                    .join('')}
            </div>
        </section>
    `;
}
