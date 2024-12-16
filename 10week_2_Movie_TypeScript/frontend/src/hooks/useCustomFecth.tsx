import { useEffect, useState } from "react";
import { axiosInstance } from "../apis/axios-instance";

interface UseCustomFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
}

const useCustomFetch = <T,>(url: string): UseCustomFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null); // 데이터 상태 (T는 제네릭 타입)
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const [isError, setIsError] = useState<boolean>(false); // 에러 상태

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<T>(url); // API 호출 (T 타입 데이터 반환)
        setData(response.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, isError }; // 상태 반환
};

export default useCustomFetch;