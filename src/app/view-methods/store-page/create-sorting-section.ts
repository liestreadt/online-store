import {
    ModelData,
    EventTargetsIDEnum,
    ViewVariantsEnum,
    SortVariantsEnum,
    ProductDetails,
} from '../../intefaces/types';
import createStoreCard from './create-store-card';
import createStoreCardBig from './create-store-card-big';

function getProductsToRender(modelData: Partial<ModelData>, cardContainerSize: string) {
    if (modelData.filteredProducts?.length) {
        return `
            <div
            class="sorting__card-container sorting__card-container_${cardContainerSize}"
            id="${EventTargetsIDEnum.cards}">
                ${modelData.filteredProducts
                    ?.map((product) => {
                        return modelData.currentView === ViewVariantsEnum.BIG
                            ? createStoreCardBig(product, modelData.cart?.checkProductInCart(`${product.id}`) ?? false)
                            : createStoreCard(product, modelData.cart?.checkProductInCart(`${product.id}`) ?? false);
                    })
                    .join('')}
            </div>
        `;
    } else {
        return `
            <div class="sorting__no-products">
                NO PRODUCTS FOUND
            </div>
        `;
    }
}

export default function createSortingSection(modelData: Partial<ModelData>): string {
    const [currentCardContainerSize, isViewButtonBigSelected, isViewButtonSmallSelected] =
        modelData.currentView === ViewVariantsEnum.BIG
            ? ['big', 'sorting__big-view_selected', '']
            : ['small', '', 'sorting__small-view_selected'];
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
                        ViewVariantsEnum.BIG
                    }" class="sorting__big-view ${isViewButtonBigSelected}">☰</button>
                    <button id="${
                        ViewVariantsEnum.SMALL
                    }" class="sorting__small-view ${isViewButtonSmallSelected}">☷</button>
                </div>
            </div>
            ${getProductsToRender(modelData, currentCardContainerSize)}
        </section>
    `;
}
