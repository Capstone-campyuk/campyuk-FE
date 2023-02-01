import { Layout } from "../components/Layout";
import { GiPositionMarker } from "react-icons/gi";

function DetailCampHost() {
  return (
    <Layout>
      <div className="flex px-10 pt-10">
        <div className="flex-row w-3/5">
          <div className="">
            <img
              src="https://th.bing.com/th/id/R.8c8475554407564886b9b1aada6f724a?rik=i8tRDbGzOI5yog&riu=http%3a%2f%2f1.bp.blogspot.com%2f-EdP9dGHEs30%2fU8TdaCUlG-I%2fAAAAAAAAAs8%2f60LYOVa-U-k%2fs1600%2fGambar%2bPemandangan%2bAlam%2bTerindah%2bDi%2bDunia%2b2014.jpg&ehk=MKdf9m1kHL4Zyz9YDFNz7eJIrazSsyKjpYNMjqHMT6I%3d&risl=&pid=ImgRaw&r=0"
              alt=""
              className="w-full h-96 rounded-lg"
            />
          </div>
        </div>
        <div className="flex-row w-2/5 px-10">
          <div className="flex">
            <div className="flex-col">
              <div className="">
                <img
                  src="https://dagodreampark.co.id/images/ke_2.jpg"
                  alt=""
                  className="w-[650px] h-[200px] rounded-lg"
                />
              </div>
              <div className="flex gap-12 pt-5">
                <div className="flex-row">
                  <div className="">
                    <img
                      src="https://dagodreampark.co.id/images/ke_2.jpg"
                      alt=""
                      className="w-[290px] h-[130px] rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex-row">
                  <div className="">
                    <img
                      src="https://dagodreampark.co.id/images/ke_2.jpg"
                      alt=""
                      className="w-[290px] h-[130px] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex pt-10">
        <div className="flex-row w-1/4 px-10">
          <h1 className="font-bold text-4xl pb-3">Tanakita Camp</h1>
          <div className="flex flex-rows pb-3">
            <GiPositionMarker className="w-8 h-8" />
            <span className="font-semibold text-xl">Alamat</span>
          </div>
          <p className="font-semibold text-xl pb-3">
            5 km away from the city centre
          </p>
          <p className="font-semibold text-xl pb-3">$ 60/night</p>
        </div>
        <div className="flex-row w-3/4 px-20">
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            molestie tempus purus, at tristique justo vehicula id. Sed non
            mollis risus. Curabitur nisl risus, pretium vitae suscipit at,
            mattis quis lacus. Phasellus in orci aliquet, ultrices turpis
            feugiat, sagittis lacus. Vivamus mauris est, tincidunt in ipsum eu,
            sagittis placerat justo. Donec vitae dui mollis, mattis mi eget,
            semper quam. In tempus finibus vulputate. In sed est magna. Proin
            sed lectus vel orci cursus dignissim.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 px-10 pt-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-4xl pb-3">Tent</h1>
          <p className="font-semibold text-xl pb-3">Small (1-2 person) </p>
          <p className="font-semibold text-xl pb-3">Medium (3-4 person) </p>
          <p className="font-semibold text-xl pb-3">Large (4-5 person) </p>
        </div>
        <div>
          <h1 className="font-bold text-4xl pb-3">Stock</h1>
          <p className="font-semibold text-xl pb-3 px-8">4</p>
          <p className="font-semibold text-xl pb-3 px-8">4</p>
          <p className="font-semibold text-xl pb-3 px-8">4</p>
        </div>

        <div>
          <h1 className="font-bold text-4xl pb-3">Price</h1>
          <p className="font-semibold text-xl pb-3 px-8">$8</p>
          <p className="font-semibold text-xl pb-3 px-8">$10</p>
          <p className="font-semibold text-xl pb-3 px-8">$12</p>
        </div>
        <div className="mr-8">
          <img
            src="https://dagodreampark.co.id/images/ke_2.jpg"
            alt=""
            className="w-[650px] h-[200px] rounded-lg"
          />
        </div>
      </div>
      <div className="flex px-10 pt-10 pb-10">
        <div className="flex-row w-1/2">
          <img
            src="https://statik.tempo.co/data/2019/01/23/id_813830/813830_720.jpg"
            alt=""
            className="rounded-t-2xl lg:rounded-l-3xl lg:w-full h-48"
          />
        </div>
        <div className="flex-row w-1/2 px-10">
          <p className="text-lg">
            Jl. Spartan No.IV, Gotham city, West Java, 53241 +62 985904
          </p>
          <h1 className="font-bold text-3xl pt-20 text-end">Accept</h1>
        </div>
      </div>
    </Layout>
  );
}

export default DetailCampHost;
