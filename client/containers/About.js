import React from 'react'
import Navbar from '../components/Navbar'
import DynamicScrollToTop from '../components/DynamicScrollToTop'

function About() {

  const techInfo = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
      alt: 'HTML5'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
      alt: 'CSS3'
    },
    {
      url: 'https://bulma.io/images/bulma-logo.png',
      alt: 'Bulma'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
      alt: 'JavaScript'
    },
    {
      url: 'https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png',
      alt: 'React'
    },
    {
      url: 'https://www.postgresql.org/media/img/about/press/elephant.png',
      alt: 'PostgreSQL'
    },
    {
      url: 'https://docs.pytest.org/en/stable/_static/pytest1.png',
      alt: 'PyTest'
    },
    {
      url: 'https://marshmallow.readthedocs.io/en/stable/_static/marshmallow-logo.png',
      alt: 'Marshmallow'
    },
    {
      url: 'https://flask.palletsprojects.com/en/1.1.x/_images/flask-logo.png',
      alt: 'Flask'
    },
    {
      url: 'https://www.sqlalchemy.org/img/sqla_logo.png',
      alt: 'SQLAlchemy'
    }
  ]

  const tech = techInfo.map(t => {
    return <div className={'tech-card'} key={t.alt}>
      <img src={t.url} />
    </div>
  })

  return <>
    <Navbar />
    <DynamicScrollToTop />
    <div className="container">
      <div className="hero is-fullheight-with-navbar">
        <div className="box about-page about-page-box-1">
          <h2 className="about-h2">About Garms</h2>
          <p className="about-p">Garms is an application for users to buy and sell clothes, accessories and shoes.</p>
        </div>
        <div className="box about-page">
          <h2 className="about-h2">Founders</h2>
          <p className="about-p">Garms was founded by <a href="https://github.com/hannahakhtar" className="about-aref">Hannah Akhtar</a>, <a href="https://github.com/ikalff" className="about-aref">India Kalff</a> & <a href="https://github.com/Jacobaston" className="about-aref">Jake Aston</a> for project 4 of <a href="https://generalassemb.ly/" className="about-aref">General Assembly’s</a> Software Engeering Immersive.</p>
        </div>
        <div className="box about-page about-page-box-3">
          <h2 className="about-h2">Technologies</h2>
          <div className={'tech-list-container'}>
            {tech}
          </div>
        </div>
      </div>
    </div>
  </>
}

export default About