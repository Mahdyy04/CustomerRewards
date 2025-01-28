import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Dashboard from "../pages/Dashboard.vue";
import Ledger from "../pages/Ledger.vue";
import CustomerDetails from "../client/CustomerDetails.vue";
import Store from "../client/Store.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/ledger", name: "Ledger", component: Ledger },
  { path: "/customer-details", name: "CustomerDetails", component: CustomerDetails },
  { path: "/store", name: "Store", component: Store },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
 
  //    if (to.path === "/" && user) {
  //    if (user.role === "admin") return next("/dashboard");
  //    if (user.role === "customer") return next("/customer-details");
  //}


  // Redirect logged-in users from Login page
  if (to.path === "/" && user) {
    if (user.role === "admin") return next("/dashboard");
    if (user.role === "customer") return next("/customer-details");
  }

  // Restrict access to admin-only routes
  if (to.path.startsWith("/dashboard") || to.path.startsWith("/ledger")) {
    if (!user || user.role !== "admin") {
      return next("/"); // Redirect to login if not an admin
    }
  }
  

  // Restrict access to customer-only routes
  if (to.path.startsWith("/customer-details") || to.path.startsWith("/store")) {
    if (!user || user.role !== "customer") {
      return next("/");
    }
  }

  // Allow access to all other routes
  next();
});

export default router;
