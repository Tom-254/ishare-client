import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import IShareLogo from "../components/IShareLogo";
import { ReactComponent as ExploreIcon } from "../assets/explore-icon.svg";
import { ReactComponent as FeedIcon } from "../assets/feed-icon.svg";
import { ReactComponent as FriendsIcon } from "../assets/friends-icon.svg";
import { ReactComponent as FriendsDashboard } from "../assets/friends_dashboard.svg";

import { ReactComponent as LogoutIcon } from "../assets/logout-icon.svg";
import { ReactComponent as SharedDashboard } from "../assets/shared_dashboard.svg";
import { ReactComponent as UploadDashboard } from "../assets/upload_dashboard.svg";
import { ReactComponent as UploadIcon } from "../assets/upload-icon.svg";
import { ReactComponent as SearchIcon } from "../assets/search_icon.svg";
import { ReactComponent as UploadSVG } from "../assets/Upload_image.svg";
import { ReactComponent as NoImages } from "../assets/no-images.svg";
import ProfileImage from "../assets/profile-image.jpg";
import IShareButton from "../components/IShareButton";
import DashStats from "../components/DashStats";
import ImageShow from "../components/ImageShow";
import ManImage from "../assets/man-image.png";
import NatureImage from "../assets/nature-image.png";
import IShareModal from "../components/IShareModal";
import IShareInput from "../components/IShareInput";

import { AuthContext } from "../context/authContext";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [inputValues, setInputValues] = useState({
    image_name: "",
    image_path: "",
    image_description: "",
    image_file: "",
    image_type: "",
    image_raw: "",
  });
  const [hasNext, setHasNext] = useState(false);

  const [error, setError] = useState({
    image_name: "",
    image_description: "",
  });

  const hiddenFileInput = useRef(null);
  const hiddenProfileInput = useRef(null);

  const {
    currentUser,
    userImages,
    isLoading,
    logout,
    setProfile,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const updateProfileLinkClicked = (event) => {
    hiddenProfileInput.current.click();
  };
  const handleChange = (event) => {
    if (event.target.files.length) {
      const fileUploaded = URL.createObjectURL(event.target.files[0]);
      setInputValues((prev) => ({
        ...prev,
        image_file: fileUploaded,
        image_type: event.target.files[0].type,
        image_raw: event.target.files[0],
      }));
      setHasNext("image");
    }
  };

  const handleProfileChange = async (event) => {
    if (event.target.files.length) {
      setProfile(() => ({
        image_type: event.target.files[0].type,
        image_raw: event.target.files[0],
      }));
    }
  };

  const onChange = (e) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const userLogout = async (e) => {
    logout();
    navigate("/login");
  };

  useEffect(() => {

  }, [currentUser, isLoading]);

  if (isLoading !== false && isLoading !== null) {
    return <>"loading"</>;
  }

  return (
    <>
      {currentUser === null ? (
        <Navigate to="/login" replace />
      ) : (
        <div className="dashboard">
          <aside className="flex-column dashboard-left">
            <div>
              <IShareLogo toLink={"/dashboard"} />
            </div>
            <div className="flex-column dashboard-left__profile">
              <div
                className="flex-center__column dashboard-left__profile-image"
                onClick={updateProfileLinkClicked}
              >
                {currentUser?.profile_image ? (
                  <img src={currentUser?.profile_image} alt="Profile" />
                ) : (
                  <div className={"flex-center__column profile_placeholder"}>
                    <p>
                      {currentUser?.first_name.substring(0, 1) +
                        currentUser?.last_name.substring(0, 1)}
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={hiddenProfileInput}
                  onChange={handleProfileChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="flex-column dashboard-left__profile-content">
                <p>{currentUser?.first_name + " " + currentUser?.last_name}</p>
                <p>{currentUser?.email}</p>
              </div>
            </div>
            <div className="flex-column dashboard-left__nav">
              <ul className="flex-column dashboard-left__nav-top">
                <li>
                  <Link to="/dashboard" className="flex active">
                    <FeedIcon />
                    Feed
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="flex">
                    <ExploreIcon />
                    Explore
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="flex friends">
                    <FriendsIcon /> Friends
                  </Link>
                </li>
              </ul>
              <div className="dashboard-left__nav-bottom">
                <Link to="/dashboard" className="flex" onClick={userLogout}>
                  <LogoutIcon />
                  Logout
                </Link>
              </div>
            </div>
          </aside>
          <div className="flex-column dashboard-right">
            <div className="flex dashboard-right-top">
              <div className="flex search__input" id="search">
                <SearchIcon />
                <input />
              </div>
              <IShareButton
                buttonIconLeft={<UploadIcon />}
                buttonName={"Upload Image"}
                buttonStyle={"nav-login__button"}
                onClick={() => setOpenModal((prev) => !prev)}
              />
            </div>
            <div className="flex dashboard-right-middle">
              <DashStats
                icon={<UploadDashboard />}
                title={"20+"}
                content="Uploaded Images"
              />
              <DashStats
                icon={<FriendsDashboard />}
                title={"10+"}
                content="Friends"
              />
              <DashStats
                icon={<SharedDashboard />}
                title={"20+"}
                content="Shared Images"
              />
            </div>
            <div className="flex-column dashboard-right-bottom">
              <p className="dashboard-right-bottom__title">Feed</p>
              {userImages !== null ? (
                <div className="dashboard-right-bottom__content">
                  {userImages?.map(
                    ({ image_description, image_name, image_path }, index) => (
                      <ImageShow
                        profileImage={ManImage}
                        contentImage={image_path}
                        name={
                          currentUser?.first_name + " " + currentUser?.last_name
                        }
                        email={currentUser?.email}
                        imageDescription={image_description}
                        key={index}
                      />
                    )
                  )}
                </div>
              ) : (
                <div className="flex-center__column no-images">
                  <NoImages />
                  <p>
                    No Images Post <br /> Added Yet
                  </p>
                </div>
              )}
            </div>
          </div>
          {openModal && (
            <IShareModal
              inputValues={inputValues}
              setInputValues={setInputValues}
              setIsOpen={setOpenModal}
              hasNext={hasNext}
              setHasNext={setHasNext}
              errors={error}
              setError={setError}
            >
              {!hasNext ? (
                <div className="flex-center__column  upload-image-button">
                  <UploadSVG />
                  <p className="modal-upload__text">
                    Upload photos to preview them here
                  </p>
                  <IShareButton
                    buttonName={"Select from computer"}
                    onClick={handleClick}
                  />
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
              ) : hasNext === "image" ? (
                <div className="uploaded-image">
                  <img src={inputValues.image_file} alt="Uploded" />
                </div>
              ) : (
                <div className="flex upload-image-inputs">
                  <div className="uploaded-image">
                    <img src={inputValues.image_file} alt="Uploded" />
                  </div>
                  <div className="upload-separator"></div>
                  <div className="upload-inputs flex-column">
                    <IShareInput
                      labelName={"Name your image"}
                      error={error.image_name}
                      onChange={onChange}
                      inputName={"image_name"}
                    />
                    <IShareInput
                      labelName={"Add Image Caption"}
                      inputType={"textarea"}
                      error={error.image_description}
                      onChange={onChange}
                      inputName={"image_description"}
                    />
                  </div>
                </div>
              )}
            </IShareModal>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
