<template>
        <!-- Navigation Bar -->
        <nav class="bg-blue-600 text-white py-4 shadow">
      <div class="container mx-auto flex justify-between">
        <h1 class="text-xl font-bold">Customer Rewards Portal</h1>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/Dashboard" class="hover:underline">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/Ledger" class="hover:underline">Ledger</router-link>
          </li>
          <li>
        <button @click="logout" class="hover:underline">Logout</button>
          </li>

        </ul>
      </div>
    </nav>


    <div>
      <h1>Page Title</h1>
      <p>Content goes here.</p>
    </div>
  </template>
  
  <script>
  export default {

  methods :{
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("customerId");
      this.$router.push("/");
    },


  },



  };
  </script>
  
  <style scoped>
  /* Add styles here */
  </style>
  