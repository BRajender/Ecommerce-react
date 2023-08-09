import React from "react";
import {useNavigate} from "react-router-dom"

function EptyCart(props) {
 const navigate=useNavigate()
 const navigateToProducts=()=>{
    navigate("/")
 }
  return (
    <div id="mountRoot">
      <div id="appContent">
        <div className="page">
          <div>
            <div className="desktop-base-emptyCart">
              <div className="emptyCart-base-mainContainer">
                <div className="emptyCart-base-subContainer undefined">
                  <div className="imageBanner-base-container emptyCart-base-emptyBagImage">
                    <picture className="image-base-imgResponsive">
                      <source
                        srcset="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp"
                        type="image/webp"
                      />
                      <img
                        src="https://constant.myntassets.com/checkout/assets/img/empty-bag.png"
                        class="image-base-imgResponsive"
                        alt="image"
                      />
                    </picture>
                  </div>
                  <div className="emptyCart-base-emptyText">
                    Hey, it feels so light!
                  </div>
                  <div className="emptyCart-base-emptyDesc">
                    There is nothing in your bag. Let's add some items.
                  </div>
                  <div className="emptyCart-base-addFromWishlist">
                    <div
                      data-testid="button"
                      className="button-base-button emptyCart-base-wishlistButton "
                      onClick={() => navigateToProducts()}
                    >
                      ADD ITEMS FROM PRODUCTS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EptyCart;
