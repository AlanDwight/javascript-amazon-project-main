// product data productData has already loaded on other script tag.

import { cartData, saveCartDataFunc } from "../data/cart.js";
// import { cartData as myCart } from "../data/cart.js";
import { productData } from "../data/products.js";

let htmlGenerator = '';
let checkoutPageGenerator = ''; 

productData.forEach((item,index)=>{
    console.log(item.name);
    console.log(item.rating.starRating); 

    let htmlGen = `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(item.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${item.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${item.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" 
          data-item-id = "${item.id}" data-item-image = "${item.image}" data-item-name = "${item.name}" data-item-price = "${item.priceCents}">
            Add to Cart
          </button>
          </div>`;
          htmlGenerator += htmlGen ; 
          })

// cartData.forEach((addedProduct, index)=>{
//   let htmlGen = `<div class="cart-item-container">
//             <div class="delivery-date">
//               Delivery date: Tuesday, June 21
//             </div>

//             <div class="cart-item-details-grid">
//               <img class="product-image"
//                 src="${addedProduct.image}">

//               <div class="cart-item-details">
//                 <div class="product-name">
//                   ${addedProduct.name}
//                 </div>
//                 <div class="product-price">
//                   $${addedProduct.price}
//                 </div>
//                 <div class="product-quantity">
//                   <span>
//                     Quantity: <span class="quantity-label">${addedProduct.quantity}</span>
//                   </span>
//                   <span class="update-quantity-link link-primary">
//                     Update
//                   </span>
//                   <span class="delete-quantity-link link-primary">
//                     Delete
//                   </span>
//                 </div>
//               </div>

//               <div class="delivery-options">
//                 <div class="delivery-options-title">
//                   Choose a delivery option:
//                 </div>
//                 <div class="delivery-option">
//                   <input type="radio" checked
//                     class="delivery-option-input"
//                     name="delivery-option-1">
//                   <div>
//                     <div class="delivery-option-date">
//                       Tuesday, June 21
//                     </div>
//                     <div class="delivery-option-price">
//                       FREE Shipping
//                     </div>
//                   </div>
//                 </div>
//                 <div class="delivery-option">
//                   <input type="radio"
//                     class="delivery-option-input"
//                     name="delivery-option-1">
//                   <div>
//                     <div class="delivery-option-date">
//                       Wednesday, June 15
//                     </div>
//                     <div class="delivery-option-price">
//                       $4.99 - Shipping
//                     </div>
//                   </div>
//                 </div>
//                 <div class="delivery-option">
//                   <input type="radio"
//                     class="delivery-option-input"
//                     name="delivery-option-1">
//                   <div>
//                     <div class="delivery-option-date">
//                       Monday, June 13
//                     </div>
//                     <div class="delivery-option-price">
//                       $9.99 - Shipping
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>`
//           checkoutPageGenerator += htmlGen; 
// })


document.querySelector('.js-products-grid').innerHTML = htmlGenerator ;

let total = 0 ;
cartData.forEach((item,index)=>{
  total += item.quantity ; 
})

document.querySelector('.js-cart-quantity').innerHTML = total;

let timeOutFunc;
document.querySelectorAll('.js-add-to-cart-button').forEach((item, index)=>{
    item.addEventListener('click', ()=>{
      clearTimeout(timeOutFunc);
      let totalQuantity = 0 ;
      let quantityValue = Number(document.querySelector(`.js-quantity-selector-${item.dataset.itemId}`).value); 

      for(let i = 0 ; i < cartData.length ; i ++ ){ 
        if(item.dataset.itemId == cartData[i].productId){ 
          clearTimeout(timeOutFunc);
          cartData[i].quantity+= quantityValue;
          console.log(cartData);
          
          cartQuantityCalc();
          
          console.log(totalQuantity);
          timerFunction();
          saveCartDataFunc(cartData);
          return;
        }
      }

      let condition = true ; 
      for(let j = 0 ; j < cartData.length ; j ++ ){
        if(item.dataset.itemId != cartData[j].productId){
          timerFunction();
          condition = true ; 
        }
      }

      if(condition){ 
        cartData.push({
          productId : `${item.dataset.itemId}`,
          quantity : quantityValue,
          image : `${item.dataset.itemImage}`,
          name : `${item.dataset.itemName}`,
          price : `${((item.dataset.itemPrice)/100).toFixed(2)}`
        });
        saveCartDataFunc(cartData); 
      }


      console.log(cartData);

      cartQuantityCalc();
  
      console.log(totalQuantity);
      

      // console.log(document.querySelector(`.js-quantity-selector-${item.dataset.itemId}`).value);


      // ----------------------------------------------------------
      // ----------------------------------------------------------
              // something weird is happening in .js-added-to-cart-${item.dataset.itemId}
              
              // when i target js-added-to-cart-${item.dataset.itemId} with DOM and 
              // change its css style and opacity, it changes the opacity of added-to-cart class
              // not .js-added-to-cart-${item.dataset.itemId}

              // note both of .js-added-to-cart-${item.dataset.itemId} and added-to-cart classes
              // are under same 'div' html element 

            //   <div class="added-to-cart js-added-to-cart-${item.id}">
              //   <img src="images/icons/checkmark.png">
              //   Added
            //   </div>
      // ----------------------------------------------------------
      // ----------------------------------------------------------


      // document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).style.opacity = 1 ;
      
      // document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart'); 
      
      function timerFunction(){ 
        clearTimeout(timeOutFunc);
        document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.add('added-to-cart-activate'); 
        
        timeOutFunc = setTimeout(() => {
          document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart-activate'); 
        }, 2000);
      }

      function cartQuantityCalc(){ 
        cartData.forEach((item, index)=> { 
  
          totalQuantity += item.quantity;  
        
        })
        document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
      };

      // clearTimeout(timeOutFunc);

      // let productNameVar = item.dataset.itemName ; 
      // let matchingProduct ; 
      // cartData.forEach((item, index)=> { 
      //   if(item.product === productNameVar) { 
      //     matchingProduct = item;
      //   }
      // })
      // if(matchingProduct){ 
      //   matchingProduct.quantity += 1 ;
       
      // }else { 
      //   cartData.push({
      //     product :`${productNameVar}`,
      //     quantity : 1
      //   });
      // }
      // console.log(cartData);
    })
})


