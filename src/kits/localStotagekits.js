const key = "buyGoodsCount";

export function setItem(goodsinfo) {
    var goodsobj = getItem();
    if (goodsobj[goodsinfo.gid]) {
        goodsobj[goodsinfo.gid] += goodsinfo.count;
    } else {
        goodsobj[goodsinfo.gid] = goodsinfo.count;
    }
    //将修改后的goodsObj的值设置回localstorage中
    localStorage.setItem(key, JSON.stringify(goodsobj));
}

export function getItem() {
    var gtr = localStorage.getItem(key);
    //将字符串转换为js对象
    var obj = JSON.parse(gtr);
    if (!obj) {
        localStorage.setItem(key, JSON.stringify({}));
        return {};
    }
    return obj;
}

export function delItem(id) {
    var goodsobj = getItem();
    if (goodsobj[id]) {
        delete goodsobj[id];
    } else {
        return;
    }
    localStorage.setItem(key, JSON.stringify(goodsobj));
}

export function updateItem(obj) {
    var goodsobj = getItem();
    goodsobj[obj.gid] = obj.count;
    localStorage.setItem(key, JSON.stringify(goodsobj));
}