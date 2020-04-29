import React from "react";
import { useRouter } from "next/router";
import { MainLayout, ProfileContainer } from "layouts";

const Post = () => {
  const router = useRouter();
  const { userName } = router.query;
  console.log("User userName from pages/user: ", userName);
  return (
    <MainLayout>
      <ProfileContainer userName={userName} />
    </MainLayout>
  );
};

export default Post;
