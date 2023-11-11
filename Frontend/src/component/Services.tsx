import React from 'react';
import '../Style/Service.css'
const Services = () => {
  return (
    <section className='section-service'>
      <h3 className='service-title'>Our Services</h3>
      <p className="section-lead">Mcommerce platform provides rich e-commerce features</p>
      <div className="services-grid">
        <div className="service service1">
          <i className="ti-bar-chart"></i>
          <h4>Catalog Management</h4>
          <p>Product management with attribute and variation. Multiple category and collection management.</p>
          <a href="#" className="cta">Read More <span className="ti-angle-right"></span></a>
        </div>

        <div className="service service2">
          <i className="ti-light-bulb"></i>
          <h4>Layered Navigationg</h4>
          <p>Layered / faceted navigation for filtering of products in categories and search results. Filter products by price and attributes.</p>
          <a href="#" className="cta">Read More <span className="ti-angle-right"></span></a>
        </div>

        <div className="service service3">
          <i className="ti-money"></i>
          <h4>Checkout</h4>
          <p>One-page Checkout process with online payment and shipping. Saved shopping cart. Integration with multiple payment gateways.</p>
          <a href="#" className="cta">Read more <span className="ti-angle-right"></span></a>
        </div>
      </div>
    </section>
  );
};

export default Services;
