<template>
    <div class="goodslistitem" @click='toitem'>
        <img v-lazy="showimage" alt="" @load="imageload" @click='toitem'>
        <div class="goodsinfo">
            <p>{{goodsitem.title}}</p>
        <span class="price">{{goodsitem.price}}</span>
        <span class="collect">{{goodsitem.cfav}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        goodsitem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
      computed:{
        showimage(){
           return this.goodsitem.image || this.goodsitem.show.img 
        }
    },
    methods: {
       imageload(){
        //    因为不管是详情页还是home只要用item组件加载完就会执行刷新
        // if(this.$router.path.indexOf('/home')){
        //     this.$bus.$emit('homeItemImgLoad')
        // }else if(this.$router.path.indexOf('/detail')){
        //     this.$bus.$emit('detailItemImgLoad')
        // }

        this.$bus.$emit('itemimageload')
       },
       toitem(){
        //  this.$router.push('./detail/'+this.goodsitem.iid);
        this.$router.push({
            path:'./detail'+this.goodsitem.iid,
            query:{
                iid:this.goodsitem.iid
            }
        })
       }
    },
}
</script>
<style scoped>
.goodslistitem{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
}
.goodslistitem img{
    width: 100%;
    border-radius: 5px;
}
.goodsinfo{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}
.goodsinfo p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goodsinfo .price{
    color: var(--color-high-text);
    margin-right: 20px;
}
.goodsinfo .collect{
    position: relative;
}
.goodsinfo .collect::before{
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>