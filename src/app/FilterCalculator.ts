import { ProductDetail, ShownProductInfo } from './intefaces/types';
import increaseValueInMap from './tools/Functions';

export class FilterCalculator {
    minUserPrice: number;
    maxUserPrice: number;
    minUserStock: number;
    maxUserStock: number;
    categories: Set<string>;
    brands: Set<string>;
    searchName: '';

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
        if (!product.title.includes(this.searchName)) {
            return false;
        }
        return true;
    }
    recalculate(allProducts: Array<ProductDetail>): ShownProductInfo {
        let minPrice = Infinity;
        let maxPrice = 0;
        let minStock = Infinity;
        let maxStock = 0;
        const categories = new Map();
        const brands = new Map();
        const shownProducts: Array<ProductDetail> = [];

        console.log('before filter cycle');
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
