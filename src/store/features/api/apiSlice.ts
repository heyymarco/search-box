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
            query : ({search, option}) => ({
                url    : `search?search=${encodeURIComponent(search)}&option=${encodeURIComponent(option)}`,
                method : 'POST',
            }),
        }),
    }),
});



export const {
    useGetSearchMutation : useGetSearch,
} = apiSlice;
