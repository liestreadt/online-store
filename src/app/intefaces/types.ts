import { FilterCalculator } from '../FilterCalculator';

export interface ProductDetail {
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

export interface DummyJSON {
    products: Array<ProductDetail>;
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
    shownProducts: ProductDetail[];
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
    initialProducts: Array<ProductDetail> | null;
    filteredProducts: Array<ProductDetail> | null;
    page: string;
    shownProductInfo: ShownProductInfo | null;
    calculatedFilters: FilterCalculator | null;
}
export interface ElementsToListen {
    store: {
        reset: HTMLButtonElement | null;
        copy: HTMLButtonElement | null;
        category: HTMLDivElement | null;
        brand: HTMLDivElement | null;
        price: HTMLInputElement | null; // double-input element
        stock: HTMLInputElement | null; // double-input element
        sorting: HTMLSelectElement | null;
        searching: HTMLInputElement | null;
        viewButtons: HTMLDivElement | null;
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
}

// TODO: view should take options values from this enum
export enum sortVariantsEnum {
    byDefault = 'default-sort',
    byPriceAscending = 'ascending-price',
    byPriceDescending = 'descending-price',
    byRatingDescending = 'descending-rating',
    byRatingAscending = 'ascending-rating',
}
