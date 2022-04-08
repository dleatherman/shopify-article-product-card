# Shopify Article Product Card

![](card.png)

***Note: this has only been tested with custom themes that mirror [Dawn](https://github.com/shopify/dawn)'s architecture. You can customize the templates to work with your theme.***

## Installation

1. Add `article-product-card.js` to your `assets` theme folder
2. Open `sections/main-article.liquid` and add the following code at the top:

```html
<script src="{{ 'blog-product-card.js' | asset_url }}" defer></script>
```

3. You may also need to add the following code at the top of your `main-article.liquid` file as well to include product card and price styles:

```liquid
{{ 'component-card.css' | asset_url | stylesheet_tag }}
{{ 'component-price.css' | asset_url | stylesheet_tag }}
```

## Usage

1. Find the product handle of the product you'd like to embed in your article (e.g. `awesome-product`)
2. Switch the editor to HTML view
3. Paste in the `article-product-card` code:

```html
<article-product-card handle="awesome-product"></article-product-card>
```

4. When rendered, this will be replaced with a product.

### Options

You may also include `show-price="true/false"` and `show-vendor="true/false"` attributes to turn those options on/off