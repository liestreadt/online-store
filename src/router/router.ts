const applyRouting = (event: Event) => {
    event = event || window.event;
    event.preventDefault();
    if (event.target instanceof HTMLAnchorElement) {
        window.history.pushState({ linkID: event.target.id }, '', event.target.href);
        loadPage();
    }
};

const routes = {
    404: 'errPage',
    '/': 'store',
    '/cart': 'cart',
};
const mainContent = {
    errPage: `<p class="error-caption">The page does not exist</p>`,
    store: `<div class="store__filters">Container with the store</div>
    <div class="store__goods">Goos are here</div>`,
    cart: `<div class="cart">Here is the cart</div>`,
};

const loadPage = async () => {
    const path = window.location.pathname;
    const routeKey = routes[path as keyof typeof routes] || routes[404];
    const htmlMainCode = mainContent[routeKey as keyof typeof mainContent];
    drawPage(htmlMainCode, 'main');
};
const drawPage = (htmlCode: string, selector: string) => {
    const parentNode = document.querySelector(selector);
    if (parentNode) {
        parentNode.innerHTML = htmlCode;
    } else {
        throw new Error(`No parent node with class ${selector}`);
    }
};
const addListeners = () => {
    const navigation = document.querySelector('.header');
    navigation?.childNodes.forEach((linkNode) => {
        linkNode.addEventListener('click', applyRouting);
    });
};

export function initRouting() {
    window.addEventListener('popstate', loadPage);
    loadPage();
    addListeners();
}
