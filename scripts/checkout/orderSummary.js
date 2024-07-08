// // named export vs default export >>> curly or without curly

// import { cartData,removeCartItem, saveCartDataFunc,updateCartStorage, dateCalculation } from "../../data/cart.js";
// import { productData } from "../../data/products.js";
// import { deliveryOptions } from "../../data/deliveryOption.js";
// import { renderPaymentSummary } from "./paymentsummary.js";


// // loading external libraries with ESM

// import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; 
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
// // import {dayjs} from 'https://cdn.jsdelivr.net/npm/dayjs@2.0.0-alpha.2/dist/index.mjs';

// hello();
// // dayjs module loading 

// // localStorage.removeItem('cartData');

// let currentDate = dayjs();
// console.log(currentDate);
// let sevenDayAdvance = currentDate.add(7, 'day'); 

// let sevenDayAdvanceFormatted = sevenDayAdvance.format('dddd, MMMM D'); 

// console.log(sevenDayAdvanceFormatted);

// let isNewCartCreated = false;
// let deliveryOptionSection  = '';



// export function deliveryOptionGenerator(addedProductProductId){  
//   let deliveryOptionSectionhtmlGen = ''; 
//   deliveryOptions.forEach((option, index)=>{ 
//       let daysOpt = dayjs().add(option.deliveryDays, 'day');
//       let date = daysOpt.format('dddd, MMMM D');
//       let priceMessage = ''; 
//       if(option.id == 1 ){ 
//         priceMessage = 'FREE Shipping';
//       }else{ 
//         priceMessage = '$' + option.deliveryPirceCent/100 + ' - ' + 'Shipping';  
//       }

//       let productItemID = addedProductProductId.itemID; 
//       let htmlGen = `
//                     <div class="delivery-option" data-product-id = ${addedProductProductId.productId} data-delivery-id = ${option.id}>
//                       <input type="radio" ${option.id == productItemID?'checked' : ''} class="delivery-option-input" value="${[priceMessage, date]} > <!-- name="delivery-option-${addedProductProductId}" value="${[priceMessage, date]}" -->
//                         <div>
//                           <div class="delivery-option-date">
//                             ${date}
//                           </div>
//                           <div class="delivery-option-price-${addedProductProductId.productId}">
//                             ${priceMessage}
//                           </div>
//                       </div>
//                     </div>
                   
//     `
//     deliveryOptionSectionhtmlGen += htmlGen ;
//   })

//   return deliveryOptionSectionhtmlGen; 

// }

// // let day ; 
// // let daysOpt = dayjs().add(Number(day), 'day');
// // let date = daysOpt.format('dddd, MMMM D');
// export function dataGenerator(){
//         let checkoutPageGenerator = ''; 
//         let totalCost = 0; 
//         cartData.forEach((addedProduct, index)=>{

//             // let productItemId = addedProduct.productId; 
//             // let matchingItem ; 
//             // productData.forEach((eachProduct, index)=>{ 
//             //     if(eachProduct.id === productItemId){ 
//             //         matchingItem = eachProduct ; 
//             //     }
//             // })
//             // console.log(matchingItem);
//             // ${dayjs().add(1,"days").format('dddd, MMMM D')}
//             console.log(dateCalculation(addedProduct));
//             let placeHolderDate = dateCalculation(addedProduct);
//             let placeHolderPrice = dateCalculation(addedProduct); // need to figure out how to add all of the second element of array
//             totalCost += Number(placeHolderPrice.slice(0)[1]);
//             document.querySelector('.js-shipping-handling').innerHTML = `$${totalCost}`; 


//             let htmlGen = `<div class="cart-item-container-${addedProduct.productId}">
//                       <div class="delivery-date delivery-date-${addedProduct.productId}">
//                         Delivery date: ${placeHolderDate.slice(0)[0]}
//                       </div>
          
