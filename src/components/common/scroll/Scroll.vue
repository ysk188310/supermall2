<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:'scroll',
    props:{
    probeType:{
    type:Number,
    default:0
 },pullupload:{
     type:Boolean,
     default:false
 }
    },
    data() {
        return {
            scroll:null
        }
    },
    mounted() {
        // 1.创建scroll对象初始化scroll对象
       this.scroll=new BScroll(this.$refs.wrapper,{
           click:true,
           probeType:this.probeType,
           pullUpLoad:this.pullupload
       })
    //    this.scroll.scrollTo(0,0)
    // 2.监听滚动位置
    this.scroll.on('scroll',(position)=>{
        // console.log(position);
        this.$emit('scroll',position) //子传父
    })
   
    if(this.pullupload){
     // 上拉加载更多
    this.scroll.on('pullingUp',()=>{
       this.scroll&&this.$emit('pullingUp')//判断有没有this.scroll
    })
    }
    },

    methods: {
   scrollTo(x,y,time=500){
       this.scroll.scrollTo(x,y,time)
   },
//    上拉加载更多
//    finishPull(){
//        this.scroll&&this.scroll.finishPullup();
//    },
   refresh(){
      this.scroll&&this.scroll.refresh();
    // console.log(123);
    // console.log(this.scroll);
   }
   }
}
</script>
<style scoped>

</style>