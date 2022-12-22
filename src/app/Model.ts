import Cart from './Cart';

interface productDetail {
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
interface dummyJSON {
    products?: Array<productDetail>;
    limit?: number;
    total?: number;
    skip?: number;
}

class Model {
    activeFilters: URLSearchParams;
    cart: Cart;
    productJSON: dummyJSON;

    constructor(urlString: string) {
        const url = new URL(urlString);
        this.activeFilters = url.searchParams;
        this.cart = new Cart();
        this.productJSON = {};
    }
    async loadProducts(source = 'https://dummyjson.com/products?limit=100') {
        fetch(source)
            .then((response: Response) => response.json())
            .then((data: dummyJSON) => {
                this.productJSON = data;
                console.log(typeof this.productJSON, this.productJSON);
            })
            .catch(() => {
                throw new Error('Fail to connect dummy json');
            });
    }
}

export default Model;
