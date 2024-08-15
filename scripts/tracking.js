import { orderList } from "../data/orders.js";
import { loadBackendProductListUsingFetch, productData } from "../data/products.js";
import { convertToMonthDate } from "./utils/convertToMonthDate.js";
import { cartDataInstance } from "../data/cart - class.js";

cartDataInstance.cartQuantityCalc();

// console.log(orderList);
let url = new URL(window.location.href);
      
// console.log(url.searchParams.get('orderID'))
// console.log(url.searchParams.get('productID'))
// console.log(url)

let productID = url.searchParams.get('productID'); 
let orderID = url.searchParams.get('orderID'); 

loadBackendProductListUsingFetch().then(()=>{
    let matchingItem;
    let matchingItemOrderDetails;
    let matchingDataArray = []; 
    productData.forEach((item,index)=>{
        if(item.id === productID){ 
            matchingItem = item; 
        }
    })
    orderList.forEach((item,index)=>{
        if(item.id === orderID){ 
            item.products.forEach((item2,index2)=>{
                if(item2.productId === productID){
                    matchingItemOrderDetails = item2;
                }
            })
            // matchingItemOrderDetails = item; 
        }
    })
    matchingDataArray.push(matchingItem);
    matchingDataArray.push(matchingItemOrderDetails);

    // console.log(productData)
    // console.log(orderList)
    // console.log('---------------')
    // console.log(matchingItem.name);
    // console.log(matchingItemOrderDetails);
    // console.log(matchingData);
    return matchingDataArray; 
}).then((matchingDataArray)=>{
    let trackingPage = '';
    console.log('------------')
    console.log(matchingDataArray[0]);
    console.log(matchingDataArray[1]);
    console.log('-------------')
    
        let html = `
        <div class="delivery-date">
            Arriving on ${convertToMonthDate(matchingDataArray[1].estimatedDeliveryTime)}
          </div>
  
          <div class="product-info">
            ${matchingDataArray[0].name}
          </div>
  
          <div class="product-info">
            Quantity: ${matchingDataArray[1].quantity}
          </div>
  
          <img class="product-image" src=" ${matchingDataArray[0].image}">
    `;


     
    document.querySelector('.js-tracking-product-details').innerHTML = html;
})

// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// let today = dayjs().format('d');
// console.log(today)
// console.log('--------test')
// console.log(orderList)

