import { Fragment } from 'react'
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  )
}

export default MainLayout