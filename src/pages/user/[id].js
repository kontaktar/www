import React from "react";
import { useRouter } from "next/router";
import { MainLayout, ProfileContainer } from "layouts";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("User Id from pages/user: ", id);
  return (
    <MainLayout>
      <ProfileContainer />
    </MainLayout>
  );
};

export default Post;
