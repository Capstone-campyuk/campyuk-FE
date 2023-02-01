import { GiPositionMarker } from "react-icons/gi";
import { Btn } from "../components/Button";
import { Layout } from "../components/Layout";

function DetailCamp() {
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
      <div className="flex px-10 pt-10">
        <div className="flex-row w-3/5">
          <h1 className="font-bold text-4xl">Nama tempat camp</h1>
          <div className="flex flex-rows">
            <GiPositionMarker className="w-8 h-8" />
            <span className="font-semibold text-xl">Alamat</span>
          </div>
          <p className="justify-items-start">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            molestie tempus purus, at tristique justo vehicula id. Sed non
            mollis risus. Curabitur nisl risus, pretium vitae suscipit at,
            mattis quis lacus. Phasellus in orci aliquet, ultrices turpis
            feugiat, sagittis lacus. Vivamus mauris est, tincidunt in ipsum eu,
            sagittis placerat justo.
          </p>
          <div>
            <img
              src="https://statik.tempo.co/data/2019/01/23/id_813830/813830_720.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="flex-row w-2/5 px-10">
          <div className="box-border h-auto w-full p-4 border-4 bg-white rounded-lg">
            <h1 className="font-bold text-2xl">$ 50 /night</h1>
            <div className="pt-10 rounded-xl ">
              <table className="border-collapse border border-slate-500 w-full">
                <tbody className="">
                  <tr className="">
                    <td className="border border-slate-700 font-bold text-xl">
                      Check-in
                    </td>
                    <td className="border border-slate-700 font-bold text-xl">
                      Check-out
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-700 font-bold text-xl">
                      Guest
                    </td>
                    <td className="border border-slate-700 font-bold text-xl">
                      Tent
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pt-10">
              <Btn label="Reserve" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetailCamp;
