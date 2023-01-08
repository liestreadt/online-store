import { ModelData, EventTargetsIDEnum, ViewVariantsEnum, SortVariantsEnum } from '../../intefaces/types';
import createStoreCard from './create-store-card';
import createStoreCardBig from './create-store-card-big';

export default function createSortingSection(modelData: Partial<ModelData>): string {
    const currentCardContainerSize = modelData.currentView === 'view-big' ? 'big' : 'small';
    const isViewButtonBigSelected = modelData.currentView === 'view-big' ? 'sorting__big-view_selected' : '';
    const isViewButtonSmallSelected = modelData.currentView === 'view-big' ? '' : 'sorting__small-view_selected';

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
                    Choose view: <button id="${
                        ViewVariantsEnum.big
                    }" class="sorting__big-view ${isViewButtonBigSelected}">☰</button>
                    <button id="${
                        ViewVariantsEnum.small
                    }" class="sorting__small-view ${isViewButtonSmallSelected}">☷</button>
                </div>
            </div>
            <div
                class="sorting__card-container sorting__card-container_${currentCardContainerSize}"
                id="${EventTargetsIDEnum.cards}">
                ${modelData.filteredProducts
                    ?.map((product) => {
                        return modelData.currentView === 'view-big'
                            ? createStoreCardBig(product, modelData.cart?.checkProductInCart(`${product.id}`) ?? false)
                            : createStoreCard(product, modelData.cart?.checkProductInCart(`${product.id}`) ?? false);
                    })
                    .join('')}
            </div>
        </section>
    `;
}
