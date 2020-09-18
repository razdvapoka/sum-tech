import Link from 'next/link'
import React from 'react'
import cn from 'classnames'

import { Page } from '../page'
import Keywords from '../keywords'
import Typograf from '../typograph'
import styles from './styles.module.scss'

const Home = ({
  headerText,
  seminarCount,
  description,
  keywords,
  objective,
  lemPhoto,
  lemBio,
}) => {
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
      <div className="grid mt-36">
        <div className="col-8" />
        <div className="col-14">
          <Typograf className="text-l2">{objective}</Typograf>
        </div>
      </div>
      <div className="grid mt-18">
        <div className="col-4" />
        <div className="col-8">
          <Typograf className="text-s3">Stanislaw Lem — Biography</Typograf>
        </div>
      </div>
      <div className="grid mt-4">
        <div className="col-5" />
        <div className="col-5">
          <img width="100%" src={lemPhoto} />
        </div>
      </div>
      <div className="grid mt-4">
        <div className="col-5" />
        <div className="col-15">
          <Typograf className={cn('text-l2', styles.lemBio)}>{lemBio}</Typograf>
        </div>
      </div>
      <Link href="/?seminar=1" scroll={false}>
        <a>with sem</a>
      </Link>
    </Page>
  )
}

export default Home
