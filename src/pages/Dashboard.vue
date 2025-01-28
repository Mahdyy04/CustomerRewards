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

  <div class="p-6">

    <h1 class="text-3xl font-bold text-black-800 mb-4">Rewards Dashboard</h1>


    <!-- Dashboard Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg p-4 rounded transform transition-transform hover:scale-105">
        <h2 class="text-lg font-semibold">Total Rewards Issued</h2>
        <p class="text-2xl font-bold">{{ totalRewardsIssued }}</p>
      </div>

      <div class="bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg p-4 rounded transform transition-transform hover:scale-105">
        <h2 class="text-lg font-semibold">Total Rewards Redeemed</h2>
        <p class="text-2xl font-bold">{{ totalRewardsRedeemed }}</p>
      </div>

      <div class="bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg p-4 rounded transform transition-transform hover:scale-105">
        <h2 class="text-lg font-semibold">Active Customers</h2>
        <p class="text-2xl font-bold">{{ activeCustomersCount }}</p>
      </div>
    </div>

    <h2 class="text-2xl font-bold text-black-800 mt-8 mb-4">Top Customers</h2>


    <div class="flex justify-between mb-6 gap-4">
  <!-- Search Section -->
  <div class="flex items-center gap-4 justify-start">
    <label for="search" class="text-black-700 dark ">Search:</label>
    <input
      type="text"
      id="search"
      v-model="searchQuery"
      placeholder="Search by name"
      class="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />
  </div>

  <!-- Filter Section -->
  <div class="flex items-center gap-2 "> 
    <label for="filter" class="text-black-700 dark">Filter by Points:</label>
    <select
      id="filter"
      v-model="selectedFilter"
      class="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600">
      <option value="all">All</option>
      <option value="lessThan100">Less than 100</option>
      <option value="100to1000">100 - 1000</option>
      <option value="greaterThan1000">Greater than 1000</option>
    </select>
  </div>
</div>


    <div v-if="isLoading" class="text-center text-gray-500">
  Loading customers...
</div>
    <table class="w-full bg-white shadow rounded">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-4 text-left">Name</th>
          <th class="p-4 text-left">Points</th>
          <th class="p-4 text-left">Wallet</th>
          <th class="p-4 text-left">Transactions</th>
          <th class="p-4 text-left">Actions</th>

        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in filteredCustomers"
          :key="customer.id"
          class="hover:bg-gray-50 cursor-pointer transform transition-transform hover:scale-105"
        >
          <td class="p-4">{{ customer.name }}</td>
          <td class="p-4">{{ customer.points }}</td>
          <td class="p-4">{{ customer.wallet }}</td>

          <td class="p-4">
            <ul>
              <li
                v-for="transaction in customer.transactions"
                :key="transaction.date"
                class="text-sm text-gray-600"
              >
                <span class="font-semibold">Date:</span> {{ transaction.date }},
                <span class="font-semibold">Earned:</span> {{ transaction.pointsEarned }},
                <span class="font-semibold">Redeemed:</span> {{ transaction.pointsRedeemed }}
              </li>
            </ul>
          </td>
          <td class="p-4">
            <button 
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              :disabled="!!loadingStates[customer.id]"
              @click="deleteCustomer(customer.id)">

              <span v-if="loadingStates[customer.id]">Deleting...</span>
              <span v-else>Delete</span>

            </button>

            <button 
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              @click="openEditForm(customer)">
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    

    <h2 class="text-2xl font-bold text-black-800 mt-8 mb-4">Add New Customer</h2>
    <form @submit.prevent="addCustomer" class="bg-white shadow p-4 rounded max-w-md">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium">Name</label>
        <input type="text" id="name" v-model="newCustomer.name" class="w-full p-2 border rounded" placeholder="Enter customer name" required />
      </div>
      <div class="mb-4">
        <label for="points" class="block text-gray-700 font-medium">Points</label>
        <input type="number" id="points" v-model="newCustomer.points" class="w-full p-2 border rounded text-gray-700" required />
      </div>
      <div class="mb-4">
        <label for="wallet" class="block text-gray-700 font-medium">wallet</label>
        <input type="number" id="wallet" v-model="newCustomer.wallet" class="w-full p-2 border rounded text-gray-700" required />
      </div>

      <div class="mb-4">
    <label for="email" class="block text-gray-700 font-medium">Email</label>
    <input type="email" id="email" v-model="newCustomer.email" class="w-full p-2 border rounded text-gray-700" placeholder="Enter customer email" required />
  </div>
  <div class="mb-4">
    <label for="password" class="block text-gray-700 font-medium">Password</label>
    <input type="password" id="password" v-model="newCustomer.password" class="w-full p-2 border rounded text-gray-700" placeholder="Enter customer password" required />
  </div>



     
      <button 
  type="submit" 
  :disabled="isLoading" 
  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  <span v-if="loadingStates.addCustomer">Adding...</span>
  <span v-else>Add Customer</span>
