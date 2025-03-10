// product data productData has already loaded on other script tag.

import { cartData, saveCartDataFunc, addingProductToCart } from "../data/cart.js";
// import { cartData as myCart } from "../data/cart.js";
import { productData, loadBackendProductList, loadBackendProductListUsingFetch} from "../data/products.js";
import { converterFunc } from "./utils/currencyConverter.js";
// import '../data/cart - oop.js';
import '../data/cart - class.js';
// import { cartData } from "../data/cart - oop.js";
import { cartDataInstance } from "../data/cart - class.js";
// import { CartClass } from "../data/cart - class.js";
// loading front page with callback
// loadBackendProductList(callBackLoadProductWait);

// loading front page with asyn, await
// error handling in asyn, await

// loading products from local json file
// let productData = [];
// fetch('../../backend/products.json')
//     .then((response) => response.json())
//     .then((json) => {
//       productData = json;
//       console.log(productData);
//       callBackLoadProductWait();
//     });

async function loadProdateBrowseFrontPage(){ 
  try{ 

    await loadBackendProductListUsingFetch();
    callBackLoadProductWait(); 

  }catch(error){ 

    console.log('unexpected error. Please try again later');
  
  }; 
 
}

loadProdateBrowseFrontPage();

function callBackLoadProductWait(){
  // console.log('-----productData------')
  // console.log(productData)
  // console.log('-----productData------')
  let htmlGenerator = '';
  let checkoutPageGenerator = ''; 
  console.log(productData);
  productData.forEach((item,index)=>{
    // console.log(item);
    console.log(item.rating.starRating); 
    
      // let htmlGen = `<div class="product-container">
      //       <div class="product-image-container">
      //         <img class="product-image"
      //           src="${item.image}">
      //       </div>

      //       <div class="product-name limit-text-to-2-lines">
      //       ${item.name}
      //       </div>

      //       <div class="product-rating-container">
      //         <img class="product-rating-stars"
      //           src= "${item.calculateStarRating()}">
      //         <div class="product-rating-count link-primary">
      //           ${item.rating.count}
      //         </div>
      //       </div>

      //       <div class="product-price">
      //         $${item.calculateProductPrice()}
      //       </div>

      //       <div class="product-quantity-container">
      //         <select class="js-quantity-selector-${item.id}">
      //           <option selected value="1">1</option>
      //           <option value="2">2</option>
      //           <option value="3">3</option>
      //           <option value="4">4</option>
      //           <option value="5">5</option>
      //           <option value="6">6</option>
      //           <option value="7">7</option>
      //           <option value="8">8</option>
      //           <option value="9">9</option>
      //           <option value="10">10</option>
      //         </select>
      //       </div>
      //       ${item.extraInfoHtmlGen()} 
      //       <!-- <div class = "js-size-chart-container-${item.id}"></div> --> 
      //       <div class="product-spacer"></div>

      //       <div class="added-to-cart js-added-to-cart-${item.id}">
      //         <img src="images/icons/checkmark.png">
      //         Added
      //       </div>

      //       <button class="add-to-cart-button button-primary js-add-to-cart-button" 
      //       data-item-id = "${item.id}" data-item-image = "${item.image}" data-item-name = "${item.name}" data-item-price = "${item.calculateProductPrice()}">
      //         Add to Cart
      //       </button>
      //       </div>`;
            htmlGenerator += generatorFunction(item) ; 
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

  // to generate product size link differently 

  // productData.forEach((item, index)=>{
  //   if(item.sizeChartLink != null){
  //     document.querySelector(`.js-size-chart-container-${item.id}`).innerHTML = `
  //         <a href=${item.sizeChartLink} target = "_blank">
  //                   <div class = "js-size-chart size-chart"> Size chart </div>
  //         </a>
  //     `;
  //   }else if(item.powerUsage != null){ 
  //     document.querySelector(`.js-size-chart-container-${item.id}`).innerHTML = `
  //         <a href=${item.powerUsage} target = "_blank">
  //                   <div class = "js-size-chart size-chart"> Power Usage </div>
  //         </a>`; 
  //   }
  // })

  // function cartQuant(){
  //   let total = 0 ;
  //   cartData.forEach((item,index)=>{
  //     total += item.quantity ; 
  //   })
    
  //   document.querySelector('.js-cart-quantity').innerHTML = total;
  // }

  // cartQuant();

  cartDataInstance.cartQuantityCalc();

  // let timeOutFunc;
  document.querySelectorAll('.js-add-to-cart-button').forEach((item, index)=>{
      item.addEventListener('click', ()=>{
        
        // console.log('item item');

        // clearTimeout(timeOutFunc);
        // let totalQuantity = 0 ;
        // let quantityValue = Number(document.querySelector(`.js-quantity-selector-${item.dataset.itemId}`).value); 
        
        // addingProductToCart(item);
        cartDataInstance.addingProductToCart(item);
        // cartDataInstance.cartQuantityCalc();
        // cartData.addingProductToCart(item);

        // function addingProductToCart(item){
        //         for(let i = 0 ; i < cartData.length ; i ++ ){ 
        //           if(item.dataset.itemId == cartData[i].productId){ 
        //             clearTimeout(timeOutFunc);
        //             cartData[i].quantity+= quantityValue;
        //             console.log(cartData);
                    
        //             cartQuantityCalc();
                    
        //             console.log(totalQuantity);
        //             timerFunction();
        //             saveCartDataFunc(cartData);
        //             return;
        //           }
        //         }
          
        //         let condition = true ; 
        //         // for(let j = 0 ; j < cartData.length ; j ++ ){
        //         //   if(item.dataset.itemId != cartData[j].productId){
        //         //     timerFunction();
        //         //     condition = true ; 
        //         //   }
        //         // }
          
        //         if(condition){ 
        //           timerFunction();
        //           cartData.push({
        //             productId : `${item.dataset.itemId}`,
        //             quantity : quantityValue,
        //             image : `${item.dataset.itemImage}`,
        //             name : `${item.dataset.itemName}`,
        //             // price : `${((item.dataset.itemPrice)/100).toFixed(2)}`, 
        //             price : `${converterFunc(item.dataset.itemPrice)}`, 
        //             itemID : '1', 
        //           });
        //           cartQuantityCalc();
        //           saveCartDataFunc(cartData);
                  
        //         }
        // }

        // console.log(cartData);

        // cartQuantityCalc();
    
        // console.log(totalQuantity);
        

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
        
        // function timerFunction(){ 
        //   clearTimeout(timeOutFunc);
        //   document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.add('added-to-cart-activate'); 
          
        //   timeOutFunc = setTimeout(() => {
        //     document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart-activate'); 
        //   }, 2000);
        // }

        // function cartQuantityCalc(){ 
        //   cartData.forEach((item, index)=> { 
    
        //     totalQuantity += item.quantity;  
          
        //   })
        //   document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
        // };

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

  // document.querySelector('.js-search-button').addEventListener('click', ()=>{
  //   let searchBarInput = document.querySelector('.js-search-bar-input').value; 
  // })
  // console.log(searchBarInput);
  document.querySelector('.js-search-button').addEventListener('click', ()=>{
    let search = document.querySelector('.js-search-bar-input').value; 
    // alert(search)
    // window.location.href = `amazon.html?search=${search}`;
    console.log(loadBackendProductListUsingFetch().then(()=>{
      // let productArray = [];
      // productData.forEach((item,index)=>{
      //   productArray.push(item.name);
      // })
      // console.log(productArray)
      // console.log(productArray.includes(search));
      window.location.href = `amazon.html?search=${search}`;
      
      
      }))

    // console.log('hello')
    // document.querySelector('.js-search-box').innerHTML = `
    //         <a href="amazon.html?search=${search}">
    //           <button class="search-button js-search-button">
    //             <img class="search-icon" src="images/icons/search-icon.png">
    //           </button>
    //         </a>`;
  })
// let searchBarInput = '123';
//   document.querySelector('.js-search-box').innerHTML = `
//         `;
    
    let url = new URL(window.location.href); 
    let search = url.searchParams.get('search');
    let filteredArray = []; 
    productData.forEach((item,index)=>{
      item.keywords.forEach((keyword,index)=> { 
        if(keyword == search){
          let data = ``;
          filteredArray.push(item);
          console.log(filteredArray); 
          // let htmlGenerator = generatorFunction(item);
          // data += htmlGenerator; 
          // document.querySelector('.js-products-grid').innerHTML = data ;
        }
      })
      let htmlGenerator = '';
      filteredArray.forEach((item,index)=>{
          // let htmlGen = `<div class="product-container">
          // <div class="product-image-container">
          //   <img class="product-image"
          //     src="${item.image}">
          // </div>

          // <div class="product-name limit-text-to-2-lines">
          // ${item.name}
          // </div>

          // <div class="product-rating-container">
          //   <img class="product-rating-stars"
          //     src= "${item.calculateStarRating()}">
          //   <div class="product-rating-count link-primary">
          //     ${item.rating.count}
          //   </div>
          // </div>

          // <div class="product-price">
          //   $${item.calculateProductPrice()}
          // </div>

          // <div class="product-quantity-container">
          //   <select class="js-quantity-selector-${item.id}">
          //     <option selected value="1">1</option>
          //     <option value="2">2</option>
          //     <option value="3">3</option>
          //     <option value="4">4</option>
          //     <option value="5">5</option>
          //     <option value="6">6</option>
          //     <option value="7">7</option>
          //     <option value="8">8</option>
          //     <option value="9">9</option>
          //     <option value="10">10</option>
          //   </select>
          // </div>
          // ${item.extraInfoHtmlGen()} 
          // <!-- <div class = "js-size-chart-container-${item.id}"></div> --> 
          // <div class="product-spacer"></div>

          // <div class="added-to-cart js-added-to-cart-${item.id}">
          //   <img src="images/icons/checkmark.png">
          //   Added
          // </div>

          // <button class="add-to-cart-button button-primary js-add-to-cart-button" 
          // data-item-id = "${item.id}" data-item-image = "${item.image}" data-item-name = "${item.name}" data-item-price = "${item.calculateProductPrice()}">
          //   Add to Cart
          // </button>
          // </div>`;
          // htmlGenerator += htmlGen ;
          // console.log(htmlGenerator)
            document.querySelector('.js-products-grid').innerHTML = generatorFunction(item) ;
            document.querySelectorAll('.js-add-to-cart-button').forEach((item, index)=>{
              item.addEventListener('click', ()=>{
                
                // console.log('item item');
        
                // clearTimeout(timeOutFunc);
                // let totalQuantity = 0 ;
                // let quantityValue = Number(document.querySelector(`.js-quantity-selector-${item.dataset.itemId}`).value); 
                
                // addingProductToCart(item);
                cartDataInstance.addingProductToCart(item);
                // cartDataInstance.cartQuantityCalc();
                // cartData.addingProductToCart(item);
        
                // function addingProductToCart(item){
                //         for(let i = 0 ; i < cartData.length ; i ++ ){ 
                //           if(item.dataset.itemId == cartData[i].productId){ 
                //             clearTimeout(timeOutFunc);
                //             cartData[i].quantity+= quantityValue;
                //             console.log(cartData);
                            
                //             cartQuantityCalc();
                            
                //             console.log(totalQuantity);
                //             timerFunction();
                //             saveCartDataFunc(cartData);
                //             return;
                //           }
                //         }
                  
                //         let condition = true ; 
                //         // for(let j = 0 ; j < cartData.length ; j ++ ){
                //         //   if(item.dataset.itemId != cartData[j].productId){
                //         //     timerFunction();
                //         //     condition = true ; 
                //         //   }
                //         // }
                  
                //         if(condition){ 
                //           timerFunction();
                //           cartData.push({
                //             productId : `${item.dataset.itemId}`,
                //             quantity : quantityValue,
                //             image : `${item.dataset.itemImage}`,
                //             name : `${item.dataset.itemName}`,
                //             // price : `${((item.dataset.itemPrice)/100).toFixed(2)}`, 
                //             price : `${converterFunc(item.dataset.itemPrice)}`, 
                //             itemID : '1', 
                //           });
                //           cartQuantityCalc();
                //           saveCartDataFunc(cartData);
                          
                //         }
                // }
        
                // console.log(cartData);
        
                // cartQuantityCalc();
            
                // console.log(totalQuantity);
                
        
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
                
                // function timerFunction(){ 
                //   clearTimeout(timeOutFunc);
                //   document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.add('added-to-cart-activate'); 
                  
                //   timeOutFunc = setTimeout(() => {
                //     document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart-activate'); 
                //   }, 2000);
                // }
        
                // function cartQuantityCalc(){ 
                //   cartData.forEach((item, index)=> { 
            
                //     totalQuantity += item.quantity;  
                  
                //   })
                //   document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
                // };
        
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
          });
      })
      if(item.name == search){ 
        document.querySelector('.js-products-grid').innerHTML = generatorFunction(item) ;
        document.querySelectorAll('.js-add-to-cart-button').forEach((item, index)=>{
          item.addEventListener('click', ()=>{
            
            // console.log('item item');
    
            // clearTimeout(timeOutFunc);
            // let totalQuantity = 0 ;
            // let quantityValue = Number(document.querySelector(`.js-quantity-selector-${item.dataset.itemId}`).value); 
            
            // addingProductToCart(item);
            cartDataInstance.addingProductToCart(item);
            // cartDataInstance.cartQuantityCalc();
            // cartData.addingProductToCart(item);
    
            // function addingProductToCart(item){
            //         for(let i = 0 ; i < cartData.length ; i ++ ){ 
            //           if(item.dataset.itemId == cartData[i].productId){ 
            //             clearTimeout(timeOutFunc);
            //             cartData[i].quantity+= quantityValue;
            //             console.log(cartData);
                        
            //             cartQuantityCalc();
                        
            //             console.log(totalQuantity);
            //             timerFunction();
            //             saveCartDataFunc(cartData);
            //             return;
            //           }
            //         }
              
            //         let condition = true ; 
            //         // for(let j = 0 ; j < cartData.length ; j ++ ){
            //         //   if(item.dataset.itemId != cartData[j].productId){
            //         //     timerFunction();
            //         //     condition = true ; 
            //         //   }
            //         // }
              
            //         if(condition){ 
            //           timerFunction();
            //           cartData.push({
            //             productId : `${item.dataset.itemId}`,
            //             quantity : quantityValue,
            //             image : `${item.dataset.itemImage}`,
            //             name : `${item.dataset.itemName}`,
            //             // price : `${((item.dataset.itemPrice)/100).toFixed(2)}`, 
            //             price : `${converterFunc(item.dataset.itemPrice)}`, 
            //             itemID : '1', 
            //           });
            //           cartQuantityCalc();
            //           saveCartDataFunc(cartData);
                      
            //         }
            // }
    
            // console.log(cartData);
    
            // cartQuantityCalc();
        
            // console.log(totalQuantity);
            
    
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
            
            // function timerFunction(){ 
            //   clearTimeout(timeOutFunc);
            //   document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.add('added-to-cart-activate'); 
              
            //   timeOutFunc = setTimeout(() => {
            //     document.querySelector(`.js-added-to-cart-${item.dataset.itemId}`).classList.remove('added-to-cart-activate'); 
            //   }, 2000);
            // }
    
            // function cartQuantityCalc(){ 
            //   cartData.forEach((item, index)=> { 
        
            //     totalQuantity += item.quantity;  
              
            //   })
            //   document.querySelector('.js-cart-quantity').innerText = `${totalQuantity}`;
            // };
    
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
      });
      }
    })
    
    
        
}

function generatorFunction(item) {
      let htmlGenerator = '';
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
                src= "${item.calculateStarRating()}">
              <div class="product-rating-count link-primary">
                ${item.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${item.calculateProductPrice()}
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
            ${item.extraInfoHtmlGen()} 
            <!-- <div class = "js-size-chart-container-${item.id}"></div> --> 
            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${item.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" 
            data-item-id = "${item.id}" data-item-image = "${item.image}" data-item-name = "${item.name}" data-item-price = "${item.calculateProductPrice()}">
              Add to Cart
            </button>
            </div>`;
            htmlGenerator += htmlGen ;
          return htmlGenerator ; 
  
 }

function searchBarEnter(event){ 
  console.log(event);
}

document.querySelector('.js-search-enter').addEventListener('keydown',(event)=>{
  // console.log(event.key)
  if(event.key == 'Enter'){
    let search = document.querySelector('.js-search-bar-input').value; 
    // alert(search)
    // window.location.href = `amazon.html?search=${search}`;
    console.log(loadBackendProductListUsingFetch().then(()=>{
      // let productArray = [];
      // productData.forEach((item,index)=>{
      //   productArray.push(item.name);
      // })
      // console.log(productArray)
      // console.log(productArray.includes(search));
      window.location.href = `amazon.html?search=${search}`;
      
      
      }))
  }
})