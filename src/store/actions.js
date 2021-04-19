import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'
export default {
    addCart(context, payload) {
        return new Promise((reslove, reject) => {
            // payload新添加到商品
            let oldProduct = context.state.cartlist.find(item =>
                    item.iid === payload.iid
                )
                // let oldProduct = null;
                // for (let item of context.state.cartlist) {
                //     payload.iid === item.iid
                //     oldProduct = item
                // }有bug
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct) //如果是已有的商品那么就让他的页数加1
                reslove('添加的商品数量+1')
            } else {
                payload.count = 1 //如果是新的商品给添加一个count页数
                context.commit(ADD_TO_CART, payload) //新商品添加进去
                reslove('添加了新的商品')
            }
        })
    }
}