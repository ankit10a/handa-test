export const checkIfEmpty =(obj)=>{
    let err=[];
    for(let key in obj){
        if(![key]){
            err.push({[key]:obj[key]})
        }

    }
    return {isValid:err.length>0?false:true,err:err}
}