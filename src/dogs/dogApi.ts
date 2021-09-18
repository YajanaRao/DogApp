import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const dogApi = createApi({
  reducerPath: 'dogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1/artworks/' }),
  endpoints: (builder) => ({
    getBreeds: builder.query({
      query: (page = 1) => `search?q=dogs&page=${page}&limit=10`,
    }),
    getBreedByName: builder.query({
      query: (name: string) => `breed/${name}/images/random`
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetBreedsQuery, useGetBreedByNameQuery } = dogApi