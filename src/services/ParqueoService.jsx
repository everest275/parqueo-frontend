import request from '../libs/Axios'

export const post= async(url,data)=>{
    const result= await request.post(url,data)
    return result
}

export const put= async(url,data)=>{
    const result= await request.put(url,data)
    return result
}

export const get= async(url)=>{
    const result= await request.get(url)
    return result
}

export const remove= async(url,id)=>{
    const result= await request.delete(url+"/"+id)
    return result
}