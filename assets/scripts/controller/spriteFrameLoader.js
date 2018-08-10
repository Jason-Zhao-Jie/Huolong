let loadedList = {

}

export default function loadSpriteFrame(src, func){
    if(loadedList.hasOwnProperty(src) && loadedList[src])
        func(loadedList[src])
    else{
        cc.loader.loadRes(src, cc.SpriteFrame, (err, sp)=>{
            loadedList[src] = sp
            func(sp)
        })
    }
}