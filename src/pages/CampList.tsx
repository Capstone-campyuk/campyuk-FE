import React from "react";

import { Layout } from "../components/Layout";
import { CardCampList } from "../components/Card";

function CampList() {
  return (
    <Layout>
      <h1 id="camplist-page" className="text-4xl p-5">Camp Site</h1>
      <div className="flex justify-center px-2 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <CardCampList
            image={"img-content.jpg"}
            campsite={"Tanakita Camp"}
            price={60}
            distance={5}
            loc={"Sukabumi"}
          />
          <CardCampList
            image={"img-content.jpg"}
            campsite={"Tanakita Camp"}
            price={60}
            distance={5}
            loc={"Sukabumi"}
          />
          <CardCampList
            image={"img-content.jpg"}
            campsite={"Tanakita Camp"}
            price={60}
            distance={5}
            loc={"Sukabumi"}
          />
          <CardCampList
            image={"img-content.jpg"}
            campsite={"Tanakita Camp"}
            price={60}
            distance={5}
            loc={"Sukabumi"}
          />
        </div>
      </div>
    </Layout>
  );
}

export default CampList;
