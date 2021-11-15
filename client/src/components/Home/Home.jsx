import React from "react";

import Ticket from "../../images/Ticket.png";

const Home = () => {
  return (
    <>
      <h2>Home page</h2>
      <hr />
      <div className="tickets">
        <img src={Ticket} alt="movie ticket" />
      </div>
    </>
  );
};

export default Home;
