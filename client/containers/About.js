import React from 'react'
import Navbar from '../components/Navbar'
import DynamicScrollToTop from '../components/DynamicScrollToTop'

function About() {

  const techInfo = [
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002348/samples/1200px-HTML5_logo_and_wordmark.svg_earyn1.png',
      alt: 'HTML5'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002377/samples/CSS3_logo_and_wordmark.svg_h33grc.png',
      alt: 'CSS3'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002405/samples/bulma-logo_abh1lm.png',
      alt: 'Bulma'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002428/samples/JavaScript-logo_tiowac.png',
      alt: 'JavaScript'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002460/samples/react-1-logo-png-transparent_l1td6v.png',
      alt: 'React'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002501/samples/elephant_1_dpmtcn.png',
      alt: 'PostgreSQL'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002526/samples/pytest1_owfuqs.png',
      alt: 'PyTest'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002560/samples/marshmallow-logo_hka29l.png',
      alt: 'Marshmallow'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002566/samples/flask-logo_z4xuum.png',
      alt: 'Flask'
    },
    {
      url: 'https://res.cloudinary.com/da3rlixzz/image/upload/v1616002571/samples/sqla_logo_r4iq4c.png',
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