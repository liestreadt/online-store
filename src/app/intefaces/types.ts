export interface productDetail {
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
export interface dummyJSON {
    products: Array<productDetail>;
    limit: number;
    total: number;
    skip: number;
}
export const FilterParamsArray = ['category', 'brand', 'priceMin', 'priceMax', 'stockMin', 'stockMax'] as const;

export type FilterParamsFromArray = {
    [K in typeof FilterParamsArray[number]]: string[];
};

export const FilterParams = {
    category: 'category',
    brand: 'brand',
    priceMin: 'priceMin',
    priceMax: 'priceMax',
    stockMin: 'stockMin',
    stockMax: 'stockMax',
} as const;

export interface InitialFilterValues {
    minPrice: number;
    maxPrice: number;
    minStock: number;
    maxStock: number;
    categories: Map<string, number>;
    brands: Map<string, number>;
}
export interface ModelData {
    activeFilters: Partial<FilterParamsFromArray>;
    initialFilterValues: InitialFilterValues;
    allBrands: string[];
    allCategories: string[];
    page: string;
}
