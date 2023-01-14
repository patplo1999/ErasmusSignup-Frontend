// Ant Design
import { Button, Image, InputNumber, Select, Spin } from "antd";
// Styles
import "./ProfilePage.scss";
// Components
import InlineItems from "components/InlineItems";
import UnderlinedLabeledTextField from "components/UnderlinedLabeledTextField";
import StudyDomain from "models/StudyDomain";
import UserPreferences from "models/UserPreferences";
import { User } from "models/User";

interface Props {
  user: User;
  studyDomains: StudyDomain[];
  preferencesInput: UserPreferences | undefined;
  setPreferencesInput: React.Dispatch<React.SetStateAction<UserPreferences | undefined>>;
  loadingPreferences: boolean;
  navigateToNotesPage: () => void;
  navigateToPlansPage: () => void;
  navigateToSubjectsPage: () => void;
  shouldDisplaySaveButton: () => boolean;
  shouldDisplayWarning: () => boolean;
  handleSavePreferences: () => void;
}

const ProfilePage = ({
  user,
  studyDomains,
  preferencesInput,
  setPreferencesInput,
  loadingPreferences,
  navigateToNotesPage,
  navigateToPlansPage,
  navigateToSubjectsPage,
  shouldDisplaySaveButton,
  shouldDisplayWarning,
  handleSavePreferences,
}: Props) => {
  return (
    <div className="user-page">
      <div className="user-section">
        <div className="block personal-data">
          <div className="image-space">
            <Image width={200} height={250} src={user.photoUtl_400x500} alt="user" />
          </div>
          <div className="data">
            <UnderlinedLabeledTextField
              label="Full name"
              text={
                user.titlesBefore +
                " " +
                user.firstName +
                " " +
                user.middleNames +
                " " +
                user.lastName +
                " " +
                user.titlesAfter
              }
            />
            <UnderlinedLabeledTextField label="E-Mail" text={user.email} />
            <UnderlinedLabeledTextField label="Role" text={user.isStaff ? "Staff" : "Student"} />
            {user.studentNumber ? <UnderlinedLabeledTextField label="Student number" text={user.studentNumber} /> : ""}
          </div>
        </div>
        <div className="block preferences">
          <p className="header-font">MY PREFERENCES</p>
          <div className="input-space">
            {loadingPreferences ? (
              <Spin />
            ) : (
              <div className="inputs">
                <InlineItems>
                  <p className="header-font">Study area: </p>
                  <Select
                    style={{ flexGrow: "1" }}
                    showSearch
                    placeholder="Select study area"
                    optionFilterProp="label"
                    allowClear
                    placement="bottomLeft"
                    size="large"
                    status={preferencesInput?.preferencedStudyDomainId === undefined ? "warning" : ""}
                    value={preferencesInput?.preferencedStudyDomainId}
                    onChange={value => {
                      setPreferencesInput(prevState => {
                        return {
                          ...prevState,
                          preferencedStudyDomainId: value,
                        } as UserPreferences;
                      });
                    }}
                    options={studyDomains.map(d => {
                      return { value: d.id, label: d.domainName };
                    })}
                  />
                </InlineItems>
                <InlineItems>
                  <p className="header-font">Min. grade: </p>
                  <InputNumber
                    min={2.0}
                    max={5.5}
                    precision={2}
                    size="large"
                    step={0.01}
                    defaultValue={undefined}
                    status={preferencesInput?.averageGrade === undefined ? "warning" : ""}
                    value={preferencesInput?.averageGrade}
                    onChange={value => {
                      const newValue = value ?? undefined;
                      setPreferencesInput(prevState => {
                        return {
                          ...prevState,
                          averageGrade: newValue,
                        } as UserPreferences;
                      });
                    }}
                  />
                </InlineItems>
              </div>
            )}
          </div>
          {shouldDisplaySaveButton() && (
            <div className="button-space">
              <Button size="large" type="primary" onClick={handleSavePreferences}>
                Save
              </Button>
            </div>
          )}
          {shouldDisplayWarning() && (
            <h3>
              You have not yet provided your preferences. Do it now to make finding the perfect destination easier!
            </h3>
          )}
        </div>
      </div>
      <div className="block utility-section">
        <div className="button" onClick={() => navigateToNotesPage()}>
          <h1 className="text">NOTES</h1>
        </div>
        <div className="button" onClick={() => navigateToPlansPage()}>
          <h1 className="text">PLANS</h1>
        </div>
        <div className="button" onClick={() => navigateToSubjectsPage()}>
          <h1 className="text">SUBJECTS</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
