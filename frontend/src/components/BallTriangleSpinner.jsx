import { BallTriangle } from "react-loader-spinner";

export const BallTriangleSpinner = ({message}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#00BFFF"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  );
};
