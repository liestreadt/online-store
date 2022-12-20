interface parsedRequest {
    resource: string;
    id?: string;
}
const mainContent = {
    errPage: `<p class="error-caption">The page does not exist</p>`,
    store: `<div class="store__filters">Container with the store</div>
    <div class="store__goods">Goods are here</div>
    <input
        class="store__range"
        type="range"
        name="price"
        min="0"
        max="100"
        >`,
    cart: `<div class="cart">Here is the cart</div>`,
};
const routes = {
    '404': mainContent.errPage,
    '/': mainContent.store,
    cart: mainContent.cart,
};
function queryFromPrice(): URLSearchParams {
    const queryURL = new URLSearchParams();
    const priceInput = document.querySelector('.store__range');

    if (priceInput instanceof HTMLInputElement) {
        queryURL.set('price', priceInput.value);
    }
    return queryURL;
}
function appendQueryToURL(): void {
    const url = new URL(window.location.href);
    url.search = queryFromPrice().toString();

    const priceInput = document.querySelector('.store__range');
    let priceValue: string | null = null;

    if (priceInput instanceof HTMLInputElement) {
        priceValue = priceInput.value;
    }
    history.pushState({ price: priceValue }, '', url.toString());
}
function priceFromQuery(): string | null {
    const queryParams = new URLSearchParams(window.location.search);
    const price = queryParams.get('price');
    return price;
}
function renderPage(htmlCode: string, selector: string): void {
    const parentNode = document.querySelector(selector);

    if (parentNode) {
        parentNode.innerHTML = htmlCode;
        const priceInput = parentNode.querySelector('.store__range');

        if (priceInput instanceof HTMLInputElement) {
            priceInput.value = priceFromQuery() ?? '50';
            priceInput.addEventListener('change', () => {
                console.log('new price filter value');
                appendQueryToURL();
            });
        }
    } else {
        throw new Error(`No parent node with class ${selector}`);
    }
}
function parseRequestURL(): parsedRequest {
    const url = document.location.hash.toLowerCase();
    const requestInUrl = url.split('/');
    return {
        resource: requestInUrl[1], // when implementing product links there will be more elements
    };
}
async function loadPage(): Promise<void> {
    const request = parseRequestURL();
    const pageForRoute = request.resource ? request.resource : '/';
    // TODO: 404 works only with errors after #/ in url
    const route = routes[pageForRoute as keyof typeof routes] || routes['404'];
    const htmlMainCode = route;
    renderPage(htmlMainCode, 'main');
}

export function initRouting(): void {
    window.addEventListener('load', loadPage);
    window.addEventListener('popstate', loadPage);
}
