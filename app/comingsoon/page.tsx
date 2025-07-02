"use client";

import "../styles/404.css"; // ต้องสร้างเอง

export default function NotFoundPage() {
  return (
    <>

      {/* Dust Particles */}
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>

      {/* Lamp */}
      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>

      {/* Error Section */}
      <section className="error">
        <div className="error__content">
          <div className="error__message message">
            <div className="fof">
            <h1 className="message__title">Coming Soon.....</h1>
            </div>
            <p className="message__text">
              We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our homepage.
            </p>
            </div>
          </div>
      </section>
    </>
  );
}
