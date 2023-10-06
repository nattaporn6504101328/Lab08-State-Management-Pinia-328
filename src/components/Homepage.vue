<script setup>
import { menuStore } from "../stores/counter";
import { useCartStore } from "../stores/counter";
import { computed } from "vue";
import { ref } from "vue";

const Cart = ref(0);

const menu = menuStore();
const shop_food = menu.menu;

const cartStore = useCartStore();
const Store = cartStore.cartList;

// สร้างคำนวณราคาสินค้าทั้งหมด
const totalPrice = computed(() => {
 
  return cartStore.cartList.reduce((total, item) => total + item.price, 0);
});

function addCart(name, img, price) {
  Cart.value++;

  // ตรวจสอบว่าสินค้ามีอยู่ในตระกร้าแล้วหรือไม่
  const existingItem = cartStore.cartList.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
    existingItem.price += price;
  } else {
    // InCart.value.push({ name, img, price, quantity: 1 });
    cartStore.addToCart({ name, img, price, quantity: 1 });
  }
}
function removeFromCart(item) {
  Cart.value -= item.quantity; //ทำการ ลบตัวเลขสินค้าจากตระกร้า
  totalPrice.value -= item.price; //ทำการลบ ราคารวม กับ ราคาสินค้าที่กดลบไป

  const itemIndex = Store.findIndex((cartItem) => cartItem.name === item.name); //หาชื่อสินค้าที่มันซ้ำกัน
  if (itemIndex !== -1) {
    const removedItem = Store.splice(itemIndex, 1)[0]; //ใช้ splice เพื่อลบออกจากอาร์เรย์ Store
    cartStore.removeFromCart(removedItem);
  }
}
function addOrderListz() {
  cartStore.addOrderList();
  Cart.value = 0;
}

</script>
<template>
  <div class="menu d-flex justify-content-between m-5">
    <router-link to="/" class="navbar-brand">
      <img src="@/assets/logo.png" alt="CoffeeShop Logo" class="logo-small" @click="goHome" />
    </router-link>

    <div class="box-menu d-flex">
      <h3
        class="cart mx-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-bag"
          viewBox="0 0 16 16"
        >
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
        </svg>
        <span class="cart-icon">[{{ Cart }}]</span>
      </h3>
      <h3
        class="cart mx-2"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        คำสั่งซื้อ
      </h3>
    </div>
  </div>

  <div class="container">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="(item, index) in shop_food" :key="index">
        <div class="card">
          <img :src="item.img" class="card-img-top" alt="Menu Image" />
          <div class="card-body">
            <h5 class="card-title text-uppercase">{{ item.name }}</h5>
            <p class="card-text">ราคา {{ item.price }} บาท</p>
          </div>
          <button @click="addCart(item.name, item.img, item.price)">
            เพิ่มสินค้าลงตระกร้า
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog w-50">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            จำนวน สินค้า {{ Cart }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body w-75"
          v-for="(item, index) in cartStore.cartList"
          :key="index"
          
        >
          <div class="card mb-3" style="max-width: 540px">
            <div class="row-text g-0 m-2">
              <div class="col-md-4">
                <img
                  :src="item.img"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ item.name }}</h5>
                  <p class="card-text">จำนวนสินค้า {{ item.quantity }}</p>
                  <p class="card-text">
                    <small class="text-body-secondary">{{ item.price }}</small>
                  </p>
                </div>
              </div>
            </div>
            <button @click="removeFromCart(item)">ลบออก</button>
          </div>
        </div>

        <!-- แสดงราคารวมทั้งหมด -->
        <div class="row g-0 m-2">
          <div class="col-md-12">
            <div class="card-body">
              <h5 class="card-title">ราคารวมทั้งหมด</h5>
              <p class="card-text" style="color: rgb(24, 125, 39);">{{ totalPrice }} บาท</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            ปิด
          </button>
          <button
            type="button"
            class="btn btn-primary "
            @click="addOrderListz()"
            style="background-color: rgb(0, 73, 21);"

          >
            สั่งซื้อ
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
    style="background-color: rgb(255, 249, 130);"
  >
    <div class="offcanvas-header">
      <h4 class="offcanvas-title" id="offcanvasRightLabel">รายการสั่งซื้อ</h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
  

      <div class="row">
        <div
          class="col-sm-6 mb-3 mb-sm-0"
          v-for="(chosenItem, index) in cartStore.orderList"
          :key="index"
        >
          <div class="card">
            <img :src="chosenItem.img" alt="" srcset="" />
            <div class="card-body">
              <h5 class="card-title">{{ chosenItem.name }}</h5>
              <p class="card-text">ราคา {{ chosenItem.price }}</p>
              <p class="card-text">จำนวน {{ chosenItem.quantity }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="page-background"></div>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Mali:wght@400&display=swap');

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #4d0404;
  color: white;
}

.menu h3 {
  margin: 0;
  font-size: 24px;
}
.cart-icon {
  font-size: 1.5rem;
}
.box-menu {
  display: flex;
  align-items: center;
}
.logo-small {
  max-height: 150px; 
}
.cart {
  border: #4d0404;
  cursor: pointer;
  margin-right: 10px;
  font-weight: bold;
  text-decoration: underline;
}

.cart:hover {
  color: #ffcc00;
  text-decoration: none;
  transform: scale(1.2);
}

.modal-content {
  max-height: 500px; 
  overflow-y: auto;
}
.cart {
  cursor: pointer;
}
.container {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
  gap: 20px;
}

.card {
  flex: 0 1 calc(25% - 20px);
  border: 10px solid #000000;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  
}

.card:hover {
  transform: scale(1.2);
}
.card-img {
  width: 100%; 
  height: auto;
}
.card-title {
  font-size: 1.25rem;
  font-family: 'Mali', sans-serif; 
  text-transform: uppercase;
  margin: 0;
}

.card-text {
  font-weight: bold;
  margin: 0;
}
.card button {
  background-color: #540f00;
  border: 8px solid #540f00;
  color: #f9f9f9;
  font-weight: bold;
  font-family: 'Mali', sans-serif;
}
.card button:hover {
  border: 8px solid #ffc400;
  background-color: #ffc400;
  color: white;
}
.gold-button {
    background-color: gold; 
    border-color: gold;
    color: white;
    font-family: 'Mali', sans-serif; 
  }
  .modal-content {
    max-height: 500px;
    overflow-y: auto;
    background-color: #fff8e1; 
  }

  .page-background {
  background-image: url('https://peruke.ie/wp-content/uploads/2018/03/CM3A8799-1050x700.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

</style>
