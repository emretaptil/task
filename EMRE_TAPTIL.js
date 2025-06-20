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
          <div class="banner__wrapper">
            <div class="products"></div>
            <button aria-label="prev" class="swiper-btn swiper-prev"></button>
            <button aria-label="next" class="swiper-btn swiper-next"></button>
          </div>
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
      .banner__wrapper {
        box-shadow: 15px 15px 30px 0 #ebebeb80;
        background-color: #fff;
        border-bottom-left-radius: 35px;
        border-bottom-right-radius: 35px;
        position: relative;
        border-radius: 40px;
      }
      .products {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 1rem;
        padding: 20px 50px;
      }
      .swiper-prev {
        background: url(/assets/svg/prev.svg) no-repeat;
        background-color: #fef6eb;
        background-position: 18px;
        left: -65px;
      }
      .swiper-prev:hover, .swiper-next:hover {
        border: 1px solid #f28e00;
        background-color: #ffffff;
      }
      .swiper-next, .swiper-prev {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        bottom: 50%;
        top: auto;
      }
      .swiper-next, .swiper-prev {
        border: 1px solid #0000;
      }
      .swiper-next, .swiper-prev {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        bottom: 50%;
        top: auto;
      }
      .swiper-next {
        background: url(/assets/svg/next.svg) no-repeat;
        background-color: #fef6eb;
        background-position: 18px;
        right: -65px;
      }
      .product-card {
        margin-top: 20px;
        z-index: 1;
        display: block;
        flex: 0 0 230px;
        scroll-snap-align: start;
        font-family: Poppins, "cursive";
        font-size: 12px;
        padding: 5px;
        color: #7d7d7d;
        margin: 0 0 20px 3px;
        border: 1px solid #ededed;
        border-radius: 10px;
        position: relative;
        text-decoration: none;
        background-color: #fff;
      }
      .product-card:hover {
        color: #7d7d7d;
        cursor: pointer;
        z-index: 2;
        box-shadow: 0px 0px 0px 0 #00000030, inset 0 0 0 3px #f28e00;
      }
      .product-card img {
        width: 100%;
        border-radius: 4px;
        margin-bottom: 0.5rem;
      }
      .product-card h2 {
        font-size: 1.2rem;
        height: 42px;
        overflow: hidden;
        margin-bottom: 10px;
      }
      .product-card h2:hover {
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

      .card-heart {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 26px;
        height: 26px;
        cursor: pointer;
      }
      .card-heart img { width: 100%; transition: filter .2s; }
      .card-heart:hover img { filter: brightness(0) saturate(100%) hue-rotate(-10deg); }

      .card-stars {
        display: flex;
        align-items: center;
        gap: 2px;
        margin-bottom: .4rem;
        font-size: 12px;
      }
      .card-stars .star { color: #ffd32c; }
      .card-stars .count { color: #888; font-size:11px }

      .add-btn {
        display: block;
        width: 100%;
        padding: 6px 0;
        margin-top: 6px;
        background: #f28e00;
        color: #fff;
        border: none;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
      }
      .add-btn:hover { opacity: .9; }
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

    list.forEach((p, idx) => {
      const card = document.createElement('a');
      card.className = 'product-card';
      card.href = p.url;
      card.target = '_blank';
      card.innerHTML = `
      <div class="card-heart">
        <img src="assets/svg/default-favorite.svg" alt="Favourite">
      </div>

      <img src="${p.img}" alt="${p.name}">

      <h2>
        <b> ${p.brand} - </b>
        <span> ${p.name} </span>
      </h2>
      

      <div class="card-stars">
        ${'★★★★★'.split('').map(_ => '<span class="star">★</span>').join('')}
        <span class="count">(45)</span>
      </div>

      <strong>${p.price.toString().replace('.', ',')} TL</strong>

      <button class="add-btn">Sepete Ekle</button>
    `;

      container.appendChild(card);
    });
  };

  const setEvents = () => {
    fetchProducts().then(renderProducts);
  };

  init();
})();