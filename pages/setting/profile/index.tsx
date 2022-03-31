import type {NextPage} from "next";
import {useRouter} from "next/router";
import React, {useCallback, useEffect, useState} from "react";
import {Seo} from "components/atoms/seo";
import {Profile} from "components/organisms/profile";
import {LayoutNavigation} from "components/templates/layout-navigation";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const onLeftButtonClick = useCallback(() => {
    router.push("/setting");
  }, [router]);

  useEffect(() => {
    const userName = router.query.name;
    if (userName == null) return;
    if (typeof userName === "string") {
      setName(userName);
    } else {
      setName(userName.join(""));
    }
  }, [router.query.name]);

  return (
    <LayoutNavigation>
      <Seo title={"프로필 설정"}></Seo>
      <Profile name={name} />
    </LayoutNavigation>
  );
};

export default ProfilePage;
