(() => {
  if (window.location.pathname !== '/') {
    return console.log('wrong page');
  }
  const DATA_URL = 'https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json';

  const init = () => {
    buildHTML();
    buildCSS();
    setEvents();
  };

  const buildHTML = () => {
    const html = `
      <div class="container">
        <div class="recommended">
          <div class="banner__titles">
            <h2 class="title-primary">Beğenebileceğinizi düşündüklerimiz</h2>
          </div>
          <div class="products"></div>
        </div>
      </div>
    `;
    document.querySelector('.Section1').innerHTML += html;
  };

  const buildCSS = () => {
    const css = `
      .container {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
        max-width: 1320px;
      }
      .recommended {
        margin-top: 2rem;
      }
      .banner__titles {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fef6eb;
        padding: 25px 67px;
        border-top-left-radius: 35px;
        border-top-right-radius: 35px;
        font-family: Quicksand-Bold;
        font-weight: 700;
      }
      .title-primary {
        font-family: Quicksand-Bold;
        font-size: 3rem;
        font-weight: 700;
        line-height: 1.11;
        color: #f28e00;
        margin: 0;
      }
      .products {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .product-card {
        margin-top: 20px;
        border: 1px solid #eeeeee;
        padding: 0.5rem;
        width: 200px;
        text-decoration: none;
        color: inherit;
        background: #fff;
        border-radius: 8px;
      }
      .product-card:hover {
        box-shadow: 0 0 0 0 #00000030, inset 0 0 0 3px #f28e00;
      }
      .product-card img {
        width: 100%;
        border-radius: 4px;
        margin-bottom: 0.5rem;
      }
      .product-card h3 {
        color: #7d7d7d;
        margin: 0.25rem 0;
        font-size: 1rem;
        font-weight: 500;
      }
      .product-card h3:hover {
        color: #7d7d7d;
      }
      .product-card p {
        margin: 0 0 0.5rem 0;
        font-size: 0.95rem;
        color: #555;
      }
      .product-card strong {
        font-weight: 600;
        color: #7d7d7d;
        font-size: 1.05rem;
      }
    `;
    let style = document.querySelector('style.recommended-style');
    if (!style) {
      style = document.createElement('style');
      style.className = 'recommended-style';
      document.head.appendChild(style);
    }
    style.textContent = css;
  };

  const fetchProducts = async () => {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error('Ürünler alınamadı');
    return res.json();
  };

  const renderProducts = (list) => {
    const container = document.querySelector('.recommended .products');
    list.forEach((p) => {
      const card = document.createElement('a');
      card.className = 'product-card';
      card.href = p.url;
      card.target = '_blank';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.brand}</h3>
        <p>${p.name}</p>
        <strong>${p.price.toString().replace('.', ',')} TL</strong>
      `;
      container.appendChild(card);
    });
  };

  const setEvents = () => {
    fetchProducts().then(renderProducts);
  };

  init();
})();