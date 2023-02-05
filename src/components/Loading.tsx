export function LoadingReg() {
  return (
    <div className="animate-pulse flex flex-col bg-bgcard rounded-3xl shadow-lg max-w-2xl w-[100vw]">
      <span className=" bg-form h-[345px] rounded-t-3xl" />
      <div className="flex justify-between gap-5 p-4">
        <div className="flex flex-col gap-2">
          <span className="bg-form w-32 h-5 rounded-lg" />
          <span className="bg-form w-24 h-5 rounded-lg" />
          <span className="bg-form w-36 h-5 mt-4 rounded-lg" />
        </div>
        <div className="flex flex-col items-end gap-6 rounded-lg">
          <span className="bg-form w-24 h-7 rounded-lg" />
          <span className="bg-form w-16 h-10 mt-1 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export function LoadingLong() {
  return (
    <div className="animate-pulse flex flex-col lg:flex-row bg-bgcard rounded-3xl shadow-lg w-[70vw]">
      <span className="bg-form lg:w-2/3 h-[470px] rounded-t-2xl lg:rounded-l-3xl" />
      <div className="flex flex-col p-4 justify-evenly lg:w-1/3 gap-3">
        <span className="bg-form w-44 h-10 rounded-lg" />
        <span className="bg-form w-28 h-10 rounded-lg" />
        <span className="bg-form w-36 h-10 rounded-lg" />
        <div className="flex justify-between">
          <span className="bg-form w-20 h-10 rounded-lg" />
          <span className="bg-form w-20 h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
