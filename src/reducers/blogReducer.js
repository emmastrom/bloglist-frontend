import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        like(state, action) {
            return state.map((blog) =>
                blog.id !== action.payload.id ? blog : action.payload
            )
        },
        removeBlog(state, action) {
            return state.filter((blog) => blog.id !== action.payload.id)
        },
    },
})

export const { like, removeBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        dispatch(appendBlog(newBlog))
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const liked = await blogService.update(blog.id, {
            ...blog,
            likes: blog.likes + 1,
        })
        dispatch(like(liked))
    }
}

export const deleteBlog = (removedBlog) => {
    return async (dispatch) => {
        await blogService.remove(removedBlog.id)
        dispatch(removeBlog(removedBlog))
        dispatch(setNotification(`deleted blog ${removedBlog.title}`))
    }
}

export default blogSlice.reducer
