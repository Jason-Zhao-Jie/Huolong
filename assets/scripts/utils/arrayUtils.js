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
    }
}