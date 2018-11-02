let defaultFindFunc = (a, b)=>{
    return a==b
}

export default {
    mix(){
        let ret = []
        for(let i=0; i<arguments.length; ++i){
            if(arguments[i] != null){
                for(let k=0; k<arguments[i].length; ++k){
                    ret.push(arguments[i][k])
                }
            }
        }
        return ret
    },

    find(arr, elem, findFunc = defaultFindFunc){
        for(let i in arr){
            if(findFunc(elem, arr[i]))
                return i
        }
        return null
    },

    findAll(arr, elem, findFunc = defaultFindFunc){
        let ret = []
        for(let i in arr){
            if(findFunc(elem, arr[i]))
                ret.push(i)
        }
        return ret
    },

    eraseAll(arr, elem = null, findFunc = defaultFindFunc){
        if(elem == null){
            while(arr.length > 0){
                arr.pop()
            }
        } else {
            let ret = this.findAll(arr, elem, findFunc)
            for(let i=ret.length-1; i>=0; --i){
                arr.splice(ret[i], 1)
            }
        }
    },
}