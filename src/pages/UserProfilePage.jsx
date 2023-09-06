import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/Users/components/UserProfile";

const UserProfilePage = () => {
  return (
    <>
      <Navbar>
        <UserProfile />
      </Navbar>
    </>
  );
};

export default UserProfilePage;