import Home from '../components/home'

const HomePage = (props) => {
  return <Home {...props} />
}

export const getServerSideProps = async ({ query }) => {
  const contentful = require('contentful')
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })
  const pages = await client.getEntries({
    content_type: 'page',
    'fields.title': 'main',
    include: 2,
  })
  const props = { page: pages.items[0] }
  return {
    props,
  }
}

export default HomePage
