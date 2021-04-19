<template>
    <div class="bottom-bar">
        <div class="check-content">
        <CheckButton class="check-button" 
        :isChecked='isSelectAll'
        @click.native='checkClick'
        ></CheckButton>
        <span class="check-span">全选 </span>
        </div>
        <div class="total-price">合计:{{totalPrice}}</div>
        <div class="checkedLength" @click='calcClick'>去结算:({{checkedLength}})</div>
    </div>
</template>
<script>
import CheckButton from './CheckButton'
// import {mapGetters} from 'vuex'
export default {
    components:{
        CheckButton
    },
    // preValue,item上一次调用回调返回的值
    computed:{
      
        totalPrice(){
            return '￥'+ this.$store.state.cartlist.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
      checkedLength(){
     // 过滤出有checked商品
     return this.$store.getters.cartList.filter(item=>item.checked).length
     },
     isSelectAll(){                                
     //  如果这个数组的长度为0那么就返回false
     if(this.$store.state.cartlist.length===0){
         return false
     }
     //  filter方法
      // return (!this.$store.state.cartlist.filter(item=>!item.checked).length)
     //   find方法性能好点
     //   return  !this.$store.state.cartlist.find(item=>!item.checked) 
      for(let item of this.$store.state.cartlist){
        //   选中取反为false不执行下面的return没选中执行下面的false
          if(!item.checked){
              return false
      }
     }
     return true
     //  选中item.checked为true取反为false再取反为false
     // 两个按钮都被选中的情况下为true取反为false再取反为true有一个不被选中就是false
     },
    },
     methods: {
       checkClick(){
         if(this.isSelectAll){//全部选中变为全部不选中
             this.$store.state.cartlist.forEach(item=>item.checked=false)
         }else{//全部不选中变为全部选中
              this.$store.state.cartlist.forEach(item=>item.checked=true)
         }
       },
       calcClick(){
           if(!this.isSelectAll){
               this.$toast.show('请选择购买的商品',1500)
           }
       }
      },
}
</script>
<style scoped>
.bottom-bar{
    position: fixed;
    display: flex;
    bottom: 49px;
    height: 40px;
    width: 100%;
    background-color: #eee;
}
.check-content{
    display: flex;
    position: relative;
    margin-left: 5px;
}
.check-button{
    position: absolute;
    top:10px;
    height: 20px;
    width: 20px;
}
.check-span{
 line-height: 40px;
 margin-left: 20px;
}
.total-price{
    line-height: 40px;
    margin-left: 15px;
    width: 150px;
}
.checkedLength{
    height: 40px;
    width: 90px;
   background-color: red;
   line-height: 40px;
   text-align: center;
}
</style>