import { useQuery } from '@tanstack/react-query'

const fetchPosts = async (endpoint: string, limit = 10) => {
  const parsed = (await fetch(endpoint)).json()
  return parsed.filter((x) => x.id <= limit)
}

const usePosts = (limit) => {
  return useQuery({
    queryKey: ['posts', limit],
    queryFn: () => fetchPosts(limit),
  })
}

export { usePosts, fetchPosts }