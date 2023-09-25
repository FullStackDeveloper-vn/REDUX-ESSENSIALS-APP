import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit";
// import { postAdded } from "./postsSlice";
import { useHistory } from 'react-router-dom'
import { postUpdated } from "./postsSlice";
import { selectPostById } from "./postsSlice";


export const EditPostForm = ({ match }) => {

    const { postId } = match.params
    // const post = useSelector(state =>
    //     state.posts.find(post => post.id === postId)
    // )

    const post = useSelector(state => selectPostById(state,postId))

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const dispatch = useDispatch()
    const history = useHistory()

    const ontitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(
                postUpdated({
                    id: postId,
                    title,
                    content
                })
            )
            history.push(`/posts/${postId}`)

        }
    }

    return (
        <section >
            <h2> Edit  Post </h2>
            <form>
                <label htmlFor="postTitle" > Post Title </label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={ontitleChange}
                />
                <label htmlFor="postContent" > Content : </label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button type="button" onClick={onSavePostClicked} > Save Post </button>
            </form>
        </section>
    )
}