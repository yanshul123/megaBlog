import React,{useState, useEffect} from "react";
import {Container, PostCard} from "../components";
import appwriteService from "../appwrite/config"

function AllPosts(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
        if(posts){
            console.log("📦 Posts from Appwrite:", posts.documents); 
            setPosts(posts.documents)
        }
    });
    }, [])
    
    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((posts) =>(
                        <div key = {posts.$id} className="p-2 w-1/4">
                            <PostCard 
                            $id={posts.$id}
                            title={posts.title}
                            featuredImage={posts.featuredImage}
                            />
                        </div>
                    ))}gi
                </div>
            </Container>
        </div>
    )
}

export default AllPosts