// React
import { NavigateFunction } from "react-router-dom";
// Ant Design
import { List, Typography } from "antd";
import { DeleteFilled } from "@ant-design/icons";
// Styles
import "./NotesPage.scss";
// Components
import CommonNote from "models/notes/CommonNote";

interface Props {
  notes: CommonNote[];
  loading: boolean;
  activeTab: "COMMON" | "SPECIALTIES" | "PLANS";
  setActiveTab: React.Dispatch<React.SetStateAction<"COMMON" | "SPECIALTIES" | "PLANS">>;
  navigate: NavigateFunction;
  handleDeleteNote: (id: number) => void;
}

const NotesPage = ({ notes, loading, activeTab, setActiveTab, navigate, handleDeleteNote }: Props) => {
  const rightButton = () => {
    switch (activeTab) {
      case "COMMON":
        return (
          <div className="tab right-button" onClick={() => navigate(`/notes/edit`)}>
            <p>NEW NOTE</p>
          </div>
        );
      case "SPECIALTIES":
        return (
          <div className="tab right-button" onClick={() => navigate(`/list`)}>
            <p style={{ fontSize: "1.2rem" }}>VIEW DESTINATIONS</p>
          </div>
        );
      case "PLANS":
        return (
          <div className="tab right-button" onClick={() => navigate(`/plans`)}>
            <p>VIEW PLANS</p>
          </div>
        );
    }
  };

  return (
    <div className="notes-page">
      <div className="tabs">
        <div className={`tab ${activeTab === "COMMON" ? "active" : ""}`} onClick={() => setActiveTab("COMMON")}>
          <p>COMMON</p>
        </div>
        <div
          className={`tab ${activeTab === "SPECIALTIES" ? "active" : ""}`}
          onClick={() => setActiveTab("SPECIALTIES")}>
          <p>SPECIALTIES</p>
        </div>
        <div className={`tab ${activeTab === "PLANS" ? "active" : ""}`} onClick={() => setActiveTab("PLANS")}>
          <p>PLANS</p>
        </div>
        {rightButton()}
      </div>

      <div className="block notes-space">
        <List
          dataSource={notes}
          loading={loading}
          renderItem={item => (
            <List.Item
              className="list-item"
              onClick={() => {
                navigate(`/notes/edit/${item.id}`);
              }}
              extra={
                <DeleteFilled
                  onClick={event => {
                    event.stopPropagation();
                    handleDeleteNote(item.id);
                  }}
                  style={{ color: "#C00000", fontSize: "1.2rem" }}
                />
              }>
              <Typography.Text strong ellipsis={true}>
                {item.title}
              </Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default NotesPage;
