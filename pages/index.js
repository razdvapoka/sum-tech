import mockData from '../mock'
import seminars from '../mock/seminars'
import Home from '../components/home'

const HomePage = (props) => {
  return <Home {...props} />
}

export const getServerSideProps = async ({ query }) => {
  const { seminar } = query
  const props =
    seminar && seminars[seminar]
      ? {
          seminar: seminars[seminar],
          ...mockData,
        }
      : mockData
  return {
    props,
  }
}

export default HomePage
