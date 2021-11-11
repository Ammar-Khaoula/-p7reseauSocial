<template>
    <div class="post">
         <form class='storie'>
            <div>
               <input type="file" name="avatar"  id="image" placeholder="insérer une image" src="">
           </div>
           <div>
               <textarea id="pub" name="publication" placeholder=" vous voulez publier quelque chose??">
                   
               </textarea>
           </div>
           <div class='block'>
               <button id="btn_publier">publier</button>
              <button id="btn_annuler">annuler</button>
           </div>
        </form>
    <div class="user_pub">
       <ul>
           <!--  <li v-for="user in userInfo" :key="user.first_name">
              {{user.first_name}}  
            </li>-->
           <li>date</li>
       </ul>
    </div>
    <div>
        <div>
           <textarea id="pub_post" name="publication">
               
           </textarea>
        </div>
        <div class="post_pub">
           <button>publier</button>
           <button>modifier</button>
           <button>commenter</button>
           <button >suprimer</button>
        </div>
    </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default{
    name: 'postForm',
     mounted: function() {
     console.log(this.$store.state.posts);
        if (this.$store.state.posts){
        this.$router.push('/MyProfil');
        return;     
        }
        //this.$store.dispatch('getProfil');
   },
   computed: {
       ...mapState (['userInfo'])
   }
}
</script>
<style scoped>
.storie{
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
}
.block{
    display: flex;
    flex-direction: column;
}
#pub{
    width: 500px;
    height: 80px;
    border: 3px #fda9a9 solid;
    border-radius: 15px;
}
#image{
    width: 100px;
    height: 100px;
    border: 2px #fd7575 solid;
    border-radius: 25px;
    background: #fda9a9;
    text-align: center;
}
#btn_publier{
   margin-bottom: 15px;
   border: 2px #fd7575 solid;
   background: #fda9a9;
   border-radius: 25px;
   width: 150px;
   height: 40px;
   

}
#btn_annuler{
    border: 3px #fda9a9 solid;
    background: white;
    border-radius: 25px;
    height: 40px;
}
li{
    list-style-type: none;
}
.user_pub ul li{
    display: inline;
    margin-left: 20px;
}
.user_pub{
    width: 500px;
    height: 70px;
    margin: 20px;
    padding: 20px;
    border: 0px #fd7575 solid;
    border-start-start-radius: 80px;
    border-top: 8px steelblue solid;
   background: #fda9a9;
    margin-left: 23%;
}
#pub_post{
    width: 500px;
    height: 80px;
    border: 3px #fda9a9 solid;
    opacity: 0.3;
    margin-right: 40px;
}
</style>