import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useTask = () => {
    const {data: task = [], refetch, isLoading} = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get('https://task-management-server-alpha-drab.vercel.app/tasks');
            return res.data;
        }
    })
    return [task, refetch, isLoading];
};

export default useTask;