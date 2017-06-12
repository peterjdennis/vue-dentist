<template>
<div class="tchat_container">



</div>
</template>

<script>
    import Sidebar from 'components/Sidebar';
    import Messages from 'components/Messages';
    export default{
    name: 'tchat',
        data(){
            return{

            }
        },
        components : {
          Sidebar, Messages
        }

    }
</script>

<style scope>

  .tchat_container{
    height: 100%;
  }



</style>
