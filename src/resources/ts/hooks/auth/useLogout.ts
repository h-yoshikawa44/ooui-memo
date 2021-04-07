import { useQueryClient, UseMutationResult, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

const logout = async (): Promise<void> => {
  const { data } = await axios.post('/api/logout');
  return data;
};

const useLogout = (): UseMutationResult<void, AxiosError, void, undefined> => {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.resetQueries('user');
    },
  });
};

export default useLogout;
