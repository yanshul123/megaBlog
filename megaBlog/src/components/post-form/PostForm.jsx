import React, {useCallback} from "react";
import {useForm} from 'react-hook-form'
import {Button, Input, Select, RTE} from '../index'
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function PostForm(){
    const {register, handleSubmit, watch, setValue,
        control, getValues} = useForm({
            defaultValues:{
                title: Post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'active'
            },
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit = async(data) => {
        if(post){
            const file = data.image[0] ? appwriteService.
            uploadFile(data.image[0]) : null

            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost
            (post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })
            if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
            }
        } else{
            const file = await appwriteService.uploadFile
            (data.image[0]);

            if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                await appwriteService.createPost({
                    ...data,
                    userID: userData.$id,
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }
    const slugTransform = useCallback((value) => {
        if(value && typeof valueu === 'string')
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')

        return ''
        
    },[])
    React.useEffect(() =>{
        const subscription = watch((value, {name}) =>{
           if(name === 'title'){
            setValue('slug', slugTransform(value.title,
                {shouldValidate: true}))
           } 
        })
    }, [])
    return (
       <form onSubmit={handleSubmit(submit)} className="fles flex-wrap">
        <div className="w-2/3 px-2">

        <Input
        label = "Title:"
        placeholder = "Title"
        className = "mb-4"
        {...register("title", {required:
            true})}
        />

        <Input
        label = "slug:"
        placeholder = "Slug"
        className = "mb-4"
        {...register("slug", {reuired:
            true})}
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
        <div className="w-1/3 px-2">
        <Input
        label = "Featured Image :"
        type = "file"
        className = "mb-4"
        accept = "image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", {required: !post})}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                src = {appwriteService.
                    getFilePreview(post.
                    featuredImage)}
                    alt = {post.title}
                />
            </div>
        )}
        <Select
        options = {["active", "inactive"]}
        label = "Status"
        className = "mb-4"
        {...register("status", {required:
            true})}
        />
        <Button type ="submit" bgColor = {post ?
            "bg-green-500" : undefined}
            className = "w-full"
        >
            {post ? "Update" : Submit}
        </Button>
        </div>
       </form>
    )
}

export default PostForm