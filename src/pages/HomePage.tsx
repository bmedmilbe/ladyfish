import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <header className="header">
        <div className="row align-items-center">
          <div className="col-lg-6 col-sm-12 mb-4">
            <img className="header-image" src="/pavlo-fish.jpg" />
          </div>
          <div className="col-lg-6 col-sm-12">
            <div className="header-text-box">
              <h1 className="header-title">
                Order Quickly via <span className="title-focus">WhatsApp</span>
              </h1>
              <p className="header-paragraph">
                Fresh, Quality Fish Delivered Right to Your Door
              </p>
              <NavLink
                to={
                  "https://wa.me/447423507780?text=I%20would%20like%20to%20start%20ordering%20fresh%20fish."
                }
                target="_blank"
                rel="noopener noreferrer"
                className="header-phone"
              >
                &rarr; 0742 350 77 80
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomePage;
