<template>
<body id="body">
    <div class="logo">
        <div><img id="iconee" alt="logo" src="../assets/iconee.png"></div>
    </div>
    <loginForm/>
</body>
</template>


<script>
// @ is an alias to /src
import loginForm from '@/components/loginForm.vue'

export default {
  name: 'login',
  components: {
    loginForm
  }
}
</script>
<style scoped>

#iconee{
    width: 500px;
    height: 350px;
    position: relative;
    bottom: 110px;
}
.logo{
    height: 160px; 
    background:linear-gradient(#f80808, #fda9a9, #f7f0f0 );
}
</style>