import TradePoint from "../images/TradePoint1.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-10">
      <div className="max-w-screen-xl py-10 px-6 sm:flex justify-between mx-auto gap-8">
        {/* Brand Section */}
        <div className="px-5 sm:w-7/12 border-b sm:border-b-0 sm:border-r border-blue-400 text-center sm:text-left">
          <h3 className="font-extrabold text-3xl text-white tracking-wide -mt-4">
            <img src={TradePoint} alt="websiteIcon" className="w-32 h-24" />
          </h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            TradePoint is your all-in-one destination for modern shopping,
            offering everything from the latest electronics and stylish fashion
            apparel to home essentials, books, and lifestyle products.
            <br />
            Whether you're a tech enthusiast, a fashionista, or a DIY
            enthusiast, TradePoint has got you covered.
          </p>
        </div>

        {/* Contact Section */}
        <div className="p-5 sm:w-5/12 text-center sm:text-left">
          <h4 className="text-sm uppercase text-blue-200 font-semibold mb-4 tracking-wide">
            Contact Us
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a className="hover:text-yellow-300 transition-colors" href="#">
                📍 123 TradePoint Ave, New York, NY
              </a>
            </li>
            <li>
              <a
                className="hover:text-yellow-300 transition-colors"
                href="mailto:info@tradepoint.com"
              >
                ✉️ info@tradepoint.com
              </a>
            </li>
            <li>
              <a
                className="hover:text-yellow-300 transition-colors"
                href="tel:+1234567890"
              >
                ☎️ +1 (234) 567-890
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-blue-400 py-4 max-w-screen-xl mx-auto px-6 text-sm">
        <div className="text-blue-200">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">TradePoint</span>. All Rights
          Reserved.
        </div>
        <div className="flex gap-4 mt-3 sm:mt-0">
          <a href="#" className="hover:text-yellow-300 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-yellow-300 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
