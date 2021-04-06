<template>
   <div class="tab-bar-item" @click="itemClick">
       <!-- <img src="../../assets/img/tabbar/home.svg">
       <div>首页</div> -->
       <!-- <slot v-if="!isActive" name="item-icon"></slot> -->
       <div v-if="!isActive"><slot name="item-icon"></slot></div>
       <!-- <slot v-else name="item-icon-active"></slot> -->
       <div v-else> <slot name="item-icon-active"></slot></div>
         <div :style="activeStyle"><slot name="item-text"></slot></div>
   </div>
</template>
<script>
export default {
    name:"TabBarItem",
    props:{
        path:String,//父传子
        activeColor:{
            type:String,
            default:'red'//默认颜色

        } 
    },
    data() {
        return {
            // isActive:true
        }
    },
    computed:{//只执行一次  
        isActive(){
return this.$route.path.indexOf(this.path)!==-1;
        },
        activeStyle(){
            return this.isActive?{color:this.activeColor}:{}//是否处于活跃
        }
    },
    methods: {
        itemClick(){
           this.$router.replace(this.path)
        }
    },

}
</script>
<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
 
}
.tab-bar-item img{
  height: 24px;
  width: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

</style>