import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
   const {authUser} = useAuthStore()
  return (
    <div>
      profile
    </div>
  )
}

export default ProfilePage;
