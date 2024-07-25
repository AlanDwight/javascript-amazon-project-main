// import { cartData , dataCart } from "../../data/cart.js";
import { cartData } from "../../data/cart.js";
import { saveCartDataFunc } from "../../data/cart.js";

function cartAccumulator(item){
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
    // for(let j = 0 ; j < cartData.length ; j ++ ){
    //   if(item.dataset.itemId != cartData[j].productId){
    //     timerFunction();
    //     condition = true ; 
    //   }
    // }

    if(condition){ 
      timerFunction();
      cartData.push({
        productId : `${item.dataset.itemId}`,
        quantity : quantityValue,
        image : `${item.dataset.itemImage}`,
        name : `${item.dataset.itemName}`,
        // price : `${((item.dataset.itemPrice)/100).toFixed(2)}`, 
        price : `${converterFunc(item.dataset.itemPrice)}`, 
        itemID : '1', 
      });
      cartQuantityCalc();
      saveCartDataFunc(cartData);
      
    }
} 


function isProductInCart(addedProductID){
    // let addedProductID = addedProduct.dataset.itemId; 
    let matchingItem;
    cartData.forEach((item,index)=>{
        console.log(item.productId);
        if(addedProductID == item.productId){
            matchingItem = item ;  
        }
    })
    if(matchingItem){
        console.log('there is matching item')
        console.log(matchingItem);
        matchingItem.quantity += 1 ; 

    }else{ 
        console.log('pushing new item');
        cartData.push( { 
            productId : ``, //${addedProduct.dataset.itemId}
            quantity : ``, //quantityValue;
            image : ``, // ${addedProduct.dataset.itemImage}
            name : ``,  // ${addedProduct.dataset.itemname}
            price : ``, // ${converterFunc(addedProduct.dataset.itemPrice)}
            itemID : `1`, 
        } 
        )
        // saveCartDataFunc(cartData);
    }
    // console.log(cartData)
}

// isProductInCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');


// describe('Cart data test', ()=>{
//     it('adding product to cart test', ()=>{
//         spyOn(localStorage, 'setItem');
//         spyOn(localStorage, 'getItem').and.callFake(()=>{
//             return JSON.stringify([]);
//         });
//         dataCart();
//         isProductInCart('e43638ce-6aa0-4b85-b27f-e1d07eb6786');
//         expect(cartData.length).toEqual(1);
          // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
          // expect(cartData[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb6786');
          // expect(cartData[0].quantity).toEqual(1);
//         console.log(cartData.length);

//     })
// })

// describe('Cart data test', ()=>{
//   it('adding existing product to cart', ()=>{
//     spyOn(localStorage, 'setItem');
//     spyOn(localStorage, 'getItem').and.callFake(()=>{
//       return JSON.stringify([
//         {
//           productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//           image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//           name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//           rating: {
//             stars: 4.5,
//             count: 87
//           },
//           price: (1090/100).toFixed(2),
//           keywords: [
//             "socks",
//             "sports",
//             "apparel"
//           ], 
//           quantity : 1 , 
//           itemID : '1',
//         },
//       ])
//     })
//     // dataCart();
//     isProductInCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cartData.length).toEqual(1);
//     expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
//     expect(cartData[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
//     expect(cartData[0].quantity).toEqual(2); 
    
//   })
// })


