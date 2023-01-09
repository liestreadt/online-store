export default function getPage404(): string {
    return `
        <section class="not-found">
            <div class="not-found__wrapper">
                <p class="not-found__text">
                    Oops! Something went wrong.
                    <br>
                    PAGE NOT FOUND (404)
                </p>
            </div>
        </section>
    `;
}
