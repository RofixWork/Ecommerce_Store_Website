import { useSelector } from "react-redux";

const UserInfo = () => {
  const { userToken, user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="account_user-info ">
        <h2>Name:</h2>
        <h3>{userToken && user?.unique_name}</h3>
      </div>
      <div className="border-b border-gray-300 w-[300px]"></div>
      <div className="account_user-info">
        <h2>email:</h2>
        <h3>{userToken && user?.email}</h3>
      </div>
    </div>
  );
};

export default UserInfo;
