import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('이메일 형식으로 입력해주세요')
        .required('이메일은 필수 입력 항목입니다'),
    password: yup
        .string()
        .min(8, '비밀번호는 최소 8자 입니다')
        .max(16, '비밀번호는 최대 16자 입니다')
        .required(),
    passwordCheck: yup
        .string()
        .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
        .required(),
});

export const loginValidationSchema = yup.object().shape({
    email: yup  
        .string()
        .email('이메일 형식으로 입력해주세요')
        .required(),
    password: yup   
        .string()
        .min(8, '비밀번호는 최소 8자 입니다')
        .max(16, '비밀번호는 최대 16자 입니다')
        .required(),
})