import React from 'react';
import styled from 'styled-components';
import { signupValidationSchema } from './validate';
import { signupUser, loginUser } from './api';
import { useNavigate } from 'react-router-dom';
import useCustomForm from '../hooks/useCustomForm';
import '../variable.css';

interface SignupFormInputs {
  email: string;
  password: string;
  passwordCheck: string;
}

const Signup : React.FC = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, errors} = useCustomForm<SignupFormInputs>(signupValidationSchema);

    const onSubmit = async(data: SignupFormInputs) => {
      try {
        const response = await signupUser(data);
        console.log('회원가입 성공:', response);
        alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');

        const loginResponse = await loginUser({email: data.email, password: data.password});
        const {accessToken} = loginResponse.datail;
        localStorage.setItem('accessToken', accessToken);

        navigate('/login');
      } catch (error: any) {
        console.error('회원가입 실패:', error.response?.data || error.message);
        alert('회원가입에 실패했습니다. 다시 시도해주세요');
      }
    };
  
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading>Sign Up</Heading>

        <FormGroupInline>
          <LabelInline htmlFor="email">Email:</LabelInline>
          <InputInline
            id="email"
            type="email"
            {...register('email')}
            className={errors.email ? 'error-border' : ''} // 오류가 있으면 classname에 error-border 추가
          />
        </FormGroupInline>
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

        <FormGroupInline>
          <LabelInline htmlFor="password">Password:</LabelInline>
          <InputInline
            id="password"
            type="password"
            {...register('password')}
            className={errors.email ? 'error-border' : ''}
          />
        </FormGroupInline>
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

        <FormGroupInline>
          <LabelInline htmlFor="passwordCheck">Confirm Password:</LabelInline>
          <InputInline
            id="passwordCheck"
            type="password"
            {...register('passwordCheck')}
            className={errors.email ? 'error-border' : ''}
          />
        </FormGroupInline>
        {errors.passwordCheck && <ErrorText>{errors.passwordCheck.message}</ErrorText>}

        <SubmitButton type="submit">Sign Up</SubmitButton>
      </Form>
    );
  };
  
export default Signup;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Heading = styled.h2`
  color: var(--text-color);
`;

export const FormGroupInline = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 8px 0;
`;

export const LabelInline = styled.label`
  width: 80px;
  font-size: 1rem;
  color: var(--text-color);
  text-align: right;
  margin-bottom: 8px;
  margin-right: 8px;
`;

export const InputInline = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;

  &.error-border {
    border: 1px solid var(--logo-color) !important;
  }
`;

export const ErrorText = styled.p`
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: var(--logo-color);
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 16px;
  background-color: var(--logo-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    filter: brightness(0.6);
  }

  &:disabled,
  &.disabled-button {
    background-color: gray;
    cursor: not-allowed;
  }
`;
