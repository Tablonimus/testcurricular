import { Spinner } from "@material-tailwind/react";

export default function SpinnerLoader() {
  return (
    <div className="absolute flex items-center justify-center w-screen h-screen bg-black/50 z-50">
      <Spinner className="h-16 w-16 text-[--primary] " />
    </div>
  );
}
