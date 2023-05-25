import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import * as Upload from "upload-js-full";
import fetch from "node-fetch";

export const AuthContext = createContext();

const API = axios.create({ baseURL: "http://34.201.165.150:5000/api/v1/" });

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [userImages, setUserImages] = useState(
    JSON.parse(localStorage.getItem("images")) || []
  );

  const [isLoading, setIsLoading] = useState(null);

  const [profile, setProfile] = useState({
    image_type: "",
    image_raw: "",
  });

  const signin = async (inputs) => {
    setIsLoading(true);
    const res = await API.post("/login", inputs);
    if (!isEmpty(res.data)) {
      if (!res.data.error) {
        setCurrentUser(res.data);
      } else throw Error(res.data.error);
    }

    console.log(currentUser);
    const resImages = await API.get("/images/" + res?.data?.id);
    if (!isEmpty(resImages.data)) {
      if (!resImages.data.error) {
        setUserImages((prev) => ([...prev, resImages.data.filter(item => item.id === res?.data?.id)]))
        console.log(resImages.data)
    }
      else throw Error(resImages.data.error);
    }

    setIsLoading(false);
  };

  const signup = async (inputs) => {
    setIsLoading(true);
    const res = await API.post("/signup", inputs);
    if (!isEmpty(res.data)) {
      if (!res.data.error) setCurrentUser(res.data);
      else throw Error(res.data.error);
    }
    setIsLoading(false);
  };

  const update_profile = useCallback(async (profile) => {
    setIsLoading(true);
    const uploadManager = new Upload.UploadManager(
      new Upload.Configuration({
        fetchApi: fetch,
        apiKey: "public_12a1y1w83Ea2Y6zCrmrybWt6QsLp",
      })
    );

    uploadManager
      .upload({
        accountId: "12a1y1w",

        data: profile.image_raw,

        maxConcurrentUploadParts: 4,
        mime: profile.image_type,
        metadata: {
          productId: 60891,
        },

        tags: ["example_tag"],

        path: {
          folderPath: "/uploads/{UTC_YEAR}/{UTC_MONTH}/{UTC_DAY}",
          fileName: "{UNIQUE_DIGITS_8}{ORIGINAL_FILE_EXT}",
        },

        cancellationToken: {
          isCancelled: false,
        },
      })
      .then(
        async ({ fileUrl, filePath }) => {
          try {
            setCurrentUser((prev) => ({
                ...prev, profile_image: fileUrl
            }))
            await API.put(`/users/${currentUser.id}`, currentUser);

          } catch (error) {
            console.log(error.message);
          }
          setProfile(() => ({
            image_raw: "",
            image_type: ""
          }))
        },
        (error) => console.error(`Upload failed: ${error.message}`, error)
      );
    setIsLoading(false);
  }, [currentUser]);

  const logout = async () => {
    setCurrentUser(null);
    setUserImages([]);
  };

  const post_image = async (inputs) => {
    const res = await API.post("/images", inputs);
    if (!isEmpty(res.data)) {
      if (!res.data.error) {
        setUserImages((prev) => ([...prev, res.data]))
        console.log(res.data)
    }
      else throw Error(res.data.error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("images", JSON.stringify(userImages));
  }, [currentUser, userImages]);

  useEffect(() => {
    let isEmpty = false
    Object.keys(profile).forEach(key => {
        if(profile[key] === "")
            isEmpty = true;
      })
    try {
        if (!isEmpty)
            update_profile(profile);
      } catch (error) {
        console.log(error.message);
      }
  }, [profile, update_profile])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userImages,
        setCurrentUser,
        signin,
        signup,
        logout,
        post_image,
        update_profile,
        isLoading,
        setProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
