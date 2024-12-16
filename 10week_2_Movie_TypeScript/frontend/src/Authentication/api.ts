//백엔드랑 연결

import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const signupUser = async (data:
    {
        email: string;
        password: string;
        passwordCheck: string;
    }) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, data);
            return response.data;
        } catch (error) {
            console.error('회원가입 요청 실패:', error);
            throw new Error('회원가입에 실패했습니다');
        }
    };

export const loginUser = async (data: {email: string; password: string}) => {
    try {    
        const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    });
    if (!response.ok) {
        throw new Error('로그인 실패');
    }
    const reseponseData = await response.json();
    return reseponseData;
    } catch (error) {
        console.error('로그인 요청 실패:', error);
        throw new Error('로그인에 실패했습니다');
    }
};