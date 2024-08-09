// import { cartData, dataCart } from "../../data/cart.js";
import { dataGenerator } from "../../scripts/checkout.js";
import { loadBackendProductList } from "../../data/products.js";

descirbe('test suite: checkout page testing', ()=>{
    it('cart list generator testing', ()=>{
        document.querySelector('.test-body').innerHTML = `
            <div class = "js-order-summary"></div>
        `;

        beforeAll((done)=>{
          loadBackendProductList(()=>{
            done();
          })
        }); 
        beforeEach(()=>{

        })
        
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    rating: {
                      stars: 4.5,
                      count: 87
                    },
                    price: (1090/100).toFixed(2),
                    keywords: [
                      "socks",
                      "sports",
                      "apparel"
                    ], 
                    quantity : 2 , 
                    itemID : '1', 
                  },
                  {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    image: "images/products/intermediate-composite-basketball.jpg",
                    name: "Intermediate Size Basketball",
                    rating: {
                      stars: 4,
                      count: 127
                    },
                    price: (2095/100).toFixed(2),
                    keywords: [
                      "sports",
                      "basketballs"
                    ],
                    quantity : 3 ,
                    itemID : '2',
                  },
            ])
        })
        // dataCart(); 
        dataGenerator();
    })
})