//                       <div class="cart-item-details-grid">
//                         <img class="product-image"
//                           src="${addedProduct.image}">
          
//                         <div class="cart-item-details">
//                           <div class="product-name">
//                             ${addedProduct.name}
//                           </div>
//                           <div class="product-price">
//                             $${addedProduct.price}
//                           </div>
//                           <div class="product-quantity">
//                             <span>
//                               Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
//                             </span>
//                             <span class="update-quantity-link link-primary js-update-quantity" data-update-product = ${addedProduct.productId}>
//                               Update
//                             </span>

//                             <span class = "edit-product-quantity-${addedProduct.productId} editing-quantity save-quantity">
//                               <input class = "quantity-input quantity-input-${addedProduct.productId}" onkeydown="
//                                 console.log(event.key);
//                               ">
//                               <span class = "save-quantity-link-${addedProduct.productId} link-primary">save</span>
//                             </span>

//                             <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.productId} >
//                               Delete
//                             </span>
//                           </div>
//                         </div>
//                         <div class="delivery-options">
//                           <div class="delivery-options-title">
//                             Choose a delivery option:
//                           </div>

//                           <div class = "delivery-options-${addedProduct.productId} btn-group-${addedProduct.productId}" data-toggle="buttons" >
//                             ${deliveryOptionGenerator(addedProduct)}
//                           </div>
                        
//                         </div>

                          

//                         </div>
//                       </div>
//                     </div>`
//                     checkoutPageGenerator += htmlGen;

//                     // console.log(document.getElementsByName(`delivery-option-${addedProduct.productId}`))

//           })
//           document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;


//         // console.log(cartData.length);

//         // document.querySelectorAll('.delivery-option').forEach((item, index)=>{
//         //   let productData = item.dataset.productId ; 
//         //   let productId = item.dataset.deliveryId;
//         //   // updateCartStorage(productData, productId);
//         //   // saveCartDataFunc(cartData);
//         //   console.log(productId);
//         //   // let day ; 
//         //   deliveryOptions.forEach((options,index)=>{
//         //     if(options.id == productId) {
//         //       day = options.deliveryDays; 
//         //     } 
//         //   })
//         //   let daysOpt = dayjs().add(Number(day), 'day');
//         //   let date = daysOpt.format('dddd, MMMM D');
//         //   // let priceMessage = ''; 
//         //   // if(option.id == 1 ){ 
//         //   //   priceMessage = 'FREE Shipping';
//         //   // }else{ 
//         //   //   priceMessage = '$' + option.deliveryPirceCent/100 + ' - ' + 'Shipping';  
//         //   // }
//         //   document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
//         // })

//         document.querySelectorAll('.delivery-option').forEach((item, index)=>{
//           item.addEventListener('click', ()=>{
//             let productData = item.dataset.productId ; 
//             let productId = item.dataset.deliveryId;
//             let date = updateCartStorage(productData, productId, deliveryOptions);
            
//             // console.log(date)
//             document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
//             saveCartDataFunc(cartData);
//             dataGenerator();
//             // console.log(productId);
//             // let day ; 
//             // deliveryOptions.forEach((options,index)=>{
//             //   if(options.id == productId) {
//             //     day = options.deliveryDays; 
//             //   } 
//             // })
//             // let daysOpt = dayjs().add(Number(day), 'day');
//             // let date = daysOpt.format('dddd, MMMM D');
//             // document.querySelector(`.delivery-date-${productData}`).innerHTML = `Delivery date: ${date} `;
//             // saveCartDataFunc(cartData);
//             deliveryOptions.forEach((option, index)=>{})

//           })
//         })

// // cartData.forEach((item)=>{

  

// // })




// // let nameArray = []; 
// // cartData.forEach((item,index)=>{
// //   var ele = document.getElementsByName(`delivery-option-${item.productId}`);
// //   // console.log(ele)
// //   ele.forEach((i)=>{
// //     // console.log(i.name)
// //     nameArray.push(i.name);
// //   }) 
// // })
// // console.log(nameArray);

