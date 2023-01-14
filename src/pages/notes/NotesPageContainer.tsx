// React
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Redux & Context
import { useAppDispatch, useAppSelector } from "storage/redux/hooks";
import { deleteCommonNoteLocally, fetchNotesWithContent } from "storage/redux/noteSlice";
import { RootState } from "storage/redux/store";
import AppContext from "storage/context/antContext";
// Utilities
import { default as axios } from "lib/axios";
import { deleteCommonNote } from "api/noteApi";
// Components
import CommonNote from "models/notes/CommonNote";
import NotesPage from "./NotesPage";

const NotesPageContainer = () => {
  const navigate = useNavigate();
  const { messageApi } = useContext(AppContext);
  const { loading, notes } = useAppSelector((state: RootState) => state.note);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<"COMMON" | "SPECIALTIES" | "PLANS">("COMMON");

  useEffect(() => {
    const { common, speciality, plan } = notes;
    if (common.length === 0 && speciality.length === 0 && plan.length === 0) {
      dispatch(fetchNotesWithContent());
    }
  }, []);

  const chooseNotesToRender = (): CommonNote[] => {
    const { common, speciality, plan } = notes;
    if (common.length === 0 && speciality.length === 0 && plan.length === 0) {
      return [];
    }

    switch (activeTab) {
      case "COMMON":
        return notes.common;
      case "SPECIALTIES":
        return notes.speciality;
      case "PLANS":
        return notes.plan;
    }
  };

  const handleDeleteNote = async (id: number) => {
    dispatch(deleteCommonNoteLocally(+id));
    const response = await deleteCommonNote(+id);
    if (axios.isAxiosError(response)) {
      messageApi.error({ content: "Something went wrong.", duration: 2 });
    } else {
      messageApi.success({ content: "Note deleted.", duration: 2 });
    }
  };

  return (
    <NotesPage
      notes={chooseNotesToRender()}
      loading={loading}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      navigate={navigate}
      handleDeleteNote={handleDeleteNote}
    />
  );
};

export default NotesPageContainer;
