const mainContent = {
    errPage: `<p class="error-caption">The page does not exist</p>`,
    store: `<div class="store__filters">Container with the store</div>
    <div class="store__goods">Goos are here</div>`,
    cart: `<div class="cart">Here is the cart</div>`,
};
const routes = {
    '404': mainContent.errPage,
    '/': mainContent.store,
    cart: mainContent.cart,
};
function parseRequestURL() {
    const url = document.location.hash.toLowerCase();
    const requestInUrl = url.split('/');
    return {
        resource: requestInUrl[1],
        // id: request[2],
        // action: requestInUrl[3],
    };
}
const loadPage = async () => {
    const request = parseRequestURL();
    const pageForRoute = request.resource ? request.resource : '/';

    const route = routes[pageForRoute as keyof typeof routes] || routes['404'];
    const htmlMainCode = route;
    renderPage(htmlMainCode, 'main');
};
const renderPage = (htmlCode: string, selector: string) => {
    const parentNode = document.querySelector(selector);
    if (parentNode) {
        parentNode.innerHTML = htmlCode;
    } else {
        throw new Error(`No parent node with class ${selector}`);
    }
};

export function initRouting() {
    window.addEventListener('load', loadPage);
    window.addEventListener('popstate', loadPage);
}
