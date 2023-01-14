// React
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Storage
import { useAppDispatch, useAppSelector } from "storage/redux/hooks";
import { editUserPreferencesLocally, fetchUserCurrent, fetchUserPreferences } from "storage/redux/userCurrentSlice";
import { RootState } from "storage/redux/store";
import { fetchStudyDomains } from "storage/redux/universitySlice";
import AppContext from "storage/context/antContext";
// Ant Design
import { message } from "antd";
// API
import { default as axios } from "lib/axios";
import { putUserPreferences } from "api/userApi";
// Components
import { EmptyUser } from "models/User";
import ProfilePage from "./ProfilePage";
import UserPreferences from "models/UserPreferences";
// Utilities
import isEqual from "lodash.isequal";

const ProfilePageContainer = () => {
  const navigate = useNavigate();
  const { messageApi } = useContext(AppContext);
  const [preferencesInput, setPreferencesInput] = useState<UserPreferences>();
  const [loadingPreferences, setLoadingPreferences] = useState<boolean>(false);

  const { user, preferences } = useAppSelector((state: RootState) => state.userCurrent);
  const studyDomains = useAppSelector((state: RootState) => state.university.studyDomains);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoadingPreferences(true);
    if (user === undefined) {
      dispatch(fetchUserCurrent());
    }
    if (studyDomains.length === 0) {
      dispatch(fetchStudyDomains());
    }
    if (preferences === undefined) {
      dispatch(fetchUserPreferences());
    }
  }, []);

  useEffect(() => {
    if (user !== undefined && preferences !== undefined) {
      setPreferencesInput({
        averageGrade: preferences.averageGrade ?? undefined,
        preferencedStudyDomainId: preferences.preferencedStudyDomainId ?? undefined,
      });
      setLoadingPreferences(false);
    }
  }, [user, preferences]);

  const navigateToNotesPage = () => {
    navigate("/notes");
  };

  const navigateToPlansPage = () => {
    navigate("/plans");
  };

  const navigateToSubjectsPage = () => {
    navigate("/subjects");
  };

  const handleSavePreferences = async () => {
    if (preferencesInput === undefined) {
      throw Error("Saving preferences should not be possible when input is undefined.");
    }

    dispatch(editUserPreferencesLocally(preferencesInput));
    messageApi.loading({ key: "loading", content: "Loading..." });
    const response = await putUserPreferences(preferencesInput);
    message.destroy("loading");
    if (axios.isAxiosError(response)) {
      messageApi.error({ content: "Something went wrong.", duration: 2 });
    } else {
      messageApi.success({ content: "Preferences saved.", duration: 2 });
    }
  };

  const shouldDisplaySaveButton = (): boolean => {
    return (
      isEqual(preferencesInput, preferences) === false &&
      preferencesInput?.averageGrade !== undefined &&
      preferencesInput?.preferencedStudyDomainId !== undefined
    );
  };

  const shouldDisplayWarning = (): boolean => {
    return preferences?.averageGrade === undefined || preferences.preferencedStudyDomainId === undefined;
  };

  return (
    <ProfilePage
      user={user ?? EmptyUser}
      studyDomains={studyDomains}
      preferencesInput={preferencesInput}
      setPreferencesInput={setPreferencesInput}
      loadingPreferences={loadingPreferences}
      navigateToNotesPage={navigateToNotesPage}
      navigateToPlansPage={navigateToPlansPage}
      navigateToSubjectsPage={navigateToSubjectsPage}
      shouldDisplaySaveButton={shouldDisplaySaveButton}
      shouldDisplayWarning={shouldDisplayWarning}
      handleSavePreferences={handleSavePreferences}
    />
  );
};

export default ProfilePageContainer;
