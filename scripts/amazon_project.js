// product data productData has already loaded on other script tag.

let htmlGenerator = '';

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
            <select>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" 
          data-item-id = "${item.id}">
            Add to Cart
          </button>
          </div>`;
          htmlGenerator += htmlGen ; 

})

document.querySelector('.js-products-grid').innerHTML = htmlGenerator ; 
document.querySelectorAll('.js-add-to-cart-button').forEach((item, index)=>{
    item.addEventListener('click', ()=>{

      for(let i = 0 ; i < cartData.length ; i ++ ){ 
        if(item.dataset.itemId == cartData[i].productId){ 
          cartData[i].quantity++;
          console.log(cartData);
          return;
        }
      }

      let condition = false ; 
      for(let j = 0 ; j < cartData.length ; j ++ ){
        if(item.dataset.itemId != cartData[j].productId){
          condition = true ; 
        }
      }

      if(condition){ 
        cartData.push({
          productId : `${item.dataset.itemId}`,
          quantity : 1
        });
        
      }

      console.log(cartData);

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