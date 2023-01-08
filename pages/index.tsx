import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from 'store/store'
import { fetchPosts } from '../hooks/usePosts'
import { selectAuthState, setAuthState } from '../store/authSlice'

const Home: NextPage = () => {
  const authState = useSelector(selectAuthState)
  const dispatch = useDispatch()
  return (
    <div>
      <div>{authState ? 'Logged in' : 'Not Logged In'}</div>
      <button
        onClick={() =>
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
        }
      >
        {authState ? 'Logout' : 'LogIn'}
      </button>
    </div>
  )
}

export default Home

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      // we can set the initial state from here
      // we are setting to false but you can run your custom logic here
      await store.dispatch(setAuthState(false))
      console.log('State on server', store.getState())
      return {
        props: {
          authState: false,
        },
      }
    }
)

const URL = 'https://example.com/v1/posts'
export const getPosts = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['posts', 10],
    queryFn: () => fetchPosts(URL, 10),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
