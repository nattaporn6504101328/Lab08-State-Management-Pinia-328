import { ref } from 'vue';
import { defineStore } from 'pinia'

export const menuStore = defineStore('menu', () => {

  const menu = ref([
    {
      name: 'Thai Green Curry',
      price: 389 ,
      img: 'https://i.pinimg.com/564x/f8/4b/a6/f84ba6a06eeca8138f5900aab23b9e2b.jpg',
    },
    {
      name: 'Pad thai',
      price: 189,
      img: 'https://i.pinimg.com/564x/9a/9b/aa/9a9baaf366bdeb16a072d0223a25cc70.jpg',
    },  {
      name: 'Tom yum kung',
      price: 289,
      img: 'https://i.pinimg.com/564x/ff/23/6e/ff236e9e2758b90653903b261c1f7d8b.jpg',
    },  {
      name: 'Massaman curry',
      price:389 ,
      img: 'https://i.pinimg.com/564x/e6/e5/1d/e6e51df40e783dce50eaa4fc90830536.jpg',
    },  {
      name: 'Pad Sator Goong',
      price:289 ,
      img: 'https://i.pinimg.com/564x/e6/44/50/e644509c4c91a6f11a684831f3358f15.jpg',
    },  {
      name: 'Nam Prik Pla Thu',
      price:189 ,
      img: 'https://i.pinimg.com/564x/77/1f/67/771f67b5f122cbf0243a63b546282c33.jpg',
    },{   
    name: 'Khao Niaow Moo Ping',
    price:89 ,
    img: 'https://i.pinimg.com/564x/4b/38/c5/4b38c5d14258554155f8ca7fbdd40b45.jpg',
  },  {
    name: 'kaeng som cha om goong',
    price:289 ,
    img: 'https://i.pinimg.com/564x/61/34/5e/61345e037c1c792791c52d886e718373.jpg',
  },  {
    name: 'Khanom Jeen Gaeng Poo',
    price:289 ,
    img: 'https://i.pinimg.com/564x/fd/19/c7/fd19c77f5c1f95e30fcabe7f1ddcf960.jpg',
  },  {
    name: 'LAB THAI ESAN',
    price:189 ,
    img: 'https://i.pinimg.com/564x/22/2d/1c/222d1c019d29050e486376353cb695d5.jpg',
  },
  ]);
  
  
  return { menu}
})
export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    cartList: [], 
    orderList:[],
  }),
  actions: {
    addToCart(item) {
      this.cartList.push(item);
    },
    addOrderList() {
      // เพิ่มค่าลงไปใน orderList
      this.orderList.push(...this.cartList);
    
     this.cartList = [];
    },

  },
});
