import Post from '../models/Posts.js';
import 'dotenv/config';
import { createError } from "../error.js";
import { v2 as cloudinary} from 'cloudinary';
// import axios from 'axios';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const getAllPosts =async(req,res,next)=>{
try {
    const posts=await Post.find({});
    return res.status(200).json({
        status:"success",
        success:true,
        data:posts
        // const result= await axios.get('/api/post/');
        // const res=result.json();
        // console.log(res.data);


        //const result =axios.get('/api/post/').then(res=>{ 
            // res.json();
            // }).then(res=>{
                // console.log(res)
            // })

    })
} catch (error) {
    next(createError(error.status,error?.response?.data?.error.message||error.message));
}
}

export const createPost=async(req,res,next)=>{
    try {
        const {name,prompt,photo}=req.body;

        const photoUrl=await cloudinary.uploader.upload(photo);//3rd api

        const newPost=await Post.create({
            name,prompt,photo:photoUrl?.secure_url
        });
            return res.status(201).json({success:true,data:newPost})
    } catch (error) {
        next(createError(error.status,error?.response?.data?.error.message||error.message));  
    }
}