</button>
    </form>

    <br>
    <!-- Edit Customer Form (Popup) -->
    <h2 v-if="showEditForm" class="text-2xl font-bold text-black-800 mb-4">Edit Customer</h2>

    <div v-if="showEditForm" class="bg-white shadow p-4 rounded max-w-md mt-8">
      
      <form @submit.prevent="updateCustomer">
        <div class="mb-4">
          <label for="editName" class="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            id="editName"
            v-model="editCustomer.name"
            class="w-full p-2 border rounded text-gray-700"
            placeholder="Enter customer name"
            required
          />
        </div>
        <div class="mb-4">
          <label for="editPoints" class="block text-gray-700 font-medium">Points</label>
          <input
            type="number"
            id="editPoints"
            v-model="editCustomer.points"
            class="w-full p-2 border rounded text-gray-600"
            required
          />
        </div>
        <div class="mb-4">
      <label for="editWallet" class="block text-gray-700 font-medium">Wallet</label>
      <input
        type="number"
        step="0.001"
        id="editWallet"
        v-model="editCustomer.wallet"
        class="w-full p-2 border rounded text-gray-600"
        placeholder="Enter wallet balance"
        required
      />
    </div>
        <button 
        type="submit" 
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        :disabled="loadingStates.updateCustomer">
        <span v-if="loadingStates.updateCustomer">Updating...</span>
        <span v-else>Update Customer</span>        
      </button>
        <button
          type="button"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
          @click="cancelEdit">
          Cancel
        </button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
  return {
    searchQuery: "",
    selectedFilter: "all", // For filter based on points

    totalRewardsIssued: 0,  // Example starting value
    totalRewardsRedeemed: 0,  // Example starting value

    customers: [],
    newCustomer: {
      name: "",
      points: 0,
      wallet: 0.0, // New field
      email: "",  // New email field
      password: "",  // New password field
    },
    isLoading: false,
    loadingStates: {
      addCustomer: false,
      updateCustomer: false,
    },
    showEditForm: false,
    editCustomer: {
      id: null,
      name: "",
      points: 0,
      transactions: [],
    },
  };
},

  computed: {
    activeCustomersCount() {
      return this.customers.length;
    },
  
  filteredCustomers() {
    let filtered = this.customers;

    if (this.searchQuery) 
    {
      filtered = filtered.filter((customer) =>
        customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    

    if (this.selectedFilter === "lessThan100") 
    {
      filtered = filtered.filter((customer) => customer.points < 100);
    } else if (this.selectedFilter === "100to1000") {
      filtered = filtered.filter((customer) => customer.points >= 100 && customer.points <= 1000);
    } else if (this.selectedFilter === "greaterThan1000") {
      filtered = filtered.filter((customer) => customer.points > 1000);
    }

    return filtered;
  },



},


  created() {
  this.isLoading = true;
  fetch("http://127.0.0.1:5000/api/getCustomers.php")
    .then((response) => response.json())
    .then((data) => {
      this.customers = data;
      this.updateTotalRewards();

      // Initialize loading states
      this.loadingStates = this.customers.reduce((acc, customer) => {
        acc[customer.id] = false;
        return acc;
      }, {});
   
    })
    .catch((error) => {
      console.error("Error fetching customers:", error);
    })
    .finally(() => {
      this.isLoading = false; // Reset loading state here
    });
},

  methods: {
    
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("customerId");
      this.$router.push("/");
    },
    
    
    updateTotalRewards() {
  this.totalRewardsIssued = this.customers.reduce((sum, customer) => sum + Number(customer.points), 0);
  this.totalRewardsRedeemed = this.customers.reduce(
    (sum, customer) =>
      sum + customer.transactions.reduce((tSum, transaction) => tSum + Number(transaction.pointsRedeemed || 0), 0),
    0
    );
      },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    addCustomer() {
  if (this.loadingStates.addCustomer) return;
  this.loadingStates.addCustomer = true;
  const newCustomerData = { ...this.newCustomer };
  console.log(newCustomerData); // Debugging step
  fetch("http://127.0.0.1:5000/api/addCustomer.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(newCustomerData),
    body: console.log(JSON.stringify(newCustomerData)),


  })
  
  .then((response) => {
    console.log(response); // Log response
    if (!response.ok) {
      throw new Error("Failed to add customer.");
    }
    return response.json();
  })
  .then((result) => {
    console.log(result); // Log result
    if (result.success) {
      alert(result.message);
      this.customers.push({ ...newCustomerData, id: result.newCustomerId });
      this.newCustomer.name = "";
      this.newCustomer.points = 0;
      this.newCustomer.wallet = 0.0;
      this.newCustomer.email = "";  // Reset email field
      this.newCustomer.password = "";  // Reset password field
    } else {
      alert(result.message);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("Unable to add customer.");
  })
  .finally(() => {
    this.loadingStates.addCustomer = false; // Reset loading state
  });
}
,

deleteCustomer(customerId) {
  if (this.loadingStates[customerId] || !confirm("Are you sure you want to delete this customer?")) return;

  // Start loading for this customer
  this.loadingStates = { ...this.loadingStates, [customerId]: true };

  console.log(`Attempting to delete customer with ID: ${customerId}`);

  fetch(`http://127.0.0.1:5000/api/deleteCustomer.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: customerId }),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Failed to delete customer.");
      }
      return response.json();
    })
    .then((result) => {
      console.log("API Response:", result);
      if (result.success) {
        this.customers = this.customers.filter(
          (customer) => customer.id !== customerId
        );
        alert("Customer deleted successfully.");
      } else {
        alert("An error occurred: " + result.message);
      }
    })
    .catch((error) => {
      console.error("Error deleting customer:", error);
      alert("Unable to delete customer.");
    })
    .finally(() => {
      // Reset loading state for the customer
      this.loadingStates = { ...this.loadingStates, [customerId]: false };
      console.log(`Reset loading state for customer ID: ${customerId}`);
    });
},

    openEditForm(customer) {
      this.editCustomer = { ...customer }; // Clone customer data into editCustomer
      this.showEditForm = true; // Show the Edit Form
    },

    cancelEdit() {
      this.showEditForm = false; // Hide the Edit Form
      this.editCustomer = { id: null, name: "", points: 0, transactions: [] }; // Reset form
    },

    updateCustomer() {
  if (this.loadingStates.updateCustomer) return; // Prevent duplicate submissions
  this.loadingStates.updateCustomer = true; // Set loading state for Update button

  fetch("http://127.0.0.1:5000/api/updateCustomer.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(this.editCustomer),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update customer.");
      }
      return response.json();
    })
    .then((result) => {
      if (result.success) {
        const index = this.customers.findIndex(
          (customer) => customer.id === this.editCustomer.id
        );
        if (index !== -1) {
          this.customers.splice(index, 1, { ...this.editCustomer });
        }
        alert("Customer updated successfully.");
        this.cancelEdit(); // Hide the Edit Form
      } else {
        alert("An error occurred: " + result.message);
      }
    })
    .catch((error) => {
      console.error("Error updating customer:", error);
      alert("Unable to update customer.");
    })
    .finally(() => {
      this.loadingStates.updateCustomer = false; // Reset loading state for Update button
    });
},
  },

  

};


        





</script>

<style scoped>
/***** Custom Tailwind Utilities *****/
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
