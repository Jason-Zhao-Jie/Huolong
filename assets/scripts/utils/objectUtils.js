export default {
    dump(v){
        let ret = "";
        switch(typeof v){
            case 'object':
                ret += '{';
                for (let k in v) {
                    if (v.hasOwnProperty(k))
                        ret += k + ':' + this.dump(v[k]) + ',';
                }
                ret += '}';
                break;
            case 'string':
                ret = '"' + v + '"';
                break;
            case 'null':
                ret = 'null';
                break;
            case 'undefined':
                ret = 'undefined';
                break;
            default:
                ret = v.toString();
        }
        return ret;
    },


}