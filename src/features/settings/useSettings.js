// i want to fetch settings data from my backend superbase so i'll use React Query so this is a custom hook for this because this is the best practice 

import { useQuery } from "@tanstack/react-query";
import {getSettings} from '../../services/apiSettings'
export function useSettings() {

    const { data: settings, error, isLoading } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings,
        //this needs to be a function that returns a promis or another words asynchronous function
      });

      return { settings, error, isLoading };
}