import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// apis:
import type {
    SearchResult,
}                           from '@/app/api/search/route'



export const apiSlice = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl: `${process.env.WEBSITE_URL ?? ''}/api`
    }),
    endpoints : (builder) => ({
        getSearch : builder.mutation<SearchResult, { search: string, option: string }>({
            query : (data) => ({
                url    : 'search',
                method : 'POST',
                body   : data,
            }),
        }),
    }),
});



export const {
    useGetSearchMutation : useGetSearch,
} = apiSlice;
