// named export vs default export >>> curly or without curly

// import { cartData,removeCartItem, saveCartDataFunc,updateCartStorage, dateCalculation } from "../data/cart.js";
// import { productData } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOption.js";
import { converterFunc } from "./utils/currencyConverter.js";
// import '../data/cart - oop.js';
import '../data/cart - class.js';
import { cartDataInstance } from "../data/cart - class.js";
// loading external libraries with ESM

import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// import {dayjs} from 'https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.2/dist/index.mjs';

import '../data/car.js';
// import '../data/backend.js';

import { loadBackendProductList, loadBackendProductListUsingFetch} from "../data/products.js";
import { loadBackendCartList } from "../data/cart - class.js";
import { loadBackendCartListUsingFetch } from "../data/cart - class.js";

// async, await vs promise vs callback 

// async 

// function loadPage(){   // return a promise
//   return new Promise((resolve)=>{
//     console.log('new page'); 
//     resolve();
//   })
// }


async function loadPage() {  // return a promise
  
  try{
      // throw 'error1';
        console.log('load page async');
      // we don't even need to wait for the product list in 
      // checkout page
      await loadBackendProductListUsingFetch(); // load the product and wait

      await new Promise((resolve, reject)=>{ // load the cart and wait
        // throw 'error in present'; 
        loadBackendCartList(()=>{ 
          // reject('error in future'); // reject is a function
          resolve(); // if value given to resolve('value1'), 
                      // await will return that and can be saved in 
                      // a variable like 'let var = await new Promise ... '                  
        })
      })

      callBackLoadProductWait(); // render the page
    
  }catch(error){ 
    console.log('unexpected error. Please try again later');
    console.log(error);
  }; 
  
  
}

loadPage();  // can be added next step with then(). 

// async function loadPage() {  // return a promise
//   console.log('load page async');
//   return 'value1';
// }

// loadPage().then((value)=>{
//   console.log('next step async');
//   console.log(value);
// })

// Promises vs Callback

// loading Product list and Cart list from backend at the same time


// Promise.all([
//   loadBackendProductListUsingFetch()
//   // loadBackendCartListUsingFetch()
  
//   /*new Promise((resolve)=>{
//     console.log('starting promise function');
  
//     loadBackendProductList(()=>{       // load 
//       console.log('finish loading product list');
//       resolve('value1');    // wait
//     }); 
  
//   })*/,
//   new Promise((resolve)=>{

//     loadBackendCartList(()=>{
//       console.log('finish loading cart list');
//       resolve('value2');
//     });

//   })

// ]).then((value)=>{
//   console.log(value);
//   console.log(value[0])
//   callBackLoadProductWait();
// })

// loading Product list and Cart list from backend one after another
/*
new Promise((resolve)=>{
  console.log('starting promise function');

  loadBackendProductList(()=>{       // load 
    console.log('finish loading product list');
    resolve('value1');    // wait
  }); 

}).then((value)=>{  // and then 
  console.log(value);
  return new Promise((resolve)=>{

    loadBackendCartList(()=>{
      console.log('finish loading cart list');
      resolve();
    })

  })
}).then(()=>{

  console.log('next step of promise');
  callBackLoadProductWait();   // render

});
*/

// loadBackendProductList(callBackLoadProductWait);


/*
loadBackendProductList(()=>{
  loadBackendCartList(()=>{
    callBackLoadProductWait();
  });
});
*/

