<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav" @itemClick='itemClick' ref="nav"></detail-nav-bar>
     <scroll class="content" ref="scroll"
     @scroll='contentscroll'
     :probeType=3
     >
        <detail-swiper :banners='banners'></detail-swiper>
      <detail-base-info :goods='goods'></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info> 
     <detail-goods-info :detailInfo='detailInfo' @imageLoad='imageLoad'></detail-goods-info>
     <detail-param-info ref="params" :paramInfo='paramInfo'></detail-param-info>
     <detail-comment-info ref="comment" :commentInfo='commentInfo'></detail-comment-info>
     <goods-list ref="recommend" :goods='recommend'></goods-list>
     </scroll>
     <detail-bottom-bar @cartClick='addtoCart'></detail-bottom-bar>
       <back-top @click.native='backtopClick' v-show=" isBackTop"></back-top>
       <!-- <Toast :message='message' :show='show'></Toast> -->
    </div>
</template>
<script>
// 公共
import Scroll from 'components/common/scroll/Scroll'
// import Toast from 'components/common/toast/Toast'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'
// 子组件
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
//接口
import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail'
import {debouce} from 'components/common/utils'
import {itemListenerMixin} from  'components/common/mixin'
import DetailBottomBar from './childComps/DetailBottomBar'
// vuex
import { mapActions} from 'vuex'
export default {
  name:'Detail',
    components:{
      Scroll,
      // Toast,
      GoodsList,
      BackTop,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
        DetailBottomBar,
   
    },
    mixins:[itemListenerMixin],
    data() {
        return {
            iid:null,
            banners:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommend:[],
            themeTopYs:[],//offsetTop值
            getThemTopYs:null,//防抖
            currentIndex:0,  // 滚动到对应的位置显示对应的标题
            //  itemImgListener:null,放混入里面了
            isBackTop:false,
            // message:'',
            // show:false,
        }
    },
    methods: {
   ...mapActions(['addCart']),
      // backtop(){
      //   // this.$refs.Scroll.scrollTo(0,0,500)
      //   alert(1)
      // }
      // 滚动到对应的位置显示对应的标题
      contentscroll(position){
        // for(let i in this.themeTopYs){
        //   console.log(i+1);字符串
        // }
        // 点击回到顶部
         this.isBackTop=(-position.y)>1000
        //  获取我上拉的位置
        const positionY=-position.y;
        // positionY和主题值进行对比
        // 【0，7938，9120，9452】
        // positionY 在 0 和 7938 之间 index=0
        // positionY 在 =7938 和 9120 之间， index=1
        // positionY 在 9120 和 9452 之间， index =2
        // positionY  大于等于9120 值 index=3  （可以用个最大值）

        let length=this.themeTopYs.length
        for(let i=0;i<length;i++){
        // if(positionY >this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
        //   console.log(i);//到3不打印
        // }
      //  if(this.currentIndex!==i&&((i<length-1&& positionY>=this.themeTopYs[i]&&positionY
      //  <this.themeTopYs[i+1])||(i===length-1&&positionY>=this.themeTopYs[i]))){
      //     this.currentIndex=i;
      //      this.$refs.nav.currentindex=this.currentIndex;
      //     // 条件一
      //      // 防止赋值的过程频繁
      //     // this.currentIndex!==i
      //     // 条件二  判断区间在 0和 某个数字之间
      // //     (i<length-1&& positionY>=this.themeTopYs[i]&&positionY
      // //  <this.themeTopYs[i+1])
      //     // 条件三  判断大于等于 i===length-1
      //     // (i===length-1&&positionY>=this.themeTopYs[i])
      // //   console.log(this.currentIndex);
       
      //  }
       if(this.currentIndex!==i &&(positionY>=this.themeTopYs[i]&&positionY
       <this.themeTopYs[i+1])){
           this.currentIndex=i;
          //  拿到nav组件里面currentindex进行赋值 变换颜色
           this.$refs.nav.currentindex=this.currentIndex;
       }
        // this.currentIndex=i;
        // console.log(this.currentIndex);
        }
      },
     imageLoad(){
       this.$refs.scroll.refresh()
       this.getThemTopYs()

      // this.themeTopYs.push(0)  将之赋值给了.getThemTopYs进行防抖
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);
     },
     //点击跳转的对应的内容
     itemClick(index){
      //  console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
     },
      backtopClick(){
         this.$refs.scroll.scrollTo(0,0)
         },
        //  添加到购物车
         addtoCart(){
         //获取购物车需要展示的信息
         const product={}
         product.image=this.banners[0];
         product.title=this.goods.title;
         product.desc=this.goods.desc;
         product.price=this.goods.realPrice;
         product.iid=this.iid;
        //  console.log(product);
        // 普通调用actions里面的方法
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // })
        // 映射调用actions里面的方法
        this.addCart(product).then(res=>{
        this.$toast.show(res,1500)
        })
          // console.log(1);
         }
    },
    mounted() {

    // const refresh=debouce(this.$refs.scroll.refresh,500)
    // this.itemImgListener=()=>{    
    //          refresh();
    //      }传到混入里面了（mixin）
    //  this.$bus.$on('itemimageload',this.itemImgListener)
    // 数据没有渲染请求不到相应的数据
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);
    },
   destroyed() {
    this.$bus.$off('itemimageload',this.itemImgListener)
   },
    created(){
    this.iid=this.$route.params.iid
    // console.log(this.$route.params);
    //   this.iid=this.$route.query.iid
    // console.log(this.$route.query.iid);
    // 保存的iid
    // this.iid=this.$route.query.iid

    //根据iid请求数据
      getDetail(this.iid).then(res=>{
        const data=res.result

        console.log(res);
        // 轮播图信息
        this.banners=data.itemInfo.topImages

        // 商品信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 店铺信息
        this.shop=new Shop(data.shopInfo)

       //保存商品的详情数据
        this.detailInfo=data.detailInfo

        //详情页商品参数信息
        this.paramInfo=new GoodsParams(data.itemParams.info,data.itemParams.rule)
        // 第一次没有值的原因：数据没有请求过来，请求的值是没有
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);
        // 详情页评论信息
        if(data.rate.cRate !=0){
          this.commentInfo=data.rate.list[0]
        }
        //第二次
        //原因：图片没有在计算类
        // 根据最新的数据，对应的Dom是已经渲染出来
        // 但是有页面的图片没有加载完（目前获取的offsetTop不包含其中的图片）
        // offsetTop值不对的原因因为图片的问题
      //  this.$nextTick(()=>{ //下一帧  数据请求完会执行这个函数
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);
      // })
        })
        


      //请求详情页推荐数据
      getRecommend().then(res=>{
        // console.log(res);
       this.recommend=res.data.list
      })
      // 给getThemTopYs赋值并用debounce防抖
      this.getThemTopYs=debouce(()=>{
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)//添加一个最大值
      // console.log(this.themeTopYs);

     },100)
    },
    
}
</script>
<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  /* 定位方法 */
  /* .content{
   position: absolute;
   top: 44px;
   bottom: 1px;
   left: 0;
   right: 0;
   overflow: hidden;
  } */
  .content{
    height: calc(100% - 93px);
  }
</style>