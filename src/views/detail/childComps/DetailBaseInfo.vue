<template>
  <div>
       <div v-if="Object.keys(goods).length !==0" class="base-info">
           <!-- 判断如果是空对象不渲染 -->
        <div class="info-title">{{goods.title}}</div>
        <div class="info-price">
            <span class="r-price">{{goods.realPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span class="discount">{{goods.discount}}</span>
        </div>
        <div class="info-columns">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
             <span>{{goods.services[goods.services.length-1].name}}</span>
        </div>
        
        <div class="info-services">
            <span class="info-services-item" v-for="index in goods.services.length-1" :key='index'>
                <img :src="goods.services[index-1].icon" alt="">
                <span>{{goods.services[index-1].name}}</span>
              
            </span>
        </div>
    </div>

  </div>
</template>
<script>
export default {
    props:{
     goods:{
         type:Object,
         default(){
             return {}
         }
     }
    }
}
</script>
<style scoped>
.base-info{
    margin-top: 15px;
    padding:0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
}
.info-title{
    padding: 8px 8px 0 8px;
}
.info-price{
  margin-top: 10px;
}
.info-price .r-price{
      color: var(--color-high-text);
      font-size: 24px;
  }
.info-price .o-price{
   font-size: 5px;
   margin-left: 10px;
   text-decoration:line-through;
   }
   .info-price .discount{
    padding: 2px;
   background-color: red;
   color: #fff;
   font-size: 12px;
   border-radius: 10px;
   margin-left: 10px;
 
   }
   .info-columns{
       display: flex;
       justify-content:space-between;
        margin: 8px;
       border-bottom: 1px solid #ccc;
       font-size: 14px;
       color: #ccc;
       padding-bottom: 5px;
   }
   .info-services{
      line-height: 60px;
      height: 60px;
       display: flex;
       justify-content: space-between;
   }
  .info-services-item img{
      width: 14px;
      height: 14px;
      position: relative;
      top: 2px;
  }
  .info-services-item span{
      font-size: 13px;
      color: #333;
  }
</style>