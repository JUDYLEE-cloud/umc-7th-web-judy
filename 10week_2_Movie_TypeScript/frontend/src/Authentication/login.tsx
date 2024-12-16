import React from "react";
import { loginValidationSchema } from "./validate";
import { loginUser } from "./api";
import { useNavigate } from "react-router-dom";
import useCustomForm from "../hooks/useCustomForm";

import { Form, Heading, LabelInline, ErrorText, FormGroupInline, InputInline, SubmitButton } from "./signup";

import '../variable.css';

interface loginFormInputs {
    email: string;
    password: string;
}

const Login : React.FC = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, errors} = useCustomForm<loginFormInputs>(loginValidationSchema);

    const onSubmit = async(data: loginFormInputs) => {
        try {
            const response = await loginUser(data);
            const {accessToken} = response.data;
            localStorage.setItem('accessToken', accessToken);
            console.log('로그인 성공:', response);

            const username = data.email.split('@')[0];
            alert(`${username}님 반갑습니다. 홈 화면으로 이동합니다.`);
            navigate('/');
        } catch (error: any) {
            console.error('로그인 실패:', error.response?.data || error.message);
            alert('로그인에 실패했습니다. 다시 시도해주세요');
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Heading>Log in</Heading>

            <FormGroupInline>
                <LabelInline htmlFor="email">Email:</LabelInline>
                <InputInline
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'error-border' : '' }
                    />
            </FormGroupInline>
            {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

            <FormGroupInline>
                <LabelInline htmlFor="password">Password:</LabelInline>
                <InputInline
                    id="password"
                    type="password"
                    {...register('password')}
                    className={errors.password ? 'error-border' : ''}
                    />
            </FormGroupInline>
            {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

            <SubmitButton type="submit">Log in</SubmitButton>
        </Form>
    );
};

export default Login;