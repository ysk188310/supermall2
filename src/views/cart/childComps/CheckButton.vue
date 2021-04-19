<template>
    <div class="check-button" :class="{check: isChecked}">
        <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>
<script>
export default {
    props:{
  isChecked:{
      type:Boolean,
      default:false
  }
    },
    data() {
        return {
          
        }
    },
    //   methods: {
    //    checkedChange(){
    //        console.log('-------');
    //     // this.itemInfo.checked=!this.itemInfo
    //    }
    // },
}
</script>
<style scoped>
    .check-button{
        border-radius: 50%;
        border: 2px solid #aaa;
    }
    .check{
      border-color: red;
       background-color: red;
    }
</style>