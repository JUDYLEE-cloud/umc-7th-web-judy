import { useForm, FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import '../variable.css';

interface UseCustomFormReturn<T extends FieldValues> {
    register: UseFormRegister<T>;
    handleSubmit: UseFormHandleSubmit<T>;
    errors: Record<string, any>;
    isValid: boolean;
}

const useCustomForm = <T extends FieldValues>(schema: yup.ObjectSchema<T>): UseCustomFormReturn<T> => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<T>({
        resolver: yupResolver(schema) as unknown as (data:T) => Promise<{values: T; errors: any}>,
        mode: "onChange",
    });
    return {register, handleSubmit, errors, isValid};
};

export default useCustomForm;