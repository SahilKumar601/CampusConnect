export const userquery = (userId)=>{
    const query =`*[_type=="user" && _id == '${userId}']`;
    return query;
}