// // document.querySelector('delivery-option-input')

// // cartData.forEach((item, index)=>{
  
// //   document.querySelector(`.delivery-options-${item.productId}`).innerHTML = deliveryOptionSection;

// // })


// renderPaymentSummary(totalCost);


// document.querySelectorAll('.js-remove-cart-item').forEach((cartItem, index)=>{ 
//   cartItem.addEventListener('click',()=>{

//     // console.log(cartItem.dataset.removeItem);
//     let itemId = cartItem.dataset.removeItem ; 
//     console.log(itemId); 


//     document.querySelector(`.cart-item-container-${itemId}`).remove();
//     // console.log(document.querySelector(`.cart-item-container-${itemId}`));

//     let newCart = removeCartItem(itemId);
//     location.reload();
//     console.log(removeCartItem(itemId))

    
//     // console.log(newCart);
//     // console.log(Boolean(newCart));
//     // console.log(newCart.length)
//     console.log(newCart.length);
//     // localStorage.removeItem('cartData');
//     // saveCartDa taFunc(newCart);
//     // pageGen(newCart);
    
    


    
//     // if(newCart.length!=0){
//     //   console.log('new cart created');
//     //   newCart.forEach((addedProduct, index)=>{

//     //     let htmlGen = `<div class="cart-item-container">
//     //               <div class="delivery-date">
//     //                 Delivery date: Tuesday, June 21
//     //               </div>
      
//     //               <div class="cart-item-details-grid">
//     //                 <img class="product-image"
//     //                   src="${addedProduct.image}">
      
//     //                 <div class="cart-item-details">
//     //                   <div class="product-name">
//     //                     ${addedProduct.name}
//     //                   </div>
//     //                   <div class="product-price">
//     //                     $${addedProduct.price}
//     //                   </div>
//     //                   <div class="product-quantity">
//     //                     <span>
//     //                       Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
//     //                     </span>
//     //                     <span class="update-quantity-link link-primary">
//     //                       Update
//     //                     </span>
//     //                     <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.id} >
//     //                       Delete
//     //                     </span>
//     //                   </div>
//     //                 </div>
      
//     //                 <div class="delivery-options">
//     //                   <div class="delivery-options-title">
//     //                     Choose a delivery option:
//     //                   </div>
//     //                   <div class="delivery-option">
//     //                     <input type="radio" checked
//     //                       class="delivery-option-input"
//     //                       name="delivery-option-${addedProduct.id}">
//     //                     <div>
//     //                       <div class="delivery-option-date">
//     //                         Tuesday, June 21
//     //                       </div>
//     //                       <div class="delivery-option-price">
//     //                         FREE Shipping
//     //                       </div>
//     //                     </div>
//     //                   </div>
//     //                   <div class="delivery-option">
//     //                     <input type="radio"
//     //                       class="delivery-option-input"
//     //                       name="delivery-option-${addedProduct.id}">
//     //                     <div>
//     //                       <div class="delivery-option-date">
//     //                         Wednesday, June 15
//     //                       </div>
//     //                       <div class="delivery-option-price">
//     //                         $4.99 - Shipping
//     //                       </div>
//     //                     </div>
//     //                   </div>
//     //                   <div class="delivery-option">
//     //                     <input type="radio"
//     //                       class="delivery-option-input"
//     //                       name="delivery-option-${addedProduct.id}">
//     //                     <div>
//     //                       <div class="delivery-option-date">
//     //                         Monday, June 13
//     //                       </div>
//     //                       <div class="delivery-option-price">
//     //                         $9.99 - Shipping
//     //                       </div>
//     //                     </div>
//     //                   </div>
//     //                 </div>
//     //               </div>
//     //             </div>`
//     //             checkoutPageGenerator = '';
//     //             checkoutPageGenerator += htmlGen; 
//     //             document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;
//     //             console.log(checkoutPageGenerator)

