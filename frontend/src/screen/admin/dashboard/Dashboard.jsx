import React from 'react'
import Header from '../../../components/header/Header'
import Footer from '../../../components/footer/Footer'
import LeftMenu from '../../../components/leftMenu/LeftMenu'

const Dashboard = () => {
  return (
    <div>
       <header className="bg-primary text-white text-center py-3">
          <Header />
        </header>

        <div className="wrapper">
            <LeftMenu />
            
          <main className="content">
            <h2>Content Area</h2>
            <p>This is the main content area.</p>
          </main>
        </div>

        <footer className="bg-light">
          <Footer /> 
        </footer>
    </div>
  )
}

export default Dashboard
