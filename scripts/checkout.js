import { cartData,removeCartItem, saveCartDataFunc } from "../data/cart.js";
import { productData } from "../data/products.js";

let isNewCartCreated = false;

let checkoutPageGenerator = ''; 

cartData.forEach((addedProduct, index)=>{

    // let productItemId = addedProduct.productId; 
    // let matchingItem ; 
    // productData.forEach((eachProduct, index)=>{ 
    //     if(eachProduct.id === productItemId){ 
    //         matchingItem = eachProduct ; 
    //     }
    // })
    // console.log(matchingItem);
    let htmlGen = `<div class="cart-item-container-${addedProduct.productId}">
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
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${addedProduct.productId}">
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
                      name="delivery-option-${addedProduct.productId}">
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
                      name="delivery-option-${addedProduct.productId}">
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
            checkoutPageGenerator += htmlGen; 
  })
console.log(cartData.length);
document.querySelector('.js-order-summary').innerHTML = checkoutPageGenerator;

let totalCartItem = 0 ;
let totalExpanse = 0 ; 

cartData.forEach((item, index)=>{ 
  totalCartItem += item.quantity;
  totalExpanse += (Number(item.price) * Number(item.quantity)); 
})
let shippingHandling = 4.99;

if(totalCartItem == 0 ) { 
  shippingHandling = 0;
}

let totalBeforeTax = (totalExpanse + shippingHandling).toFixed(2);
let estTax = (totalBeforeTax*0.1).toFixed(2);
let orderTotal = (Number(totalBeforeTax) + Number(estTax)).toFixed(2);

if(totalExpanse >= 40) { 

  document.querySelector('.js-free-shipping').innerHTML = `-$${shippingHandling}`;
  document.querySelector('.freeShipping').style.display = 'grid';
  orderTotal = (Number(orderTotal - shippingHandling)).toFixed(2);
  
}

document.querySelector('.js-check-out-items').innerHTML = `${totalCartItem} items`;

document.querySelector('.js-payment-total-items-count').innerHTML = `Items (${totalCartItem}):`;

document.querySelector('.js-payment-products-expanse').innerHTML = totalExpanse.toFixed(2);

document.querySelector('.js-shipping-handling').innerHTML = `$${shippingHandling}`; 

document.querySelector('.js-total-before-tax').innerHTML = totalBeforeTax;

document.querySelector('.js-est-tax').innerHTML = estTax;

document.querySelector('.js-order-total').innerHTML = orderTotal;

document.querySelectorAll('.js-remove-cart-item').forEach((cartItem, index)=>{ 
  cartItem.addEventListener('click',()=>{

    // console.log(cartItem.dataset.removeItem);
    let itemId = cartItem.dataset.removeItem ; 
    console.log(itemId); 


    document.querySelector(`.cart-item-container-${itemId}`).remove();
    // console.log(document.querySelector(`.cart-item-container-${itemId}`));

    let newCart = removeCartItem(itemId);
    location.reload();
    console.log(removeCartItem(itemId))

    
    // console.log(newCart);
    // console.log(Boolean(newCart));
    // console.log(newCart.length)
    console.log(newCart.length);
    // localStorage.removeItem('cartData');
    // saveCartDa taFunc(newCart);
    // pageGen(newCart);
    
    


    
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
      cartData.forEach((data,index)=>{
        if(data.productId === productDataId){
          data.quantity = editedQuantity;
          saveCartDataFunc(cartData);
        }
      })
      console.log(editedQuantity); 
      document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('is-editing-quantity');
      document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('editing-quantity');
      
      location.reload();
    })
    
  })
})

function editSaveQuantityFunc(productDataId){

  document.querySelector(`.save-quantity-link-${productDataId}`).addEventListener('click',()=>{
    let editedQuantity = Number(document.querySelector(`.quantity-input-${productDataId}`).value);
    cartData.forEach((data,index)=>{
      if(data.productId === productDataId){
        data.quantity = editedQuantity;
        saveCartDataFunc(cartData);
      }
    })
    console.log(editedQuantity); 
    document.querySelector(`.edit-product-quantity-${productDataId}`).classList.remove('is-editing-quantity');
    document.querySelector(`.edit-product-quantity-${productDataId}`).classList.add('editing-quantity');
    
    location.reload();
  })
}