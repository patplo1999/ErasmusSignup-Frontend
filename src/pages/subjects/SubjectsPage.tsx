// Ant Design
import { Button, InputNumber, List } from "antd";
import Input from "antd/lib/input/Input";
// Components
import { UserSubject } from "models/UserSubject";
// Styles
import "./SubjectsPage.scss";

interface Props {
  subjects: Map<number, UserSubject>|undefined;
  isPlanEdited: boolean;
  loading: { subjects: boolean; };
  saveUserPlan: () => void
  addSubject: () => void;
  deleteSubject: (id: number) => void;
  changeSubjectName: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
  changeEcts: (event: number|null, id: number) => void;
}

const SubjectsPage = ({ subjects, isPlanEdited, loading, saveUserPlan, addSubject, deleteSubject, changeSubjectName, changeEcts }: Props) => {
  return (
    <div id="subjects-page-container">
      <div id="plan-list" className="block">
        <div id="plan-headder">
          <h1>Subjects:</h1>
          <Button size="large" type="primary" onClick={saveUserPlan} disabled={!isPlanEdited}>
            Save changes
          </Button>
          <Button
            size="large"
            type="primary"
            onClick={addSubject}>
            Add new subject
          </Button>
        </div>

        <List
          dataSource={Array.from( subjects === undefined ? [] : subjects.values())}
          loading={loading.subjects}
          renderItem={item => (
            <List.Item className="plan-subject-row" key={item.id}>
              <Input
                addonBefore="Subject name:"
                className="subject-text-input"
                placeholder="Subject name"
                maxLength={100}
                value={item.name}
                onChange={event => {changeSubjectName(event, item.id)}}
              />
              <InputNumber
                addonBefore="ECTS:"
                min={1}
                max={30}
                defaultValue={1}
                value={item.ects}
                onChange={event => {changeEcts(event, item.id)}}
              />
              <Button
                className="delete-button"
                size="large"
                type="primary"
                onClick={() => {deleteSubject(item.id)}}
              >
                ✖
              </Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default SubjectsPage;
