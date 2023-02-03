import React from "react";

import { Layout } from "../../components/Layout";
import { CardSAdmin } from "../../components/Card";

function DashboardAdmin() {
  return (
    <Layout>
      <h1 className="text-4xl p-5">Camp Site</h1>
      <div className="flex flex-col items-center gap-10 px-2 lg:px-6 pb-6">
        <CardSAdmin
          image={`img-content.jpg`}
          campsite={`Tanakita Camp`}
          loc={`Sukabumi`}
          price={40}
          address={`Jl. Tdiosfh, Hweiu City, West Java, 23623`}
          id_camp={948239049}
        />
        <CardSAdmin
          image={`img-content.jpg`}
          campsite={`Tanakita Camp`}
          loc={`Sukabumi`}
          price={40}
          address={`Jl. Tdiosfh, Hweiu City, West Java, 23623`}
          id_camp={948239049}
        />
        <CardSAdmin
          image={`img-content.jpg`}
          campsite={`Tanakita Camp`}
          loc={`Sukabumi`}
          price={40}
          address={`Jl. Tdiosfh, Hweiu City, West Java, 23623`}
          id_camp={948239049}
        />
      </div>
    </Layout>
  );
}

export default DashboardAdmin;
