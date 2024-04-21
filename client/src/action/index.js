export const IsLoading = (data) => {
    return {
        type : 'LOADING',
        payload: data
    }
}

export const UserData = (data) => {
    return {
        type : "USER",
        payload: data
    }
}
