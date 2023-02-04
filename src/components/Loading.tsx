export function LoadingReg() {
  return (
    <div className="animate-pulse flex flex-col bg-bgcard border-2 rounded-3xl shadow-lg max-w-2xl">
      <span className=" bg-form h-[345px] w-[670px] rounded-t-3xl" />
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
