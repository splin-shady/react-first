import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '6a3e89cd-d88e-4f3a-9ebc-280dc7449e40',
  },
});

export const userApi = {

  getUsers(currentPage, pageSize) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },

  follow(userId) {
    return instance.post(`follow/${userId}`);
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  },

  getProfile(userId) {
    return profileApi.getProfile(userId);
  },
};

export const profileApi = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`);
  },

  getStatus(userId) {
    return instance.get(`/profile/status/${userId}`);
  },

  updateStatus(status) {
    return instance.put('/profile/status', { status });
  },

  saveNewPhoto(photo) {
    const formData = new FormData();
    formData.append('image', photo);
    return instance.put('/profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  saveProfile(profile) {
    return instance.put('/profile', profile);
  },
};

export const authApi = {
  authMe() {
    return instance.get('auth/me');
  },

  login(email, password, rememberMe = false, captcha = null) {
    return instance.post('auth/login', {
      email, password, rememberMe, captcha,
    });
  },

  logout() {
    return instance.delete('auth/login');
  },
};

export const securityApi = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url');
  },
};
