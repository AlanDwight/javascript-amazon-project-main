// import { cartData } from "../../data/cart.js";

// export function renderPaymentSummary(totalCost){

//         let totalCartItem = 0 ;
//         let totalExpanse = 0 ; 
//         let shippingHandling = 9.99 ;


//         cartData.forEach((item, index)=>{ 
//         totalCartItem += item.quantity;
//         totalExpanse += (Number(item.price) * Number(item.quantity));
        
        
//         // document.querySelector(`.btn-group-${item.productId}`).addEventListener("click", (evt)=>{
//         //   let shippingHandling2 = 0 
//         //   if(evt.target.type === "radio"){

//         //   let datePriceArray = evt.target.value; 
//         //   document.querySelector(`.delivery-date-${item.productId}`).innerHTML = `Delivery date: ${datePriceArray.split(',').slice(1).join(',').trim()}`;
        
//         //   shippingHandling = datePriceCal(datePriceArray); 
                
//         //   }
//         //   orderSummary();
//         //   });
//         })

//         function datePriceCal(datePriceArray){
//         let shippingHandling2 = 0 ; 
//         if(datePriceArray == "FREE Shipping,Tuesday, July 2"){
//             shippingHandling2 = 0;
//         }else if (datePriceArray == "$4.99 - Shipping,Friday, June 28") {
//             shippingHandling2 = 4.99; 
//         }else if (datePriceArray == "$9.99 - Shipping,Wednesday, June 26") { 
//             shippingHandling2 = 9.99;
//         }
//         return Number(shippingHandling2);
//         }
//         orderSummary(totalCost);

//         function orderSummary(totalCost){
//                     if(totalCartItem == 0 ) { 
//                     shippingHandling = 0;
//                     } else { 
//                     shippingHandling = totalCost;             
//          
//                        }

//                     let totalBeforeTax = (totalExpanse + shippingHandling).toFixed(2);
//                     let estTax = (totalBeforeTax*0.1).toFixed(2);
//                     let orderTotal = (Number(totalBeforeTax) + Number(estTax)).toFixed(2);

//                     // if(totalExpanse >= 40) { 

//                     //   document.querySelector('.js-free-shipping').innerHTML = `-$${shippingHandling}`;
//                     //   document.querySelector('.freeShipping').style.display = 'grid';
//                     //   orderTotal = (Number(orderTotal - shippingHandling)).toFixed(2);
                    
//                     // }

//                     document.querySelector('.js-check-out-items').innerHTML = `${totalCartItem} items`;

//                     document.querySelector('.js-payment-total-items-count').innerHTML = `Items (${totalCartItem}):`;

//                     document.querySelector('.js-payment-products-expanse').innerHTML = totalExpanse.toFixed(2);

//                     // document.querySelector('.js-shipping-handling').innerHTML = `$${shippingHandling}`; 

//                     document.querySelector('.js-total-before-tax').innerHTML = totalBeforeTax;

//                     document.querySelector('.js-est-tax').innerHTML = estTax;

//                     document.querySelector('.js-order-total').innerHTML = orderTotal;

// }
// }