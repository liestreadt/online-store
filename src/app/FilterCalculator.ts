import { FilterKeys, ProductDetail, ShownProductInfo } from './intefaces/types';
import increaseValueInMap from './tools/Functions';

export class FilterCalculator {
    minUserPrice: number;
    maxUserPrice: number;
    minUserStock: number;
    maxUserStock: number;
    categories: Set<string>;
    brands: Set<string>;
    searchName: string;

    constructor() {
        this.minUserPrice = 0;
        this.maxUserPrice = Infinity;
        this.minUserStock = 0;
        this.maxUserStock = Infinity;
        this.categories = new Set();
        this.brands = new Set();
        this.searchName = '';
    }
    addCategory(category: string): void {
        this.categories.add(category);
    }
    deleteCategory(category: string): void {
        this.categories.delete(category);
    }
    addBrand(brand: string): void {
        this.brands.add(brand);
    }
    deleteBrand(brand: string): void {
        this.brands.delete(brand);
    }
    updateMinUserPrice(newMinPrice: number) {
        this.minUserPrice = newMinPrice;
    }
    updateMaxUserPrice(newMaxPrice: number) {
        this.maxUserPrice = newMaxPrice;
    }
    updateMinUserStock(newMinStock: number) {
        this.minUserStock = newMinStock;
    }
    updateMaxUserStock(newMaxStock: number) {
        this.maxUserStock = newMaxStock;
    }
    updateSearchName(newSearchName: string) {
        this.searchName = newSearchName.toLowerCase();
    }
    checkProductPassSearching(product: ProductDetail): boolean {
        type productKey = keyof typeof product;
        const fieldsToSearch: productKey[] = [
            'title',
            'description',
            'price',
            'discountPercentage',
            'brand',
            'category',
            'rating',
            'stock',
        ];
        const isProductPassSearching = fieldsToSearch.some((key) =>
            product[key].toString().toLowerCase().includes(this.searchName)
        );
        return isProductPassSearching;
    }
    checkProductPassFilters(product: ProductDetail): boolean {
        if (this.categories.size > 0 && !this.categories.has(product.category)) {
            return false;
        }
        if (this.brands.size > 0 && !this.brands.has(product.brand)) {
            return false;
        }
        if (this.minUserPrice > product.price || this.maxUserPrice < product.price) {
            return false;
        }
        if (this.minUserStock > product.stock || this.maxUserStock < product.stock) {
            return false;
        }
        if (!this.checkProductPassSearching(product)) {
            return false;
        }
        return true;
    }
    recalculate(allProducts: Array<ProductDetail> | null): ShownProductInfo | null {
        let minPrice = Infinity;
        let maxPrice = 0;
        let minStock = Infinity;
        let maxStock = 0;
        const categories = new Map();
        const brands = new Map();
        const shownProducts: Array<ProductDetail> = [];

        if (!allProducts) {
            return null;
        }
        for (const product of allProducts) {
            if (this.checkProductPassFilters(product)) {
                minPrice = Math.min(minPrice, product.price);
                maxPrice = Math.max(maxPrice, product.price);
                minStock = Math.min(minStock, product.stock);
                maxStock = Math.max(maxStock, product.stock);

                increaseValueInMap(categories, product.category);
                increaseValueInMap(brands, product.brand);
                shownProducts.push(product);
            }
        }
        return {
            minPrice,
            maxPrice,
            minStock,
            maxStock,
            categories,
            brands,
            shownProducts,
        };
    }
}
