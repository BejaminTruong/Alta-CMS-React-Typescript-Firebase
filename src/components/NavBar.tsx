import {
  BellOutlined,
  FacebookOutlined,
  MailOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Image, Input, Modal } from "antd";
import {
  FacebookAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";

type Props = {};

type UserProfile = {
  accessToken: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

const NavBar: FC<Props> = () => {
  const [signedIn, setSignedIn] = useState<UserProfile>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.getIdToken().then((res) => {
          setSignedIn({
            accessToken: res,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        });
      } else console.log("user is signed out");
    });
  }, []);

  useEffect(() => {
    console.log(signedIn);
  }, [signedIn]);

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      let result = await signInWithPopup(auth, provider);
      let user = result.user;
      user.getIdToken().then((res) => {
        console.log(res);
        setSignedIn({
          accessToken: res,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      });
    } catch (error: any) {
      console.log(error);
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
      const email = error.customData.email;
      console.log(email);
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(credential);
    }
  };
  return (
    <div className="flex">
      <div className="w-1/6 -mr-10 cursor-pointer">
        <Image
          onClick={() => navigate("/")}
          preview={false}
          width={130}
          src={require("../assets/logoInsight.png")}
        />
      </div>
      <div className="flex flex-1 justify-between">
        <Input
          placeholder="Search"
          suffix={<SearchOutlined style={{ fontSize: "24px" }} />}
          bordered={false}
          className="bg-normalGray max-w-md rounded-lg p-4"
        />
        <div className="flex w-[200px] justify-end items-center gap-4 text-xl text-extraDarkBrown">
          <MailOutlined />
          <BellOutlined />
          <Image
            onClick={() => setIsModalVisible(true)}
            preview={false}
            width={48}
            height={48}
            src={
              signedIn?.email
                ? signedIn.photoURL + `?access_token=${signedIn.accessToken}`
                : require("../assets/avatarNav.png")
            }
            className="rounded-full inline-block cursor-pointer"
          />
          <Modal
            centered
            closable={false}
            footer={null}
            title="Hồ sơ người dùng"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            width={500}
          >
            {!signedIn?.email ? (
              <button
                onClick={signInWithFacebook}
                className="btnTicket mx-auto text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <FacebookOutlined className="text-2xl -translate-y-[2px]" />
                Đăng nhập bằng Facebook
              </button>
            ) : (
              <>
                <div className="text-xl text-extraDarkBrown">
                  <p>
                    <span className="font-bold">Tên</span>:{" "}
                    {signedIn?.displayName}
                  </p>
                  <p>
                    <span className="font-bold">Email</span>: {signedIn?.email}
                  </p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await signOut(auth);
                      setSignedIn(undefined);
                      setIsModalVisible(false);
                      console.log("User signed out!");
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="btnTicket border-normalRed text-normalRed hover:bg-normalRed hover:text-white mx-auto mt-5"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
