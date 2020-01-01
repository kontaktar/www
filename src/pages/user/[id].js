import React from "react";
import { useRouter } from "next/router";
import { MainLayout, ProfileContainer } from "layouts";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MainLayout>
      {/* <div style={{ marginLeft: "90px" }}> */}
      <ProfileContainer />
      {/* </div> */}
      <h1>{id}</h1>
    </MainLayout>
  );
};

export default Post;
