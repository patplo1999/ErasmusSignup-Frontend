// Ant Design
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
// Assets
import arrowBack from "assets/arrowBack.svg";
import sweep from "assets/sweep.svg";
// Styles
import "./NoteViewPage.scss";

interface Props {
  id: string | undefined;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  goBack: () => void;
  clearText: () => void;
  saveNote: () => void;
  deleteNote: () => void;
}

const NoteViewPage = ({ id, text, setText, title, setTitle, goBack, clearText, saveNote, deleteNote }: Props) => {
  return (
    <div className="note-view-page">
      <div className="button" onClick={goBack}>
        <span>
          <img src={arrowBack} alt="back button" style={{ width: "60px" }} />
        </span>
      </div>
      <div className="block content">
        <Input
          style={{ marginBottom: "2rem" }}
          showCount
          maxLength={200}
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <TextArea
          showCount
          maxLength={2000}
          autoSize={{ minRows: 10 }}
          value={text}
          onChange={event => setText(event.target.value)}
        />
      </div>
      <div className="utility-buttons-space">
        <div className="button" onClick={saveNote}>
          <SaveOutlined />
        </div>
        <div className="button" onClick={clearText}>
          <img src={sweep} alt="back button" style={{ width: "48px" }} />
        </div>
        {id && (
          <div className="button" onClick={deleteNote}>
            <DeleteOutlined />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteViewPage;
