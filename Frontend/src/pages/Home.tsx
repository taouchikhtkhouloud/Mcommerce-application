import React from 'react'
import { Link } from 'react-router-dom'
import headerImage from '../assets/header.png'
import Services from '../component/Services'
import ContactUs from '../component/Contact'

function Home() {
  return (
    <>
    
    <header className="mainHeading">
   <div className="mainHeading__content">
      <article className="mainHeading__text">
      
         <h2 className="mainHeading__title"> Elevate Your Home with Our Exclusive Collection</h2>
         <p className="mainHeading__description">
         Explore our curated selection of furniture, decor, and more. Your journey to a beautiful, functional home begins here!

         </p>
         <Link to="/login">
         <button  className="cta">know more</button>
         </Link>
        
      </article>

      <figure className="mainHeading__image">
         <img
            src={headerImage}
            alt=""
         />
      </figure>
   </div>
</header>
<Services></Services>
<ContactUs></ContactUs>


    </>
  )
}

export default Home