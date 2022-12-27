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
export const filterParamsKeys = ['category', 'brand', 'priceMin', 'priceMax', 'stockMin', 'stockMax'];

export type FilterParamsValues = {
    category: string[];
    priceMin: string[];
    priceMax: string[];
    stockMin: string[];
    stockMax: string[];
};

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
    page: string;
}
