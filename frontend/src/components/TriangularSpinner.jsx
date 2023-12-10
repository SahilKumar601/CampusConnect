import { Triangle } from "react-loader-spinner";

const TriangularSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <Triangle
        color="#00BFFF"
        height={100}
        width={500}
        className="m-5"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
export default TriangularSpinner;
