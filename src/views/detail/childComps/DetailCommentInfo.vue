<template>
   <div v-if="Object.keys(commentInfo).length != 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">更多
          <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.name}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
       <span class="date">{{commentInfo.created | showDate}}</span>
       <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
         <img :src="item" v-for="(item ,index) in commentInfo.images" :key='(item ,index)'>
      </div>
    </div>
   </div>
</template>
<script>
import {formatDate} from 'components/common/utils'
export default {
    props:{
        commentInfo:{
            type:Object,
        }
    },
    filters:{
        showDate(value){
            // 传入的是毫秒需要成1000
            const date=new Date(value*1000)
           //   传入的时间戳
            return formatDate(date,'yyyy/MM/dd')
        }
    }
}
</script>