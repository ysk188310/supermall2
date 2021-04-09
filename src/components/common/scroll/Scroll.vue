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
        // 1.创建scroll对象
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
    }),
    // 上拉加载更多
    this.scroll.on('pullingUp',()=>{
       this.$emit('pullingUp')
    })
    },

    methods: {
   scrollTo(x,y,time=500){
       this.scroll.scrollTo(x,y,time)
   },
   finishPull(){
       this.scroll.finishPullup();
   }
   }
}
</script>
<style scoped>

</style>