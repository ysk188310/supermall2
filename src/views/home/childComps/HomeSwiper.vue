<template>
     <Swiper>
              <swiper-item v-for="item in banners" :key='item' >
                  <a :href="item.link">
                      <img :src="item.image" alt="" 
                      @load="imageload">
                  </a>
              </swiper-item>
          </Swiper>
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
            isload:false
        }
    }, 
    components:{
         Swiper,
          SwiperItem,
    },
  methods: {
    //   直传一次
      imageload(){
        if(!this.isload){
              this.$emit('imageitemload')
              this.isload=true;
        }
        //   console.log(1235);
      }
  },
}
</script>