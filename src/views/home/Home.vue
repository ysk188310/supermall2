<template>
 <div id="home" >
      <nav-bar class="home-nav">
          <div slot="center">购物街</div>
          </nav-bar>
          <tab-control :titles="['流行','新款','精选']" class="tab-control" @changetab="changetab"
           ref="tabcontrol1"
           v-show="istabcontrol"
           ></tab-control>
       <scroll class="content" ref="scroll"
        :probe-type="3" 
        @scroll='scrollcontent'
        :pullupload="true"
        @pullingUp='loadmore'>
                <home-swiper :banners='banners'
                @imageitemload='imageitemload'></home-swiper>
          <recommend-view :recommends='recommends'/>
          <feature-view></feature-view>
          <tab-control :titles="['流行','新款','精选']" class="tab-control" @changetab="changetab"
           ref="tabcontrol2">
          </tab-control>
         <goods-list :goods='showgoods'></goods-list>
       </scroll>
       <back-top @click.native='backtopClick' v-show="isBackTop"></back-top>
 </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'


import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debouce} from 'components/common/utils'
import {itemListenerMixin} from 'components/common/mixin'

export default {
    name:'Home',
    components:{
          NavBar,
          Scroll,
          TabControl,
          BackTop,
         GoodsList,
          HomeSwiper,
        RecommendView,
        FeatureView,  
    },
    // 混入
    mixins:[itemListenerMixin],
    data() {
        return {
            banners:[],
            recommends:[],
            goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isBackTop:false,
            topoffsetTop:0,
            istabcontrol:false,
            saveY:0,
            // itemImgListener:null,
        }
    },
    destroyed() {
        // console.log('销毁了');
    },
    activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)//调用离开时scroll里面y的值
        this.$refs.scroll.scroll.refresh()//刷新页面，防止页面出现空白
      
    },
    deactivated() {
         //离开时保存scrolly的值里面y的值
        this.saveY=this.$refs.scroll.scroll.y
        // 取消全局事件的监听
        this.$bus.$off('itemimageload',this.itemImgListener)
    },
    created(){
        //请求多个数据
        // getHomeMultidata().then(res=>{
        //    this.banners=res.data.banner.list;
        //    this.recommends=res.data.recommend.list;
        // }),
        //请求商品数据
        // getHomeGoods(pop,1).then(res=>{
        //     console.log(res);
        // })
        // 封装
         this.getHomeMultidata()//轮播图
         this.getHomeGoods('pop')//传入的pop类型
         this.getHomeGoods('new')
         this.getHomeGoods('sell')
    },
    mounted() {
        // func=this.$refs.scroll.refresh
        // const refresh=function(...args){
        //     if(timer)clearTimeout(timer)
        //     timer=setTimeout(()=>{
        //     func=this.$refs.scroll.refresh.apply(this,args)
        //     },500)
        // }
        // //* 调用防抖操作
        // const refresh=debouce(this.$refs.scroll.refresh,500)
        //  //*  对我们监听的事件进行保存
        //  this.itemImgListener=()=>{
        //     //  this.$refs.scroll.refresh();//不进行防抖会执行30次
        //      refresh();
        //     //  console.log('----------------');//每请求一页数据就执行一下会使页面卡顿
        //  }
        //  // * 监听item中的图片加载完成 
        //  this.$bus.$on('itemimageload',this.itemImgListener)
        //  ()=>{
        //     //  this.$refs.scroll.refresh();//不进行防抖会执行30次
        //      refresh();
        //     //  console.log('----------------');//每请求一页数据就执行一下会使页面卡顿
        //  })
         
    },
    computed:{
        // 展示的商品
      showgoods(){
          return this.goods[this.currentType].list
      },
    },
     methods: {
         //事件监听方法
         changetab(index){
            switch(index){
                case 0:
                this.currentType='pop'
                break
                case 1:
                this.currentType='new'
                break
                case 2:
                this.currentType='sell'
                break
            }
            this.$refs.tabcontrol1.currentindex=index;
            this.$refs.tabcontrol2.currentindex=index;
         },
         backtopClick(){
         this.$refs.scroll.scrollTo(0,0)
         },
         //显示隐藏
         scrollcontent(position){
        //  console.log(position);
        this.isBackTop=(-position.y)>1000//判断上拉位置是否大于100
        this.istabcontrol=(-position.y)>this.topoffsetTop//决定滚动定位
         },
        //  上拉加载更多
        loadmore(){
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.scroll.refresh()//避免在加载图片的时候出现异步(图片加载是异步)
        },
        // 封装防抖操作
        // debouce(func,delay){//func传入的函数名称 delay延迟时间 
        //     let timer=null;
        //     return function(...args){
        //         if(timer)clearTimeout(timer)//清除之前的定时器
        //         timer=setTimeout(()=>{//生成一个新的定时器将它赋值给timer
        //             func.apply(this,args)
        //         },delay)
        //     }
        // },
        //  网络请求数据方法
        getHomeMultidata(){  
             getHomeMultidata().then(res=>{
           this.banners=res.data.banner.list;
           this.recommends=res.data.recommend.list;
        })
        },
        // 获取正确的offsetTop
        imageitemload(){
        //   所有的组件都一个$el的属性，用来获取组件中的元素
        this.topoffsetTop=this.$refs.tabcontrol2.$el.offsetTop;
        },
        getHomeGoods(type){
            const page=this.goods[type].page+1 //是请求的数据的数据页面
              getHomeGoods(type,page).then(res=>{//type请求的数据的类型
              this.goods[type].list.push(...res.data.list)//拿到pop的list
              this.goods[type].page+=1//page的页数
            //   this.$refs.scroll.finishPull()//上拉加载更多数据 
            this.$refs.scroll.scroll.finishPullUp();//上拉加载更多数据  
        })
        }
    },
}
</script>
<style scoped>
#home{
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
}
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 在我们使用浏览器原生滚动，为了让导航不跟随跟随滚动
     position: fixed;
       top: 0;
       left: 0;
       right: 0;
       z-index: 10; */
}
.tab-control{
    position: relative;
    z-index: 10;
}
.content{
    /* height: 300px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>