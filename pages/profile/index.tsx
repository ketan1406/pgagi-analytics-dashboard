import Breadcrumb from "./../../components/Breadcrumbs";
import { Metadata } from "next";
import Layout from "./../../components/Layouts/Layout";
import ProfileBox from "./../../components/Profile/ProfileBox";

export const metadata: Metadata = {
  title: "Next.js Profile Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const Profile = () => {
  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <Breadcrumb pageName="Profile" />

        <ProfileBox />
      </div>
    </Layout>
  );
};

export default Profile;
