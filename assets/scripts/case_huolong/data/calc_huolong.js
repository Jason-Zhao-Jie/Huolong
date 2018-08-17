export default {
    totalMains(value, groupNum){
        if(value == 2){
            return groupNum * 18
        }else{
            return groupNum * 21
        }
    },

    totalScores(groupNum){
        return groupNum * 100
    }

    
}