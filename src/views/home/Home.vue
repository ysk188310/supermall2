<template>
 <div id="home" >
      <nav-bar class="home-nav">
          <div slot="center">购物街</div>
          </nav-bar>
       <scroll class="content" ref="scroll"
        :probe-type="3" 
        @scroll='scrollcontent'
        :pullupload="true"
        @pullingUp='loadmore'>
                <home-swiper :banners='banners'></home-swiper>
          <recommend-view :recommends='recommends'/>
          <feature-view></feature-view>
          <tab-control :titles="['流行','新款','精选']" class="tab-control" @changetab="changetab"></tab-control>
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
        }
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
    computed:{
        // 展示的商品
      showgoods(){
          return this.goods[this.currentType].list
      }
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
         },
         backtopClick(){
         this.$refs.scroll.scrollTo(0,0)
         },
         //显示隐藏
         scrollcontent(position){
        //  console.log(position);
        this.isBackTop=(-position.y)>1000//判断上拉位置是否大于100
         },
        //  上拉加载更多
        loadmore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()//避免在加载图片的时候出现异步(图片加载是异步)
        },
        //  网络请求数据方法
        getHomeMultidata(){  
             getHomeMultidata().then(res=>{
           this.banners=res.data.banner.list;
           this.recommends=res.data.recommend.list;
        })
        },
        getHomeGoods(type){
            const page=this.goods[type].page+1 //是请求的数据的数据页面
              getHomeGoods(type,page).then(res=>{//type请求的数据的类型
              this.goods[type].list.push(...res.data.list)//拿到pop的list
              this.goods[type].page+=1//page的页数
            //   this.$refs.scroll.finishPull()
            this.$refs.scroll.scroll.finishPullUp();//上拉加载更多数据 
        })
        }
    },
}
</script>
<style scoped>
#home{
    padding-top: 44px;
    position: relative;
    height: 100vh;
}
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
     position: fixed;
       top: 0;
       left: 0;
       right: 0;
       z-index: 10;
}
.tab-control{
    position: sticky;
    top: 44px;
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