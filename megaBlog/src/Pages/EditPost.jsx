import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [Post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) =>{
                if(slug){
                    setPosts(post)
                }
            })
        } else{
            navigate('/')
        }f 
    },[slug, navigate])
    return Post ? (
        <div className='py-8'>
            <Container>
                <PostForm post = {Post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost