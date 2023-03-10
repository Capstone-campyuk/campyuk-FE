import React from "react";

import { Layout } from "../components/Layout";
import { Btn } from "../components/Button";
import { IoIosCompass } from "react-icons/io";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Layout>
      <div
        className="hero h-screen max-h-[90vh]"
        style={{
          backgroundImage: `url(https://i.im.ge/2023/02/05/aiqfT8.bg-landing.jpg)`,
        }}
      >
        <span className="hero-overlay bg-opacity-60" />
        <div className="hero-content flex flex-col items-start justify-start max-w-4xl h-96">
          <h1 className="text-xl font-extrabold antialiased">
            See the world with your own two eyes
          </h1>
          <h1
            id="landing-page"
            className="text-6xl font-extrabold antialiased"
          >
            Journeys, explorations, and adventures
          </h1>
          <h1 className="text-2xl font-extrabold antialiased">
            Let’s go...
          </h1>
          <Link to="/camplist">
            <Btn
              id="btn-camplist"
              label="Explore! "
              icon={<IoIosCompass className="text-xl" />}
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
