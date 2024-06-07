import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPinterest,
  faFacebookF,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import '../Footer/Style.css';

const Footer = () => {
  return (
    <div className="relative overflow-hidden bg-gray-200 py-10">
      <div className="absolute inset-0">
        <div
          className="wave lg:mt-0 md:mt-0 mt-[580px] bg-cover"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg"><path fill="%23a7f3d0" fill-opacity="1" d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,149.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>')`,
          }}
        ></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-bold text-lg mb-4">Shop Matcha</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Just the Matcha
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  The Trial Kit
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Wholesale & Bulk
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Teaware
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Learn</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Matcha Recipes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Caffeine Content
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Health Benefits
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">More from Tenzo</h2>
            <ul>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Affiliate
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Let's Stay Connected</h2>
            <p className="text-gray-600 mb-4">
              Enter your email to unlock 10% OFF.
            </p>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600">
                Submit
              </button>
            </div>
            <h2 className="font-bold text-lg mb-4">Follow us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faPinterest} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-6 flex flex-col md:flex-row justify-between text-gray-600">
          <p>© 2021 tenzotea.co</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              Refund Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              Accessibility Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
