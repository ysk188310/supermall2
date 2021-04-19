//详情页数据
import { request } from './request'
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}
// 推荐数据
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.discountBgColor = itemInfo.descountBgColor
        this.realPrice = itemInfo.lowNowPrice
        this.columns = columns
        this.services = services
    }
}
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}
// 数据整合
export class GoodsParams {
    constructor(info, rule) {
        //  注images可能没有值（某些商品，某些值）
        this.image = info.images ? info.images[0] : ''; //判断有没有有的话
        this.infos = info.set;
        this.size = rule.tables;
    }
}