<template>
    <div>
        <h1>tous Les Utulisateur</h1>
      <HelloWorld></HelloWorld>
      <profil/>
    </div>
      
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";
import profil from "../components/profil.vue";

export default {
  name: "tousUtulisateur",
  components: {
    HelloWorld,
    profil

  },
}
</script>