(() => {
  const init = () => {
    // checking the homepage
    if (!(window.location.pathname === "/" || window.location.pathname === "/index.html")) {
      console.log("wrong page");
      return;
    }

    buildHTML();
    buildCSS();
    setEvents();
    fetchProducts();
  };

  const apiUrl =
    "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";
  const storageKey = "productsData";
  const favoriteKey = "favoriteProducts";

  const buildHTML = () => {
    const carouselHTML = `
      <div class="carousel-container">
        <h2 class="carousel-title">Beğenebileceğinizi düşündüklerimiz</h2>
        <div class="carousel-controls">
          <button class="carousel-button prev">
            <svg aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
          <div class="carousel">
            <div class="carousel-track"></div>
          </div>
          <button class="carousel-button next">
            <svg aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  
    const container = document.createElement("div");
    container.innerHTML = carouselHTML;
    
    const storiesSection = document.querySelector(".Section1") || document.body;
    storiesSection.after(container);
  };

  const buildCSS = () => {
    const css = `
      body {
        font-family: Quicksand-Bold, sans-serif;
        margin: 20px;
        background: #fff;
      }
  
      .carousel-container {
        margin: 0 72px;
        padding: 0px;
        position: relative;
      }
  
      .carousel-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
        padding: 32px;
        background: rgb(254, 246, 235);
        border-top-left-radius: 36px;
        border-top-right-radius: 36px;
        color: rgb(242, 142, 0);
      }
  
      .carousel-controls {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
  
      .carousel {
        flex: 1;
        overflow: hidden;
      }
  
      .carousel-track {
        display: flex;
        gap: 16px;
        transition: transform 0.5s ease;
      }
  
      .carousel-button {
        margin: 4px;
        padding: 16px 18px;
        background: rgb(254, 246, 235);
        border: 1px solid rgb(254, 246, 235);
        cursor: pointer;
        border-radius: 50%;
        z-index: 1;
        transition: all 0.3s ease;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
  
      .carousel-button.prev {
        left: -60px;
      }
  
      .carousel-button.next {
        right: -60px;
      }
  
      .carousel-button svg {
        color: rgb(242, 142, 0);
        width: 16px;
        height: 16px;
        background: none;
      }
  
      .carousel-button:hover {
        background: none;
        border: 1px solid rgb(242, 142, 0);
      }
  
      .product-card {
        flex: 0 0 calc(22% - 16px);
        min-height: 100%;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        text-align: start;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        position: relative;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
      }
  
      .product-card:hover {
        border: 1px solid rgb(242, 142, 0);
      }
  
      .product-card img {
        max-width: 100%;
        height: 40vh;
        border-radius: 8px;
      }

      .product-card .content-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
      }
  
      .product-card h3 {
        font-size: 12px;
        font-weight: 600;
        margin: 10px 0;
        color: rgb(125, 125, 125);
        cursor: pointer;
      }
  
      .product-card h3 b {
        font-size: 13px;
        font-weight: 800;
      }
  
      .product-card .price-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 36px;
        padding: 8px 0;
      }

      .product-card .price-container div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: end;
        gap: 4px;
        padding: 8px 0;
      }
  
      .product-card .price {
        font-size: 21px;
        font-weight: 600;
        color: rgb(125, 125, 125);
        font-weight: bold;
      }
  
      .product-card .original-price {
        font-size: 14px;
        color: rgb(125, 125, 125);
        font-weight: 500;
        text-decoration: line-through;
        margin-right: 8px;
      }

      .product-container .discount-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: start;
      }
  
      .product-card .discount {
        font-size: 18px;
        color: rgb(0, 163, 101);
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: start;
        gap: 4px;
      }

      .product-card .discount svg {
        color: rgb(0, 163, 101);
        width: 20px;
        height: 20px;
      }

      .product-card .heart-icon {
        position: absolute;
        top: 16px;
        right: 16px;
        padding: 14px 16px 12px 16px;
        cursor: pointer;
        background: #fff;
        border: 1px solid #fff;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        z-index: 1;
        transition: all 0.3s ease;
      }
  
      .product-card svg {
        width: 24px;
        height: 24px;
        color: rgb(242, 142, 0);
      }
  
      .product-card .heart-icon svg.favorite {
        width: 24px;
        height: 24px;
        color: rgb(242, 142, 0);
      }
  
      .product-card .heart-icon:hover {
        border: 1px solid rgb(242, 142, 0);
      }
  
      .product-card .add-button {
        width: 100%;
        font-weight: 700;
        font-size: 14px;
        color: rgb(242, 142, 0);
        background: rgb(254, 246, 235);
        border: 1px solid rgb(254, 246, 235);
        padding: 14px;
        border-radius: 24px;
        transition: all 0.3s ease;
        cursor: pointer;
      }
  
      .product-card .add-button:hover {
        color: rgb(254, 246, 235);
        background: rgb(242, 142, 0);
        border: 1px solid rgb(242, 142, 0);
      }
  
      @media (max-width: 768px) {
        .product-card {
          flex: 0 0 calc(60% - 16px);
        }
      }
  
      @media (max-width: 480px) {
        .product-card {
          flex: 0 0 100%;
        }
      }
    `;
  
    $("<style>").html(css).appendTo("head");
  };

  const fetchProducts = async () => {
    let products = JSON.parse(localStorage.getItem(storageKey));
    if (!products) {
      try {
        const response = await fetch(apiUrl);
        products = await response.json();
        localStorage.setItem(storageKey, JSON.stringify(products));
      } catch (error) {
        console.error("Error while fetching products:", error);
        return;
      }
    }

    renderProducts(products);
  };

  const renderProducts = (products) => {
    const carouselTrack = $(".carousel-track");
    carouselTrack.empty();
  
    const favorites = JSON.parse(localStorage.getItem(favoriteKey)) || [];
  
    products.forEach((product) => {
      const isFavorite = favorites.includes(product.id);
      const productCard = `
        <div class="product-card" data-id="${product.id}" data-url="${product.url}">
          <span class="heart-icon ${isFavorite && "favorite"}">
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="${isFavorite ? "0 0 20 18" : "0 0 48 48"}"
            >
              <path d="${isFavorite ? 
                "M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" : 
                "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
              }" />
            </svg>
          </span>
          <img src="${product.img}" alt="${product.name}">
          <div class="content-container">
            <h3><b>${product.brand} -</b> ${product.name}</h3>
            ${Math.round(((product.original_price - product.price) / product.original_price) * 100) > 0 ? `<div class="price-container">
              <div>
                ${product.original_price && `<span class="original-price">${product.original_price} TL</span>`}
                ${product.original_price && `<span class="discount">${Math.round(((product.original_price - product.price) / product.original_price) * 100)}% <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"></path>
                    <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"></path>
                </svg></span>`}
              </div>
              <span class="price">${product.price} TL</span>
            </div>` : `<span class="price">${product.price} TL</span>`}
            
            <button class="add-button">Sepete Ekle</button>
          </div>
        </div>
      `;
      carouselTrack.append(productCard);
    });
  
    let currentIndex = 0;
    const totalProducts = products.length;
  
    $(".carousel-button.next").click(() => {
      if (currentIndex < totalProducts - 4) {
        currentIndex += 1;
        carouselTrack.css("transform", `translateX(-${currentIndex * 25}%)`);
      }
    });
  
    $(".carousel-button.prev").click(() => {
      if (currentIndex > 0) {
        currentIndex -= 1;
        carouselTrack.css("transform", `translateX(-${currentIndex * 25}%)`);
      }
    });
  };

  const setEvents = () => {
    $(document).on("click", ".product-card", function (e) {
      if (!$(e.target).closest(".heart-icon").length) {
        const productURL = $(this).attr("data-url");
        if (productURL) {
          window.open(productURL, "_blank");
        }
      }
    });

    $(document).on("click", ".heart-icon", function (event) {
      event.stopPropagation();
  
      const $heartIcon = $(this);
      const productId = $heartIcon.closest(".product-card").data("id");
      let favorites = JSON.parse(localStorage.getItem(favoriteKey)) || [];
  
      if (favorites.includes(productId)) {
        favorites = favorites.filter((id) => id !== productId);
        $heartIcon.removeClass("favorite");
      } else {
        favorites.push(productId);
        $heartIcon.addClass("favorite");
      }
  
      localStorage.setItem(favoriteKey, JSON.stringify(favorites));
  

      const isFavorite = favorites.includes(productId);
      $heartIcon.find("svg").attr("viewBox", isFavorite ? "0 0 20 18" : "0 0 48 48");
      $heartIcon.find("path").attr("d", isFavorite ? 
        "M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" : 
        "M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
      );
    });
  };

  init();
})();