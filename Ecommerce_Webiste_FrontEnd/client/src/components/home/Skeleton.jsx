const Skeleton = ({ numberOfItems, colunms = "4", height }) => {
  return (
    <div className="container">
      <div className={`grid grid-cols-1  md:grid-cols-${colunms} py-4 gap-3`}>
        {[...Array(numberOfItems).keys()].map((element, index) => {
          return (
            <div
              key={index}
              className={`animate-pulse w-full h-[${height}] bg-gray-200 rounded-md`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Skeleton;
