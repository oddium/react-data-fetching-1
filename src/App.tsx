import {get} from "./util/get.ts";
import {type ReactNode, useEffect, useState} from "react";
import {z} from 'zod';
import BlogPosts, {BlogPost} from "./components/BlogPost.tsx";
import fetchingImage from '../public/data-fetching.png';
import ErrorMessage from "./components/ErrorMessage.tsx";

const rawDataBlogPostSchema = z.object({
    id: z.number(),
    userId: z.number(),
    title: z.string(),
    body: z.string(),
});

const App = () => {
    const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsFetching(true);
            try {
                const data = await get('https://jsonplaceholder.typicode.com/posts', z.array(rawDataBlogPostSchema));

                //const parsedData = expectedResponseDataSchema.parse(data);

                const blogPosts: BlogPost[] = data.map((rawPost) => {
                    return {
                        id: rawPost.id,
                        title: rawPost.title,
                        text: rawPost.body,
                    }
                });
                setFetchedPosts(blogPosts);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
            setIsFetching(false);
        }

        fetchPosts();
    }, []);

    let content: ReactNode;

    if (error) {
        content = <ErrorMessage text={error}/>
    }

    if (fetchedPosts) {
        content = <BlogPosts posts={fetchedPosts}/>;
    }

    if (isFetching) {
        content = <p id='loading-fallback'>Fetching Posts</p>;
    }

    return <main>
        <img src={fetchingImage} alt="An abstract image depiciting data fetching process."/>
        {content}
    </main>;
}

export default App;
