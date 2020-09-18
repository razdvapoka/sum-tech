import mockData from '../mock'
import Home from '../components/home'

const HomePage = (props) => {
  return <Home {...props} />
}

export const getServerSideProps = async ({ query }) => {
  return {
    props: mockData,
  }
}

export default HomePage
