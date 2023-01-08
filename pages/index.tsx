import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { wrapper } from 'store/store'
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
