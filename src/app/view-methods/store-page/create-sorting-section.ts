import { ModelData, SortVariantsEnum } from '../../intefaces/types';
import { EventTargetsIDEnum } from '../../intefaces/types';
import createSroreCard from './create-store-card';

export default function createSortingSection(modelData: Partial<ModelData>): string {
    const sortVariantsArr = [
        SortVariantsEnum.DEFAULT,
        SortVariantsEnum.PRICE_ASCENDING,
        SortVariantsEnum.PRICE_DESCENDING,
        SortVariantsEnum.RATING_ASCENDING,
        SortVariantsEnum.RATING_DESCENDING,
    ];
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
                    ${sortVariantsArr
                        .map((item, index) => {
                            return `
                            <option value="${item}" class="sorting-option" ${
                                item === modelData.currentOption ? 'selected' : ''
                            }>Sort by ${sortNamesArr[index]}</option>
                            `;
                        })
                        .join('')}
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
            <div class="sorting__card-container sorting__card-container_small">
                ${modelData.filteredProducts?.map((i) => createSroreCard(i)).join('')}
            </div>
        </section>
    `;
}
