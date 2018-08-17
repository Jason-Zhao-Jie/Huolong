export default {
    min(){
        if(arguments.length <= 0)
            return null
        let ret = arguments[0]
        for(let i=1; i<arguments.length; ++i){
            if(arguments[i] != null){
                if(ret == null || ret > arguments[i])
                    ret = arguments[i]
            }
        }
        return ret
    }
}