// import {useGetTopMoviesQuery} from "../app/api/films/films.api";
// import {useAppSelector} from "../stores/hooks";
//
//
// export const useMovies = () => {
//     const filters = useAppSelector(state => state.filmFilters)
//     const {
//         data,
//         isLoading,
//         error,
//         fetchMore,
//         isFetchingMore
//     } = useGetTopMoviesQuery(
//         {
//             limit: 36,
//             year: filters.year?.from || filters.year?.to ? filters.year : undefined
//         },
//         {
//             selectFromResult: ({ data, isLoading, error, ...rest }) => ({
//                 data: data?.docs,
//                 total: data?.total,
//                 isLoading,
//                 error,
//                 ...rest
//             })
//         }
//     )
//
//     const loadMore = () => {
//         if (!isLoading && data && data.length < (data.total || 0)) {
//             fetchMore({
//                 variables: {
//                     page: Math.floor(data.length / 36) + 1
//                 },
//                 updateQuery: (prev, { fetchMoreResult }) => {
//                     if (!fetchMoreResult) return prev
//                     return {
//                         ...fetchMoreResult,
//                         docs: [...prev.docs, ...fetchMoreResult.docs]
//                     }
//                 }
//             })
//         }
//     }
//
//     return {
//         movies: data || [],
//         isLoading,
//         error,
//         loadMore,
//         hasMore: data ? data.length < (data.total || 0) : false
//     }
// }