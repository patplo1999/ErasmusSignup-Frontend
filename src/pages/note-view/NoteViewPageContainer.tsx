// React
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Storage
import { useAppDispatch, useAppSelector } from "storage/redux/hooks";
import { addCommonNoteLocally, deleteCommonNoteLocally, editCommonNoteLocally } from "storage/redux/noteSlice";
import { RootState } from "storage/redux/store";
import AppContext from "storage/context/antContext";
// Ant Design
import { message } from "antd";
// API
import { default as axios } from "lib/axios";
import { deleteCommonNote, postCommonNote, putCommonNote } from "api/noteApi";
// Components
import PostCommonNote from "api/DTOs/POST/PostCommonNote";
import CommonNote from "models/notes/CommonNote";
import NoteViewPage from "./NoteViewPage";

const NoteViewPageContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { messageApi } = useContext(AppContext);
  const { common, speciality, plan } = useAppSelector((state: RootState) => state.note.notes);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const messageKeys = useRef({
    add: "add-key",
    delete: "delete-key",
  });

  useEffect(() => {
    if (id !== undefined) {
      const allNotes: CommonNote[] = [...common, ...speciality, ...plan];
      const thisNote = allNotes.find(n => n.id === +id);

      if (thisNote === undefined) {
        throw Error("Selected note was not found among notes.");
      }

      setTitle(thisNote.title);
      setText(thisNote.content);
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const clearText = () => {
    setText("");
  };

  const saveNote = async () => {
    const body: PostCommonNote = {
      title: title,
      content: text,
    };

    dispatch(id === undefined ? addCommonNoteLocally(body) : editCommonNoteLocally({ id: +id, body: body }));

    messageApi.loading({ key: messageKeys.current.add, content: "Loading..." });

    const response = id === undefined ? await postCommonNote(body) : await putCommonNote(+id, body);

    message.destroy(messageKeys.current.add);
    if (axios.isAxiosError(response)) {
      messageApi.error({ content: "Something went wrong.", duration: 2 });
    } else {
      messageApi.success({ content: "Note saved.", duration: 2 });
    }

    clearText();
    goBack();
  };

  const deleteNote = async () => {
    if (id === undefined) {
      throw Error("Delete should not be possible with undefined ID.");
    }

    dispatch(deleteCommonNoteLocally(+id));
    messageApi.loading({ key: messageKeys.current.delete, content: "Loading..." });
    const response = await deleteCommonNote(+id);
    message.destroy(messageKeys.current.delete);
    if (axios.isAxiosError(response)) {
      messageApi.error({ content: "Something went wrong.", duration: 2 });
    } else {
      messageApi.success({ content: "Note deleted.", duration: 2 });
    }

    goBack();
  };

  return (
    <NoteViewPage
      id={id}
      text={text}
      setText={setText}
      title={title}
      setTitle={setTitle}
      goBack={goBack}
      clearText={clearText}
      saveNote={saveNote}
      deleteNote={deleteNote}
    />
  );
};

export default NoteViewPageContainer;
