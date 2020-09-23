import mockData from '../mock'
import seminars from '../mock/seminars'
import Home from '../components/home'

const HomePage = (props) => {
  return <Home {...props} />
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getServerSideProps = async ({ query }) => {
  const { seminar } = query
  const props =
    seminar && seminars[seminar]
      ? {
          seminar: seminars[seminar],
          ...mockData,
        }
      : mockData
  // imitate seminar data loading delay
  await wait(seminar ? 1000 : 0)
  return {
    props,
  }
}

export default HomePage
