<template>
          <!-- Navigation Bar -->

          <div class="p-8">
          <nav class="bg-blue-600 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between">
        <h1 class="text-xl font-bold">Customer Rewards Portal</h1>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/CustomerDetails" class="hover:underline">Customer Details</router-link>
          </li>
          <li>
            <router-link to="/Store" class="hover:underline">Store</router-link>
          </li>
          <li>
        <button @click="logout" class="hover:underline">Logout</button>
          </li>

        </ul>
      </div>
    </nav>
  
    <h1 class="text-3xl font-bold mb-4">Hello, {{ userName }}!</h1>
    <div class="bg-gray-100 p-6 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">Your Details:</h2>
      <p><strong>Name:</strong> {{ userDetails.name }}</p>
      <p><strong>Points:</strong> {{ userDetails.points }}</p>
      <p><strong>Wallet:</strong> ${{ userDetails.wallet.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };




  },

  methods :{
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("customerId");
      this.$router.push("/");
    },


  },


};



</script>

<style>
/* Add any styles specific to this page */
</style>
