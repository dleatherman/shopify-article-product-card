
class ArticleProductCard extends HTMLElement {
  constructor() {
    super();
    this.getProductByHandle = this.getProductByHandle.bind(this);
    this.handle = this.getAttribute('handle');
    this.image_ratio = this.getAttribute('image_ratio') ? this.getAttribute('image_ratio') : 'square';
    this.show_price = this.getAttribute('show-price') ? !!this.getAttribute('show-price') : true;
    this.show_vendor = this.getAttribute('show-vendor') ? !!this.getAttribute('show-vendor') : false;
  }
  connectedCallback() {
    if (!this.handle) {
      return;
    }
    this.getProductByHandle();
  }

  renderMedia(product) {
    return `
      <div class="media media--${this.image_ratio} media--transparent media--hover-effect">
        <img
          src="${product.image.src}"
          alt="${product.image.alt ? product.image.alt : product.title}"
          sizes="100vw"
          class="motion-reduce"
          loading="lazy"
          height="${product.image.height}"
          width="${product.image.width}"
        >
      </div>
    `
  }

  renderCompareAtPrice(product) {
    return `
      <span>
        <s class="price-item price-item--regular">
          ${product.variants[0].compare_at_price ? (`$${product.variants[0].compare_at_price}`) : ''}
        </s>
      </span>
    `;
  }

  renderPrice(product) {
    const available = product.variants.some(variant => variant.available !== false);
    // Compares the price of variants to the first variant
    const price_varies = product.variants.some(variant => variant.price !== product.variants[0].price);
    // Compares the compare_at_price of variants
    const compare_at_price_varies = product.variants.some(variant => variant.compare_at_price !== product.variants[0].compare_at_price);
    return `
      <div class="price
        ${!available ? 'price--sold-out' : ''}
        ${product.variants[0].compare_at_price > product.variants[0].price ? 'price--on-sale' : ''}
        ${!price_varies && compare_at_price_varies ? 'price--no-compare' : ''}
      ">
        <div class="price__container">
          <div class="price__regular">
            <span class="price-item price-item--regular">
              ${price_varies ? 'From ' : ''}
              $${product.variants[0].price}
            </span>
          </div>
          <div class="price__sale">
            ${price_varies || product.variants[0].compare_at_price ? this.renderCompareAtPrice(product) : ''}
            <span class="price-item price-item--sale price-item--last">
              ${price_varies ? 'From ' : ''}$${product.variants[0].price}
            </span>
          </div>
        </div>
      </div>
    `
  }

  renderVendor(product) {
    return `
      <div class="vendor">
        ${product.vendor}
      </div>
    `
  }

  renderProduct(product) {
    if (!product) return;
    const template = document.createElement('div');
    console.log(this.show_vendor, product.vendor);
    template.innerHTML = `
      <div class="card-wrapper">
        <div class="card ${product.image ? 'card--media' : 'card-text'}">
          <div class="card-inner">
            ${product.image ? this.renderMedia(product) : ''}
            <div class="card-content">
              <div class="card-information">
                <h3 class="card-heading">
                  <a href="/products/${product.handle}">${product.title}</a>
                </h3>
                ${this.show_vendor ? this.renderVendor(product) : ''}
                ${this.show_price ? this.renderPrice(product) : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    this.appendChild(template);
  }

  async getProductByHandle() {
    const res = await fetch(`/products/${this.handle}.json`);
    const product = await res.json();
    this.renderProduct(product.product);
  }

}

customElements.define('article-product-card', ArticleProductCard);
