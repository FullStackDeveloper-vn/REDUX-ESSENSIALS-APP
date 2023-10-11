import React, { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { PostAuthor } from "./PostAuthor"
import { TimeAgo } from "./TimeAgo"
import { ReactionButtons } from "./ReactionButtons"
import { Spinner } from '../../components/Spinner'

import { useGetPostsQuery } from "../api/apiSlice"
import classnames from 'classnames'

let PostExcerpt = ({ post }) => {
    // const post = useSelector(state => selectPostById(state, postId))

    return (
        <article className="post-excerpt" >
            <h3> {post.title} </h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timestamp={post.date} />
            </div>
            <p className="post-content" >{post.content.substring(0, 100)} </p>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`} className="button muted-button" >
                View Full Post
            </Link>
        </article>
    )
}
// PostExcerpt = React.memo(PostExcerpt)

export const PostsList = () => {
    const { data: posts = [],
        isLoading, isFetching, isSuccess, isError, error, refetch } = useGetPostsQuery()
    // // const posts = useSelector(state => state.posts)
    // const dispath = useDispatch()
    // const orderedPostIds = useSelector(selectPostIds)
    // const posts = useSelector(selectAllPosts)

    // const postStatus = useSelector(state => state.posts.status)
    // const error = useSelector(state => state.posts.error)

    // useEffect(() => {
    //     if (postStatus === 'idle') {
    //         dispath(fetchPosts())
    //     }
    // }, [postStatus, dispath])

    const sortedPosts = useMemo(() => {
        const sortedPosts = posts.slice()
        // Sort posts in descending chronological order
        sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
        return sortedPosts
    }, [posts])

    let content
    if (isLoading) {
        content = <Spinner text="Loading...." />
    } else if (isSuccess) {
        const renderedPosts = sortedPosts.map(post => (
            <PostExcerpt key={post.id} post={post} />
        ))
        const containerClassname = classnames('posts-container', {
            disabled: isFetching
        })
        content = <div className={containerClassname} > {renderedPosts} </div>
        // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        // content = orderedPosts.map(post => (
        //     <PostExcerpt key={post.id} post={post} />
        // content = orderedPostIds.map(postId => (
        //     <PostExcerpt key={postId} postId={postId} />
        // ))
        // content = sortedPosts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (isError) {
        content = <div>{error.toString} </div>
    }


    // const renderedPosts = orderedPosts.map(post => (
    //     <article className="post-excerpt" key={post.id}>
    //         <h3> {post.title} </h3>
    //         <div>
    //             <PostAuthor userId={post.user} />
    //             <TimeAgo timestamp={post.date} />
    //             <ReactionButtons post={post} />
    //         </div>
    //         <p className="post-content" > {post.content.substring(0, 100)} </p>
    //         <Link to={`/posts/${post.id}`} className="button muted-button" >View Full Post</Link>
    //     </article>
    // ))

    return (
        <section className="posts-list" >
            <h2> Posts </h2>
            <button onClick={refetch} >Refetch Posts </button>
            {content}
        </section>
    )
}
