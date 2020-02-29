import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY" : "6a3e89cd-d88e-4f3a-9ebc-280dc7449e40"
    }
})
    
export const userApi = {

    getUsers (currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
        },

    follow (userId) {
        return instance.post(`follow/${userId}`)
    },

    unfollow (userId) {
        return instance.delete(`follow/${userId}`)
    },

    getProfile (userId) {
        return instance.get(`profile/${userId}`)
    }
}

export const authApi = {
    authMe () {
        return instance.get(`auth/me`)
    }
}
                              
    
    
    