// callBackLoadProductWait();
function callBackLoadProductWait(){ 
    hello();
    // dayjs module loading 

    // localStorage.removeItem('cartData');

    let currentDate = dayjs();
    console.log(currentDate);
    let sevenDayAdvance = currentDate.add(7, 'day'); 

    let sevenDayAdvanceFormatted = sevenDayAdvance.format('dddd, MMMM D'); 

    console.log(sevenDayAdvanceFormatted);

    let isNewCartCreated = false;
    let deliveryOptionSection  = '';



    function deliveryOptionGenerator(addedProductProductId){  
      let deliveryOptionSectionhtmlGen = ''; 
      deliveryOptions.forEach((option, index)=>{
          //
          let todayDate = dayjs().format('d');
          let day; 
          day = option.deliveryDays; 

          if(todayDate == 0 || todayDate == 6) { 
            console.log('it\'s weekend');
            if(todayDate == 6 && day == 1 ){ 
              day = 2 ; 
            }
            if (todayDate == 0 && day == 7 ){ 
              day = 8 ; 
            }
            if (todayDate == 6 && day == 7){ 
              day = 9;
            }
          }else{ 
            console.log('it\s a weekday');
            if(todayDate == 3 && day == 3) { 
              day = 5 ; 
            }
            
            if(todayDate == 5 && day == 1 ){ 
              day = 3; 
            }
        
            if(todayDate == 4 && day == 3){ 
              day = 4;
            }
        
          }
        
          let daysOpt = dayjs().add(day, 'day');
          let date = daysOpt.format('dddd, MMMM D');
          //
          let priceMessage = ''; 
          if(option.id == 1 ){ 
            priceMessage = 'FREE Shipping';
          }else{ 
            priceMessage = '$' + converterFunc(option.deliveryPirceCent) + ' - ' + 'Shipping';  
          }

          let productItemID = addedProductProductId.itemID; 
          let htmlGen = `
                        <div class="delivery-option" data-product-id = ${addedProductProductId.productId} data-delivery-id = ${option.id}>
                          <input type="radio" ${option.id == productItemID?'checked' : ''} class="delivery-option-input" value="${[priceMessage, date]} > <!-- name="delivery-option-${addedProductProductId}" value="${[priceMessage, date]}" -->
                            <div>
                              <div class="delivery-option-date">
                                ${date}
                              </div>
                              <div class="delivery-option-price-${addedProductProductId.productId}">
                                ${priceMessage}
                              </div>
                          </div>
                        </div>
                      
        `
        deliveryOptionSectionhtmlGen += htmlGen ;
      })

      return deliveryOptionSectionhtmlGen; 

    }

    // let day ; 
    // let daysOpt = dayjs().add(Number(day), 'day');
    // let date = daysOpt.format('dddd, MMMM D');
    function dataGenerator(){
            let checkoutPageGenerator = ''; 
            let totalCost = 0; 
            cartDataInstance.cartData.forEach((addedProduct, index)=>{

                // let productItemId = addedProduct.productId; 
                // let matchingItem ; 
                // productData.forEach((eachProduct, index)=>{ 
                //     if(eachProduct.id === productItemId){ 
                //         matchingItem = eachProduct ; 
                //     }
                // })
                // console.log(matchingItem);
                // ${dayjs().add(1,"days").format('dddd, MMMM D')}
                console.log(cartDataInstance.dateCalculation(addedProduct));
                let placeHolderDate = cartDataInstance.dateCalculation(addedProduct);
                let placeHolderPrice = cartDataInstance.dateCalculation(addedProduct); // need to figure out how to add all of the second element of array
                totalCost += Number(placeHolderPrice.slice(0)[1]);
                document.querySelector('.js-shipping-handling').innerHTML = `$${totalCost}`; 


                let htmlGen = `<div class="cart-item-container-${addedProduct.productId}">
                          <div class="delivery-date delivery-date-${addedProduct.productId}">
                            Delivery date: ${placeHolderDate.slice(0)[0]}
                          </div>
              
                          <div class="cart-item-details-grid">
                            <img class="product-image"
                              src="${addedProduct.image}">
              
                            <div class="cart-item-details">
                              <div class="product-name">
                                ${addedProduct.name}
                              </div>
                              <div class="product-price">
                                $${addedProduct.price}
                              </div>
                              <div class="product-quantity">
                                <span>
                                  Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary js-update-quantity" data-update-product = ${addedProduct.productId}>
                                  Update
                                </span>

                                <span class = "edit-product-quantity-${addedProduct.productId} editing-quantity save-quantity">
                                  <input class = "quantity-input quantity-input-${addedProduct.productId}" onkeydown="
                                    console.log(event.key);
                                  ">
                                  <span class = "save-quantity-link-${addedProduct.productId} link-primary">save</span>
                                </span>

                                <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.productId} >
                                  Delete
                                </span>
                              </div>
                            </div>
                            <div class="delivery-options">
                              <div class="delivery-options-title">
                                Choose a delivery option:
                              </div>

                              <div class = "delivery-options-${addedProduct.productId} btn-group-${addedProduct.productId}" data-toggle="buttons" >
                                ${deliveryOptionGenerator(addedProduct)}
                              </div>
                            
                            </div>

                              

                            </div>
                          </div>
                        </div>`
                        checkoutPageGenerator += htmlGen;

                        // console.log(document.getElementsByName(`delivery-option-${addedProduct.productId}`))

              })
              document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;


            // console.log(cartData.length);

            // document.querySelectorAll('.delivery-option').forEach((item, index)=>{
            //   let productData = item.dataset.productId ; 
            //   let productId = item.dataset.deliveryId;
            //   // updateCartStorage(productData, productId);
            //   // saveCartDataFunc(cartData);
            //   console.log(productId);
            //   // let day ; 
            //   deliveryOptions.forEach((options,index)=>{
            //     if(options.id == productId) {
            //       day = options.deliveryDays; 
            //     } 
            //   })
            //   let daysOpt = dayjs().add(Number(day), 'day');
            //   let date = daysOpt.format('dddd, MMMM D');
            //   // let priceMessage = ''; 
            //   // if(option.id == 1 ){ 
            //   //   priceMessage = 'FREE Shipping';
            //   // }else{ 
            //   //   priceMessage = '$' + option.deliveryPirceCent/100 + ' - ' + 'Shipping';  
            //   // }
            //   document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
            // })

            document.querySelectorAll('.delivery-option').forEach((item, index)=>{
              item.addEventListener('click', ()=>{
                let productData = item.dataset.productId ; 
                let productId = item.dataset.deliveryId;
                let date = cartDataInstance.updateCartStorage(productData, productId, deliveryOptions);
                
                // console.log(date)
                document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
                cartDataInstance.saveCartDataFunc(cartDataInstance.cartData);
                dataGenerator();
                // console.log(productId);
                // let day ; 
                // deliveryOptions.forEach((options,index)=>{
                //   if(options.id == productId) {
                //     day = options.deliveryDays; 
                //   } 
                // })
                // let daysOpt = dayjs().add(Number(day), 'day');
                // let date = daysOpt.format('dddd, MMMM D');
                // document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
                // saveCartDataFunc(cartData);
                deliveryOptions.forEach((option, index)=>{})

              })
            })

    // cartData.forEach((item)=>{

      

    // })




    // let nameArray = []; 
    // cartData.forEach((item,index)=>{
    //   var ele = document.getElementsByName(`delivery-option-${item.productId}`);
    //   // console.log(ele)
    //   ele.forEach((i)=>{
    //     // console.log(i.name)
    //     nameArray.push(i.name);
    //   }) 
    // })
    // console.log(nameArray);

    // document.querySelector('delivery-option-input')

    // cartData.forEach((item, index)=>{
      
    //   document.querySelector(`.delivery-options-${item.productId}`).innerHTML = deliveryOptionSection;

    // })



    let totalCartItem = 0 ;
    let totalExpanse = 0 ; 
    let shippingHandling = 9.99 ;


    cartDataInstance.cartData.forEach((item, index)=>{ 
      totalCartItem += item.quantity;
      totalExpanse += (Number(item.price) * Number(item.quantity));
      
      
      // document.querySelector(`.btn-group-${item.productId}`).addEventListener("click", (evt)=>{
      //   let shippingHandling2 = 0 
      //   if(evt.target.type === "radio"){

      //   let datePriceArray = evt.target.value; 
      //   document.querySelector(`.delivery-date-${item.productId}`).innerHTML = `Delivery date: ${datePriceArray.split(',').slice(1).join(',').trim()}`;
      
      //   shippingHandling = datePriceCal(datePriceArray); 
            
      //   }
      //   orderSummary();
      //   });
    })

    function datePriceCal(datePriceArray){
      let shippingHandling2 = 0 ; 
      if(datePriceArray == "FREE Shipping,Tuesday, July 2"){
        shippingHandling2 = 0;
      }else if (datePriceArray == "$4.99 - Shipping,Friday, June 28") {
        shippingHandling2 = 4.99; 
      }else if (datePriceArray == "$9.99 - Shipping,Wednesday, June 26") { 
        shippingHandling2 = 9.99;
      }
      return Number(shippingHandling2);
    }
    orderSummary(totalCost);

    function orderSummary(totalCost){
                if(totalCartItem == 0 ) { 
                  shippingHandling = 0;
                } else { 
                  shippingHandling = totalCost;
                }

                let totalBeforeTax = (totalExpanse + shippingHandling).toFixed(2);
                let estTax = (totalBeforeTax*0.1).toFixed(2);
                let orderTotal = (Number(totalBeforeTax) + Number(estTax)).toFixed(2);

                // if(totalExpanse >= 40) { 

                //   document.querySelector('.js-free-shipping').innerHTML = `-$${shippingHandling}`;
                //   document.querySelector('.freeShipping').style.display = 'grid';
                //   orderTotal = (Number(orderTotal - shippingHandling)).toFixed(2);
                  
                // }

                document.querySelector('.js-check-out-items').innerHTML = `${totalCartItem} items`;

                document.querySelector('.js-payment-total-items-count').innerHTML = `Items (${totalCartItem}):`;

                document.querySelector('.js-payment-products-expanse').innerHTML = `$${totalExpanse.toFixed(2)}`;

                // document.querySelector('.js-shipping-handling').innerHTML = `$${shippingHandling}`; 

                document.querySelector('.js-total-before-tax').innerHTML = `$${totalBeforeTax}`;

                document.querySelector('.js-est-tax').innerHTML = `$${estTax}`;

                document.querySelector('.js-order-total').innerHTML = `$${orderTotal}`;

    }

    document.querySelectorAll('.js-remove-cart-item').forEach((cartItem, index)=>{ 
      cartItem.addEventListener('click',()=>{

        // console.log(cartItem.dataset.removeItem);
        let itemId = cartItem.dataset.removeItem ; 
        console.log(itemId); 


        // document.querySelector(`.cart-item-container-${itemId}`).remove();
        // console.log(document.querySelector(`.cart-item-container-${itemId}`));

        let newCart = cartDataInstance.removeCartItem(itemId);

        // location.reload();
        console.log(cartDataInstance.removeCartItem(itemId))

        
        // console.log(newCart);
        // console.log(Boolean(newCart));
        // console.log(newCart.length)
        console.log(newCart.length);
        // localStorage.removeItem('cartData');
        // saveCartDa taFunc(newCart);
        // pageGen(newCart);
        dataGenerator();
        


        
        // if(newCart.length!=0){
        //   console.log('new cart created');
        //   newCart.forEach((addedProduct, index)=>{

        //     let htmlGen = `<div class="cart-item-container">
        //               <div class="delivery-date">
        //                 Delivery date: Tuesday, June 21
        //               </div>
          
        //               <div class="cart-item-details-grid">
        //                 <img class="product-image"
        //                   src="${addedProduct.image}">
          
        //                 <div class="cart-item-details">
        //                   <div class="product-name">
        //                     ${addedProduct.name}
        //                   </div>
        //                   <div class="product-price">
        //                     $${addedProduct.price}
        //                   </div>
        //                   <div class="product-quantity">
        //                     <span>
        //                       Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
        //                     </span>
        //                     <span class="update-quantity-link link-primary">
        //                       Update
        //                     </span>
        //                     <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.id} >
        //                       Delete
        //                     </span>
        //                   </div>
        //                 </div>
          
        //                 <div class="delivery-options">
        //                   <div class="delivery-options-title">
        //                     Choose a delivery option:
        //                   </div>
        //                   <div class="delivery-option">
        //                     <input type="radio" checked
        //                       class="delivery-option-input"
        //                       name="delivery-option-${addedProduct.id}">
        //                     <div>
        //                       <div class="delivery-option-date">
        //                         Tuesday, June 21
        //                       </div>
        //                       <div class="delivery-option-price">
        //                         FREE Shipping
        //                       </div>
        //                     </div>
        //                   </div>
        //                   <div class="delivery-option">
        //                     <input type="radio"
        //                       class="delivery-option-input"
        //                       name="delivery-option-${addedProduct.id}">
        //                     <div>
        //                       <div class="delivery-option-date">
        //                         Wednesday, June 15
        //                       </div>
        //                       <div class="delivery-option-price">
        //                         $4.99 - Shipping
        //                       </div>
        //                     </div>
        //                   </div>
        //                   <div class="delivery-option">
        //                     <input type="radio"
        //                       class="delivery-option-input"
        //                       name="delivery-option-${addedProduct.id}">
        //                     <div>
        //                       <div class="delivery-option-date">
        //                         Monday, June 13
        //                       </div>
        //                       <div class="delivery-option-price">
        //                         $9.99 - Shipping
        //                       </div>
        //                     </div>
        //                   </div>
        //                 </div>
        //               </div>
        //             </div>`
        //             checkoutPageGenerator = '';
        //             checkoutPageGenerator += htmlGen; 
        //             document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;
        //             console.log(checkoutPageGenerator)

        //   })
        // }else if(newCart.length == 0 ){
        //   document.querySelector('.js-order-summary').innerHTML = `no item`;
        // }

        
      })
    });

    function pageGen (newCart){
      newCart.forEach((addedProduct, index)=>{
        let htmlGen = `<div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${addedProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${addedProduct.name}
            </div>
            <div class="product-price">
              $${addedProduct.price}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.id} >
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${addedProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${addedProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${addedProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
      checkoutPageGenerator = '';
      checkoutPageGenerator += htmlGen; 
      document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;

          

      })
    
    }

    document.querySelectorAll('.js-update-quantity').forEach((update,index)=>{ 
      update.addEventListener('click',()=>{
        console.log(update.dataset.updateProduct);
        let productDataId = update.dataset.updateProduct;
        
        document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('editing-quantity');
        document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('is-editing-quantity');

        document.querySelector(`.save-quantity-link-${productDataId}`).addEventListener('click',()=>{
          let editedQuantity = Number(document.querySelector(`.quantity-input-${productDataId}`).value);
          cartDataInstance.cartData.forEach((data,index)=>{
            if(data.productId === productDataId){
              data.quantity = editedQuantity;
              cartDataInstance.saveCartDataFunc(cartDataInstance.cartData);
            }
          })
          console.log(editedQuantity); 
          document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('is-editing-quantity');
          document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('editing-quantity');
          dataGenerator();
          // location.reload();
        })
        
      })
    })

    function editSaveQuantityFunc(productDataId){

      document.querySelector(`.save-quantity-link-${productDataId}`).addEventListener('click',()=>{
        let editedQuantity = Number(document.querySelector(`.quantity-input-${productDataId}`).value);
        cartDataInstance.cartData.forEach((data,index)=>{
          if(data.productId === productDataId){
            data.quantity = editedQuantity;
            cartDataInstance.saveCartDataFunc(cartDataInstance.cartData);
          }
        })
        console.log(editedQuantity); 
        document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('is-editing-quantity');
        document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('editing-quantity');
        
        location.reload();
      })
    }

    }

    dataGenerator();

    // import { dataGenerator } from "./checkout/ordersummary.js";

    // dataGenerator();
}

/*
hello();
// dayjs module loading 

// localStorage.removeItem('cartData');

let currentDate = dayjs();
console.log(currentDate);
let sevenDayAdvance = currentDate.add(7, 'day'); 

let sevenDayAdvanceFormatted = sevenDayAdvance.format('dddd, MMMM D'); 

console.log(sevenDayAdvanceFormatted);

let isNewCartCreated = false;
let deliveryOptionSection  = '';



function deliveryOptionGenerator(addedProductProductId){  
  let deliveryOptionSectionhtmlGen = ''; 
  deliveryOptions.forEach((option, index)=>{
      //
      let todayDate = dayjs().format('d');
      let day; 
      day = option.deliveryDays; 

      if(todayDate == 0 || todayDate == 6) { 
        console.log('it\'s weekend');
        if(todayDate == 6 && day == 1 ){ 
          day = 2 ; 
        }
        if (todayDate == 0 && day == 7 ){ 
          day = 8 ; 
        }
        if (todayDate == 6 && day == 7){ 
          day = 9;
        }
      }else{ 
        console.log('it\s a weekday');
        if(todayDate == 3 && day == 3) { 
          day = 5 ; 
        }
        
        if(todayDate == 5 && day == 1 ){ 
          day = 3; 
        }
    
        if(todayDate == 4 && day == 3){ 
          day = 4;
        }
    
      }
    
      let daysOpt = dayjs().add(day, 'day');
      let date = daysOpt.format('dddd, MMMM D');
      //
      let priceMessage = ''; 
      if(option.id == 1 ){ 
        priceMessage = 'FREE Shipping';
      }else{ 
        priceMessage = '$' + converterFunc(option.deliveryPirceCent) + ' - ' + 'Shipping';  
      }

      let productItemID = addedProductProductId.itemID; 
      let htmlGen = `
                    <div class="delivery-option" data-product-id = ${addedProductProductId.productId} data-delivery-id = ${option.id}>
                      <input type="radio" ${option.id == productItemID?'checked' : ''} class="delivery-option-input" value="${[priceMessage, date]} > <!-- name="delivery-option-${addedProductProductId}" value="${[priceMessage, date]}" -->
                        <div>
                          <div class="delivery-option-date">
                            ${date}
                          </div>
                          <div class="delivery-option-price-${addedProductProductId.productId}">
                            ${priceMessage}
                          </div>
                      </div>
                    </div>
                  
    `
    deliveryOptionSectionhtmlGen += htmlGen ;
  })

  return deliveryOptionSectionhtmlGen; 

}

// let day ; 
// let daysOpt = dayjs().add(Number(day), 'day');
// let date = daysOpt.format('dddd, MMMM D');
export function dataGenerator(){
        let checkoutPageGenerator = ''; 
        let totalCost = 0; 
        cartDataInstance.cartData.forEach((addedProduct, index)=>{

            // let productItemId = addedProduct.productId; 
            // let matchingItem ; 
            // productData.forEach((eachProduct, index)=>{ 
            //     if(eachProduct.id === productItemId){ 
            //         matchingItem = eachProduct ; 
            //     }
            // })
            // console.log(matchingItem);
            // ${dayjs().add(1,"days").format('dddd, MMMM D')}
            console.log(cartDataInstance.dateCalculation(addedProduct));
            let placeHolderDate = cartDataInstance.dateCalculation(addedProduct);
            let placeHolderPrice = cartDataInstance.dateCalculation(addedProduct); // need to figure out how to add all of the second element of array
            totalCost += Number(placeHolderPrice.slice(0)[1]);
            document.querySelector('.js-shipping-handling').innerHTML = `$${totalCost}`; 


            let htmlGen = `<div class="cart-item-container-${addedProduct.productId}">
                      <div class="delivery-date delivery-date-${addedProduct.productId}">
                        Delivery date: ${placeHolderDate.slice(0)[0]}
                      </div>
          
                      <div class="cart-item-details-grid">
                        <img class="product-image"
                          src="${addedProduct.image}">
          
                        <div class="cart-item-details">
                          <div class="product-name">
                            ${addedProduct.name}
                          </div>
                          <div class="product-price">
                            $${addedProduct.price}
                          </div>
                          <div class="product-quantity">
                            <span>
                              Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-quantity" data-update-product = ${addedProduct.productId}>
                              Update
                            </span>

                            <span class = "edit-product-quantity-${addedProduct.productId} editing-quantity save-quantity">
                              <input class = "quantity-input quantity-input-${addedProduct.productId}" onkeydown="
                                console.log(event.key);
                              ">
                              <span class = "save-quantity-link-${addedProduct.productId} link-primary">save</span>
                            </span>

                            <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.productId} >
                              Delete
                            </span>
                          </div>
                        </div>
                        <div class="delivery-options">
                          <div class="delivery-options-title">
                            Choose a delivery option:
                          </div>

                          <div class = "delivery-options-${addedProduct.productId} btn-group-${addedProduct.productId}" data-toggle="buttons" >
                            ${deliveryOptionGenerator(addedProduct)}
                          </div>
                        
                        </div>

                          

                        </div>
                      </div>
                    </div>`
                    checkoutPageGenerator += htmlGen;

                    // console.log(document.getElementsByName(`delivery-option-${addedProduct.productId}`))

          })
          document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;


        // console.log(cartData.length);

        // document.querySelectorAll('.delivery-option').forEach((item, index)=>{
        //   let productData = item.dataset.productId ; 
        //   let productId = item.dataset.deliveryId;
        //   // updateCartStorage(productData, productId);
        //   // saveCartDataFunc(cartData);
        //   console.log(productId);
        //   // let day ; 
        //   deliveryOptions.forEach((options,index)=>{
        //     if(options.id == productId) {
        //       day = options.deliveryDays; 
        //     } 
        //   })
        //   let daysOpt = dayjs().add(Number(day), 'day');
        //   let date = daysOpt.format('dddd, MMMM D');
        //   // let priceMessage = ''; 
        //   // if(option.id == 1 ){ 
        //   //   priceMessage = 'FREE Shipping';
        //   // }else{ 
        //   //   priceMessage = '$' + option.deliveryPirceCent/100 + ' - ' + 'Shipping';  
        //   // }
        //   document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
        // })

        document.querySelectorAll('.delivery-option').forEach((item, index)=>{
          item.addEventListener('click', ()=>{
            let productData = item.dataset.productId ; 
            let productId = item.dataset.deliveryId;
            let date = cartDataInstance.updateCartStorage(productData, productId, deliveryOptions);
            
            // console.log(date)
            document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
            cartDataInstance.saveCartDataFunc(cartDataInstance.cartData);
            dataGenerator();
            // console.log(productId);
            // let day ; 
            // deliveryOptions.forEach((options,index)=>{
            //   if(options.id == productId) {
            //     day = options.deliveryDays; 
            //   } 
            // })
            // let daysOpt = dayjs().add(Number(day), 'day');
            // let date = daysOpt.format('dddd, MMMM D');
            // document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
            // saveCartDataFunc(cartData);
            deliveryOptions.forEach((option, index)=>{})

          })
        })

// cartData.forEach((item)=>{

  

// })




// let nameArray = []; 
// cartData.forEach((item,index)=>{
//   var ele = document.getElementsByName(`delivery-option-${item.productId}`);
//   // console.log(ele)
//   ele.forEach((i)=>{
//     // console.log(i.name)
//     nameArray.push(i.name);
//   }) 
// })
// console.log(nameArray);

// document.querySelector('delivery-option-input')

// cartData.forEach((item, index)=>{
  
//   document.querySelector(`.delivery-options-${item.productId}`).innerHTML = deliveryOptionSection;

// })



let totalCartItem = 0 ;
let totalExpanse = 0 ; 
let shippingHandling = 9.99 ;


cartDataInstance.cartData.forEach((item, index)=>{ 
  totalCartItem += item.quantity;
  totalExpanse += (Number(item.price) * Number(item.quantity));
  
  
  // document.querySelector(`.btn-group-${item.productId}`).addEventListener("click", (evt)=>{
  //   let shippingHandling2 = 0 
  //   if(evt.target.type === "radio"){

  //   let datePriceArray = evt.target.value; 
  //   document.querySelector(`.delivery-date-${item.productId}`).innerHTML = `Delivery date: ${datePriceArray.split(',').slice(1).join(',').trim()}`;
  
  //   shippingHandling = datePriceCal(datePriceArray); 
        
  //   }
  //   orderSummary();
  //   });
})

function datePriceCal(datePriceArray){
  let shippingHandling2 = 0 ; 
  if(datePriceArray == "FREE Shipping,Tuesday, July 2"){
    shippingHandling2 = 0;
  }else if (datePriceArray == "$4.99 - Shipping,Friday, June 28") {
    shippingHandling2 = 4.99; 
  }else if (datePriceArray == "$9.99 - Shipping,Wednesday, June 26") { 
    shippingHandling2 = 9.99;
  }
  return Number(shippingHandling2);
}
orderSummary(totalCost);

function orderSummary(totalCost){
            if(totalCartItem == 0 ) { 
              shippingHandling = 0;
            } else { 
              shippingHandling = totalCost;
            }

            let totalBeforeTax = (totalExpanse + shippingHandling).toFixed(2);
            let estTax = (totalBeforeTax*0.1).toFixed(2);
            let orderTotal = (Number(totalBeforeTax) + Number(estTax)).toFixed(2);

            // if(totalExpanse >= 40) { 

            //   document.querySelector('.js-free-shipping').innerHTML = `-$${shippingHandling}`;
            //   document.querySelector('.freeShipping').style.display = 'grid';
            //   orderTotal = (Number(orderTotal - shippingHandling)).toFixed(2);
              
            // }

            document.querySelector('.js-check-out-items').innerHTML = `${totalCartItem} items`;

            document.querySelector('.js-payment-total-items-count').innerHTML = `Items (${totalCartItem}):`;

            document.querySelector('.js-payment-products-expanse').innerHTML = `$${totalExpanse.toFixed(2)}`;

            // document.querySelector('.js-shipping-handling').innerHTML = `$${shippingHandling}`; 

            document.querySelector('.js-total-before-tax').innerHTML = `$${totalBeforeTax}`;

            document.querySelector('.js-est-tax').innerHTML = `$${estTax}`;

            document.querySelector('.js-order-total').innerHTML = `$${orderTotal}`;

}

document.querySelectorAll('.js-remove-cart-item').forEach((cartItem, index)=>{ 
  cartItem.addEventListener('click',()=>{

    // console.log(cartItem.dataset.removeItem);
    let itemId = cartItem.dataset.removeItem ; 
    console.log(itemId); 


    // document.querySelector(`.cart-item-container-${itemId}`).remove();
    // console.log(document.querySelector(`.cart-item-container-${itemId}`));

    let newCart = cartDataInstance.removeCartItem(itemId);

    // location.reload();
    console.log(cartDataInstance.removeCartItem(itemId))

    
    // console.log(newCart);
    // console.log(Boolean(newCart));
    // console.log(newCart.length)
    console.log(newCart.length);
    // localStorage.removeItem('cartData');
    // saveCartDa taFunc(newCart);
    // pageGen(newCart);
    dataGenerator();
    


    
    // if(newCart.length!=0){
    //   console.log('new cart created');
    //   newCart.forEach((addedProduct, index)=>{

    //     let htmlGen = `<div class="cart-item-container">
    //               <div class="delivery-date">
    //                 Delivery date: Tuesday, June 21
    //               </div>
      
    //               <div class="cart-item-details-grid">
    //                 <img class="product-image"
    //                   src="${addedProduct.image}">
      
    //                 <div class="cart-item-details">
    //                   <div class="product-name">
    //                     ${addedProduct.name}
    //                   </div>
    //                   <div class="product-price">
    //                     $${addedProduct.price}
    //                   </div>
    //                   <div class="product-quantity">
    //                     <span>
    //                       Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
    //                     </span>
    //                     <span class="update-quantity-link link-primary">
    //                       Update
    //                     </span>
    //                     <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.id} >
    //                       Delete
    //                     </span>
    //                   </div>
    //                 </div>
      
    //                 <div class="delivery-options">
    //                   <div class="delivery-options-title">
    //                     Choose a delivery option:
    //                   </div>
    //                   <div class="delivery-option">
    //                     <input type="radio" checked
    //                       class="delivery-option-input"
    //                       name="delivery-option-${addedProduct.id}">
    //                     <div>
    //                       <div class="delivery-option-date">
    //                         Tuesday, June 21
    //                       </div>
    //                       <div class="delivery-option-price">
    //                         FREE Shipping
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div class="delivery-option">
    //                     <input type="radio"
    //                       class="delivery-option-input"
    //                       name="delivery-option-${addedProduct.id}">
    //                     <div>
    //                       <div class="delivery-option-date">
    //                         Wednesday, June 15
    //                       </div>
    //                       <div class="delivery-option-price">
    //                         $4.99 - Shipping
    //                       </div>
    //                     </div>
    //                   </div>
    //                   <div class="delivery-option">
    //                     <input type="radio"
    //                       class="delivery-option-input"
    //                       name="delivery-option-${addedProduct.id}">
    //                     <div>
    //                       <div class="delivery-option-date">
    //                         Monday, June 13
    //                       </div>
    //                       <div class="delivery-option-price">
    //                         $9.99 - Shipping
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>`
    //             checkoutPageGenerator = '';
    //             checkoutPageGenerator += htmlGen; 
    //             document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;
    //             console.log(checkoutPageGenerator)

    //   })
    // }else if(newCart.length == 0 ){
    //   document.querySelector('.js-order-summary').innerHTML = `no item`;
    // }

    
  })
});

function pageGen (newCart){
  newCart.forEach((addedProduct, index)=>{
    let htmlGen = `<div class="cart-item-container">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${addedProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${addedProduct.name}
        </div>
        <div class="product-price">
          $${addedProduct.price}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.id} >
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${addedProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${addedProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${addedProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
  checkoutPageGenerator = '';
  checkoutPageGenerator += htmlGen; 
  document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;

      

  })

}

document.querySelectorAll('.js-update-quantity').forEach((update,index)=>{ 
  update.addEventListener('click',()=>{
    console.log(update.dataset.updateProduct);
    let productDataId = update.dataset.updateProduct;
    
    document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('editing-quantity');
    document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('is-editing-quantity');

    document.querySelector(`.save-quantity-link-${productDataId}`).addEventListener('click',()=>{
      let editedQuantity = Number(document.querySelector(`.quantity-input-${productDataId}`).value);
      cartDataInstance.cartData.forEach((data,index)=>{
        if(data.productId === productDataId){
          data.quantity = editedQuantity;
          cartDataInstance.saveCartDataFunc(cartDataInstance.cartData);
        }
      })
      console.log(editedQuantity); 
      document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('is-editing-quantity');
      document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('editing-quantity');
      dataGenerator();
      // location.reload();
    })
    
  })
})

function editSaveQuantityFunc(productDataId){

  document.querySelector(`.save-quantity-link-${productDataId}`).addEventListener('click',()=>{
    let editedQuantity = Number(document.querySelector(`.quantity-input-${productDataId}`).value);
    cartDataInstance.cartData.forEach((data,index)=>{
      if(data.productId === productDataId){
        data.quantity = editedQuantity;
        cartDataInstance.saveCartDataFunc(cartDataInstance.cartData);
      }
    })
    console.log(editedQuantity); 
    document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('is-editing-quantity');
    document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('editing-quantity');
    
    location.reload();
  })
}

}

dataGenerator();

// import { dataGenerator } from "./checkout/ordersummary.js";

// dataGenerator();

*/