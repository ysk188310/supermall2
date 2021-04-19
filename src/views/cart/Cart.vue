<template>
  <div>
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot='center'>购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 列表数据 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';
import {mapGetters} from 'vuex'
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';


export default {
   name:'Cart',
  components: { 
    NavBar,
  
    CartList,
    CartBottomBar,
    
    },
    computed:{
      // 两种语法数组对应的getter方法名称
       ...mapGetters(['cartLength'])
      //  对象的话可以更改名字 如果你想对getters里面的方法取一个新的名称可以用对象
      // ...mapGetters({
      //   length:'cartLength'
      // })
      // cartLength(){
     // return this.$store.getters.cartLength
      // }
    }
    
}
</script>
<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>