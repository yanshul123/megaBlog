import React, {useCallback} from "react";
import {useForm} from 'react-hook-form';
import {Button, Input, Select, RTE} from '../index';
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function PostForm({post}) {
    const {register, handleSubmit, watch, setValue,
        control, getValues} = useForm({
            defaultValues:{
                title: post?.title || '',
                slug: post?.$id|| '',
                content: post?.content || '',
                status: post?.status || 'active'
            },
    });

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth?.userData)
    console.log("userData of anshul:" , userData);

    const submit = async(data) => {
        if(post){
            console.log("📦 Submitting new post...");
            const file = data.image[0] ? await appwriteService.
            uploadFile(data.image[0]) : null;

            console.log("Uploaded file:", file);

            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost
            (post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
            }
        } else{
            const file = await appwriteService.uploadFile
            (data.image[0]);

            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;

                const dbPost = await appwriteService.createPost({
                     userId: userData.$id,
                    ...data   
                });
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        
        }; 
   }
    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string')
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9._%-]+/g, '-') 
            .replace(/\s/g, '-');

        return '';
        
    },[]);

    React.useEffect(() =>{
        const subscription = watch((value, {name}) =>{
           if(name === 'title'){
            setValue('slug', slugTransform(value.title),
                {shouldValidate: true});
           } 
        })
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
       <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

        <div className="w-2/3 px-2">

        <Input
        label = "Title:"
        placeholder = "Title"
        className = "mb-4 w-full"
        {...register("title", {required:true})}
        />

        <Input
        label = "slug:"
        placeholder = "Slug"
        className = "mb-4 w-full"
        {...register("slug", {required:true})}
        onInput ={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value),{
                shouldValidate:true});
        }}
        />
        <RTE label = "Content :" name = "content"
        control = {control} defaultValue = {getValues
            ("content")}
        />

        </div>

        <div className="w-1/3 px-2 text-center">
        <Input
        label = "Featured Image :"
        type = "file"
        className = "mb-4 w-full"
        accept = "image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", {required: !post})}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                src = {appwriteService.
                    getFileView(post.
                    featuredImage)}
                    alt = {post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
        options = {["active", "inactive"]}
        label = "Status"
        className = "mt-4 mb-4 w-full"
        {...register("status", {required:
            true})}
        />
        <Button type ="submit" bgColor = {post ?
            "bg-green-500" : undefined}
            className = "w-full"
        >
            {post ? "Update" : "Submit"}
        </Button>
        </div>
       </form>
    );
}
