import { orderList } from "../data/orders.js";
console.log(orderList[0].products)
console.log(orderList)
import { converterFunc } from "./utils/currencyConverter.js";
import { cartDataInstance } from "../data/cart - class.js";

function convertToMonthDate(isoString) {
    const date = new Date(isoString);
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

let productData = orderList[0].products

let orderPage = '';

productData.forEach(()=>{
    let html = `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${convertToMonthDate(orderList[0].orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${converterFunc(orderList[0].totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderList[0].id}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-details-grid">
           
          </div>
        </div>

         
    `; 
    orderPage += html;
})

document.querySelector('.js-orders-grid').innerHTML = orderPage;

let productList = [];  

productData.forEach((product, index)=>{
     
    let html = `<div class="product-image-container">
              <img src="${getData(product.productId).image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${  
                    // console.log(product.productId)
                    getData(product.productId).name
                }
              </div>
              <div class="product-delivery-date">
                Arriving on: ${convertToMonthDate(product.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${getData(product.productId).quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`
            productList += html;
})

document.querySelector('.js-order-details-grid').innerHTML = productList; 
cartDataInstance.cartQuantityCalc();
console.log(cartDataInstance.cartData)

// orderList[0].products.forEach(()=>{
//     orderList[0].products.id == cartDataInstance.cartData
// })

function getData(id){ 
    let matchingProduct
    cartDataInstance.cartData.forEach((item, index)=>{
        if(item.productId == id){ 
            matchingProduct = item; 
        }
    })
    return matchingProduct; 
}