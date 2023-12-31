import React, { Fragment, useEffect, useState } from "react";
import Card from "../component/card";
import '../Style/Products.css'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import axios from 'axios'
function Products() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("idle");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);



const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:9000/products", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const jsonData = response.data;
      setData(jsonData);
    } else {
      console.log("Failed to fetch products");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  const handleLinkClick = (productID: any) => {
    localStorage.setItem("productID", productID);
    window.location.href = `/productinfo/${productID}`;
  };


  const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setSelectedOption(selectedCategory);
  
    try {
      if (selectedCategory === "idle") {
        await fetchData();
      } else {
        const response = await axios.get(`http://localhost:9000/filter/category/${selectedCategory}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response) {
          setData(response.data.filteredProducts);
        } else {
          throw new Error("Failed to retrieve filtered data from server");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const handleSearch = () => {
    const filteredResults = data.filter((product: any) =>
      product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <Fragment>
      <div className="context">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-content">
                <div className="most-popular">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="heading-section inline">
                        <h4 className="overlay__inner">
                          Explore products
                        </h4>
                        <div className="input-group">
    <input type="text" className="form-control" placeholder="Search this blog"  value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}/>
    <div className="input-group-append">
      <button className="btn btn-secondary" style={{backgroundColor:'#672bac'}} type="button"  onClick={handleSearch}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  </div>
                        <div className="selct">
                          <select
                            value={selectedOption}
                            onChange={handleSelectChange}
                          >
                            <option value="idle">ALL</option>
                            <option value="game">game</option>
                            <option value="home-decoration">home decoration</option>
                            <option value="groceries">groceries</option>
                            <option value="skincare">skincare</option>
                            <option value="fragrances">fragrances</option>
                            <option value="laptops">laptops</option>
                            <option value="smartphones">smartphones</option>
                           
                          </select>
                         
                          
                     {/*      <input
                            className="newSearch"
                            type="text"
                            id="searchText"
                            name="searchKeyword"
                            placeholder="Search"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                          />
                          <span className="margleft"><i className="fa fa-search"></i></span>
                          <button className="searchButton" onClick={handleSearch}>Search</button> */}
                          
                        </div>
                      </div>
                      <div className="row">
                        {(filteredData.length > 0 ? filteredData : data).map(
                          (product: any) => (
                            <div
                              className="col-lg-4 col-sm-6"
                              onClick={() => handleLinkClick(product._id)}
                              style={{ cursor: "pointer" }}
                              key={product._id}
                            >
                              <Card
                                name={product.name}
                                price={product.price}
                                imgsrc={product.image}
                                category={product.category}
                                rating={product.rating}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Products;
