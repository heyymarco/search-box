import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// apis:
import type {
    GenerateRequest,
    GenerateResult,
    
    VerifyRequest,
    CreatedResult,
}                           from '@/app/api/search/route'



export const apiSlice = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl: `${process.env.WEBSITE_URL ?? ''}/api`
    }),
    endpoints : (builder) => ({
        generateSearch : builder.mutation<GenerateResult, GenerateRequest>({
            query : (data) => ({
                url    : 'search',
                method : 'POST',
                body   : data,
            }),
        }),
        verifySearch : builder.mutation<CreatedResult, VerifyRequest>({
            query : (data) => ({
                url    : 'search',
                method : 'PATCH',
                body   : data,
            }),
        }),
    }),
});



export const {
    useGenerateSearchMutation : useGenerateSearch,
    useVerifySearchMutation   : useVerifySearch,
} = apiSlice;
