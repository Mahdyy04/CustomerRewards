<template>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-6">Welcome to Our Store</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white rounded shadow p-4"
        >
          <h2 class="text-xl font-semibold">{{ product.name }}</h2>
          <p class="text-gray-600">Price: ${{ product.price.toFixed(2) }}</p>
          <p v-if="product.points" class="text-green-600">
            Earn {{ product.points }} points!
          </p>
          <button
            @click="buyProduct(product)"
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          { id: 1, name: "Product A", price: 10.99, points: 5 },
          { id: 2, name: "Product B", price: 15.99, points: 10 },
          { id: 3, name: "Product C", price: 8.49 },
          { id: 4, name: "Product D", price: 20.99, points: 15 },
        ],
      };
    },
    methods: {
      buyProduct(product) {
        if (product.points) {
          alert(
            `You bought ${product.name} for $${product.price.toFixed(
              2
            )}. You earned ${product.points} points!`
          );
        } else {
          alert(
            `You bought ${product.name} for $${product.price.toFixed(2)}.`
          );
        }
      },
    },
  };
  </script>
  
  <style>
  /* Add any styles specific to this page */
  </style>
  