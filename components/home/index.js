import Link from 'next/link'
import React from 'react'

import { Page } from '../page'
import Keywords from '../keywords'
import Typograf from '../typograph'

const Home = ({ headerText, seminarCount, description, keywords }) => {
  return (
    <Page headerText={headerText} seminarCount={seminarCount}>
      <div className="grid mt-36">
        <div className="col-8" />
        <div className="col-14">
          <Typograf className="text-l2">{description}</Typograf>
        </div>
      </div>
      <div className="grid mt-36">
        <div className="col-4" />
        <div className="col-20">
          <Keywords keywords={keywords} />
        </div>
      </div>
      <Link href="/?seminar=1" scroll={false}>
        <a>with sem</a>
      </Link>
    </Page>
  )
}

export default Home
