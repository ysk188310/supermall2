<template>
    <div class="goodslistitem">
        <img :src="goodsitem.show.img" alt="">
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
    }
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