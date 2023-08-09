import React from 'react';
//components
 import {SubscribeForm,ContactForm} from "../forms"


function Footer(props) {
    return (
      <div className="footer">
        <div className="footer_wrapper row">
          <div className="footer_col">
            <div className="footer_col_header mb-0">Find Us</div>
            <p className="footer_link mb-0">Street : </p>
            <p className="footer_link mb-0">Name : </p>
            <p className="footer_link mb-0">State : </p>
            <p className="footer_link mb-0">Pincode : </p>
            <p className="footer_link mb-0">Contact : </p>
          </div>
          <div className="footer_col">
            <div className="footer_col_header mb-0">
              Subscribe to our news letter
            </div>
            <SubscribeForm />
          </div>
          <div className="footer_col">
            <div className="footer_col_header mb-0 ms-5">Social</div>
            <a hfef="" className="footer_link mb-0 ms-5">
              Facebook
            </a>
            <a hfef="" className="footer_link mb-0 ms-5">
              Twitter
            </a>
            <a hfef="" className="footer_link mb-0 ms-5">
              Youtube
            </a>
            <a hfef="" className="footer_link mb-0 ms-5">
              Instagram
            </a>
          </div>
          <div className="footer_col">
            <div className="footer_col_header mb-0">Contact Us</div>
            <ContactForm />
          </div>
          <div className="footer_col">
            <div className="footer_col_header mb-0 ms-5">Policy</div>
            <a hfef="" className="footer_link mb-0 ms-5">
              Privacy
            </a>
            <a hfef="" className="footer_link mb-0 ms-5">
              Terms of use
            </a>
          </div>
        </div>
        <div className="footer_bottom_container">
          <p className="copy_right">© 2010-2022 BB.com</p>
        </div>
      </div>
    );
}

export default Footer;