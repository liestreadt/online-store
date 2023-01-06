import Cart from '../Cart';
import { FilterCalculator } from '../FilterCalculator';

export interface ProductDetails {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    brand: string;
    category: string;
    images: Array<string>;
    rating: number;
    stock: number;
}
export interface ProductShort {
    id: number;
    amount: number;
}
export interface ProductCart extends ProductDetail {
    amount: number;
    getProductTotalPrice: () => number;
}

export interface DummyJSON {
    products: Array<ProductDetails>;
    limit: number;
    total: number;
    skip: number;
}
export interface ShownProductInfo {
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    categories: Map<string, number>;
    brands: Map<string, number>;
    shownProducts: ProductDetails[];
}

export const filterParamsKeys = [
    'category',
    'brand',
    'sorting',
    'priceMin',
    'priceMax',
    'stockMin',
    'stockMax',
    'searching',
] as const;

export type FilterKeys = typeof filterParamsKeys[number];

export type FilterParamsValues = Record<FilterKeys, string[]>;

export type FilteredProductsKeys = keyof ProductDetails;

export interface InitialFilterValues {
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    categories: Map<string, number>;
    brands: Map<string, number>;
}
export interface ModelData {
    activeFilters: Partial<FilterParamsValues>;
    initialFilterValues: InitialFilterValues;
    allBrands: string[];
    allCategories: string[];
    initialProducts: Array<ProductDetails> | null;
    filteredProducts: Array<ProductDetails> | null;
    currentOption: SortVariantsEnum | null;
    shownProductInfo: ShownProductInfo | null;
    calculatedFilters: FilterCalculator | null;
    page: PageCase;
    detailsID: string;
    cart: Cart | null;
}
export interface ElementsToListen {
    store: {
        reset: HTMLButtonElement | null;
        copy: HTMLButtonElement | null;
        category: HTMLDivElement | null;
        brand: HTMLDivElement | null;
        price: HTMLDivElement | null; // double-input element
        stock: HTMLDivElement | null; // double-input element
        sorting: HTMLSelectElement | null;
        searching: HTMLInputElement | null;
        viewButtons: HTMLDivElement | null;
        cards: HTMLDivElement | null;
    };
}

export enum EventTargetsIDEnum {
    reset = 'button-reset',
    copy = 'button-copy',
    category = 'category-container',
    brand = 'brand-container',
    price = 'side-filter-price', // element id which contains price input
    stock = 'side-filter-stock', // element id which contains stock input
    sorting = 'sorting-options',
    searching = 'searching-field',
    viewButtons = 'view-buttons-container',
    cards = 'card-container',
}

export enum SortVariantsEnum {
    DEFAULT = 'default-sort',
    PRICE_ASCENDING = 'ascending-price',
    PRICE_DESCENDING = 'descending-price',
    RATING_ASCENDING = 'ascending-rating',
    RATING_DESCENDING = 'descending-rating',
}
export enum PageCase {
    store,
    cart,
    details,
    error,
}