//     //   })
//     // }else if(newCart.length == 0 ){
//     //   document.querySelector('.js-order-summary').innerHTML = `no item`;
//     // }

    
//   })
// });

// function pageGen (newCart){
//   newCart.forEach((addedProduct, index)=>{
//     let htmlGen = `<div class="cart-item-container">
//     <div class="delivery-date">
//       Delivery date: Tuesday, June 21
//     </div>

//     <div class="cart-item-details-grid">
//       <img class="product-image"
//         src="${addedProduct.image}">

//       <div class="cart-item-details">
//         <div class="product-name">
//           ${addedProduct.name}
//         </div>
//         <div class="product-price">
//           $${addedProduct.price}
//         </div>
//         <div class="product-quantity">
//           <span>
//             Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
//           </span>
//           <span class="update-quantity-link link-primary">
//             Update
//           </span>
//           <span class="delete-quantity-link link-primary js-remove-cart-item" data-remove-item = ${addedProduct.id} >
//             Delete
//           </span>
//         </div>
//       </div>

//       <div class="delivery-options">
//         <div class="delivery-options-title">
//           Choose a delivery option:
//         </div>
//         <div class="delivery-option">
//           <input type="radio" checked
//             class="delivery-option-input"
//             name="delivery-option-${addedProduct.id}">
//           <div>
//             <div class="delivery-option-date">
//               Tuesday, June 21
//             </div>
//             <div class="delivery-option-price">
//               FREE Shipping
//             </div>
//           </div>
//         </div>
//         <div class="delivery-option">
//           <input type="radio"
//             class="delivery-option-input"
//             name="delivery-option-${addedProduct.id}">
//           <div>
//             <div class="delivery-option-date">
//               Wednesday, June 15
//             </div>
//             <div class="delivery-option-price">
//               $4.99 - Shipping
//             </div>
//           </div>
//         </div>
//         <div class="delivery-option">
//           <input type="radio"
//             class="delivery-option-input"
//             name="delivery-option-${addedProduct.id}">
//           <div>
//             <div class="delivery-option-date">
//               Monday, June 13
//             </div>
//             <div class="delivery-option-price">
//               $9.99 - Shipping
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>`
//   checkoutPageGenerator = '';
//   checkoutPageGenerator += htmlGen; 
//   document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;

      

//   })
 
// }

// document.querySelectorAll('.js-update-quantity').forEach((update,index)=>{ 
//   update.addEventListener('click',()=>{
//     console.log(update.dataset.updateProduct);
//     let productDataId = update.dataset.updateProduct;
    
//     document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('editing-quantity');
//     document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('is-editing-quantity');

//     document.querySelector(`.save-quantity-link-${productDataId}`).addEventListener('click',()=>{
//       let editedQuantity = Number(document.querySelector(`.quantity-input-${productDataId}`).value);
//       cartData.forEach((data,index)=>{
//         if(data.productId === productDataId){
//           data.quantity = editedQuantity;
//           saveCartDataFunc(cartData);
//         }
//       })
//       console.log(editedQuantity); 
//       document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('is-editing-quantity');
//       document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('editing-quantity');
      
//       location.reload();
//     })
    
//   })
// })

// function editSaveQuantityFunc(productDataId){

//   document.querySelector(`.save-quantity-link-${productDataId}`).addEventListener('click',()=>{
//     let editedQuantity = Number(document.querySelector(`.quantity-input-${productDataId}`).value);
//     cartData.forEach((data,index)=>{
//       if(data.productId === productDataId){
//         data.quantity = editedQuantity;
//         saveCartDataFunc(cartData);
//       }
//     })
//     console.log(editedQuantity); 
//     document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('is-editing-quantity');
//     document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('editing-quantity');
    
//     location.reload();
//   })
// }

// }

