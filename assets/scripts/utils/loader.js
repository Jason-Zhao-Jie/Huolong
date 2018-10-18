// 项目报错时, 执行以下替换:
// 字符串 require('google-protobuf替换为require('db://assets/scripts/protocol/google-protobuf
// 字符串 require('google-protobuf')替换为require('db://assets/scripts/protocol/google-protobuf')


let loadedList = {

}

let createImage = (width, height)=>{
    let ret = null
    if(wx && wx.createImage){
        ret = wx.createImage()
        if(width)
            ret.width = width
        if(height)
            ret.height = height
    }else{
        ret = new Image(width, height)
    }
    return ret
}

export default {
    loadSpriteFrame:(src, callback)=>{
        if(loadedList.hasOwnProperty(src) && loadedList[src])
            callback(loadedList[src])
        else{
            cc.loader.loadRes(src, cc.SpriteFrame, (err, sp)=>{
                loadedList[src] = sp
                callback(sp)
            })
        }
    },
    loadImgTextureFromUrl: (url, callback)=>{
        if(!url)
            return false
        if(loadedList.hasOwnProperty(url) && loadedList[url]){
            callback(loadedList[url])
            return true
        }
        let img = createImage()
        img.onload = function(){
            let texture2d = new cc.Texture2D()
            texture2d.initWithElement(img)
            texture2d.handleLoadedTexture()
            loadedList[url] = texture2d
            callback(texture2d)
        }
        img.src= url
        return true
    },
}
