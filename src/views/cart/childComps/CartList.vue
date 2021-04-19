<template>
    <div class="cart-list">
        <Scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList" 
        :item-info='item' :key='(item,index)'></cart-list-item>
        </Scroll>
    </div>
</template>
<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'
export default {
    components:{
    Scroll,
     CartListItem,
    },
    computed:{
    ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.scroll.refresh()
    },
}
</script>
<style scoped>
.cart-list{
  position: relative;
    height: 100vh;
 /* height:calc(100% -44px -49px); */
}
.content{
    position: absolute;
    top: 0;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  /* height:100%;
  overflow: hidden; */
}
</style>