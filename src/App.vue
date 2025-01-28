<template>
  <div>
    <!-- Header Component -->
    <Header />



    <!-- Dark Mode Toggle -->
    <div class="absolute top-4 right-4">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          class="sr-only peer"
          :checked="isDark"
          @change="toggleDark"
        />
        <div
          class="w-14 h-8 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-500 transition-all duration-1000 ease-in-out"
        ></div>
        <span
          class="absolute left-1 top-1 w-6 h-6 bg-white rounded-full peer-checked:translate-x-6 transition-transform duration-1000"
        ></span>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
          {{ isDark ? 'Dark Mode' : 'Light Mode' }}
        </span>
      </label>
    </div>

    <!-- Page Content -->
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import { ref, watch } from 'vue';

export default {
  components: { Header },
  setup() {
    const isDark = ref(JSON.parse(localStorage.getItem('isDark')) || false);

    const toggleDark = () => {
      isDark.value = !isDark.value;
      localStorage.setItem('isDark', JSON.stringify(isDark.value));
    };

    // Watch for dark mode changes and dynamically update the body class
    watch(isDark, (newVal) => {
      if (newVal) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }, { immediate: true });

    return { isDark, toggleDark };
  },





};
</script>

<style>
body {
  transition: background-color 1s ease, color 1s ease;
}

body {
  background-color: white;
  color: black;
}

body.dark {
  background-color: #333333;
  color: white;
}

/* Toggle Switch Styles */
input[type="checkbox"] {
  display: none;
}

table {
  color: inherit;
}

table th,
table td {
  color: black;
}

body.dark table th,
body.dark table td {
  color: black;
}

nav {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
}
</style>
