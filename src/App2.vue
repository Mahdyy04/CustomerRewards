<script>
export default {
  data() {
      return {
        name : 'John',
        status: 'pending' ,
      };    
  },
}
</script>


<template>
  <h1 style="color: blue;"> {{ name }}</h1>
  <p v-if="status"> User active</p>
</template>
