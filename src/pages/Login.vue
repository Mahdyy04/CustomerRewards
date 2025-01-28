<template>
    <div class="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div class="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-sm">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-6 text-center">Login</h1>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Username</label>
            <input
              type="text"
              v-model="username"
              class="w-full p-2 border rounded text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 dark:text-gray-300 font-medium mb-1">Password</label>
            <input
              type="password"
              v-model="password"
              class="w-full p-2 border rounded text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 dark:bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-600 dark:hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {

      async login() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/login.php", {
      method: "POST",
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    });

    const data = await response.json();
    console.log("Response data:", data);  // Add more logging here

    if (data.success) {
      if (data.role === "admin") {
        console.log("Redirecting to admin dashboard");
        this.$router.push("/Dashboard");
      } else if (data.role === "customer") {
        console.log("Redirecting to customer details");
        localStorage.setItem("customerId", data.customerId);
        this.$router.push("/customer-details");
      }
    } else {
      this.errorMessage = data.message; // Display error message from API
      console.log("Error message:", data.message);  // Log error message from API
    }
  } catch (error) {
    this.errorMessage = "An error occurred. Please try again."; // Handle unexpected errors
    console.log("Error:", error);
  }
}



    },
  };
  </script>
  