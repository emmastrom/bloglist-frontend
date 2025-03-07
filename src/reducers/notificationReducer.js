import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
    },
})

export const { showNotification } = notificationSlice.actions

export const setNotification = (message) => {
    return async (dispatch) => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(showNotification(''))
        }, 5000)
    }
}

export default notificationSlice.reducer
