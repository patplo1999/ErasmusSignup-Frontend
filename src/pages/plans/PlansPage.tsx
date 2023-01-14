// Ant Design
import { Button, InputNumber, List } from "antd";
import Input from "antd/lib/input/Input";
import { EditFilled} from '@ant-design/icons';
// Components
import { Plan } from "models/Plan";
// Styles
import "./PlansPage.scss";
import React from "react";

interface Props {
  plans: Map<number, Plan>;
  newPlan: Plan;
  currentPlanId: number|undefined;
  isEdited: Map<number, boolean>;
  isCoordinator: boolean;
  loading: { plans: boolean, subjects: boolean };
  switchCurrentPlan: (id: number) => void;
  changeCurrentPlanName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  changeSubjectName: (event: React.ChangeEvent<HTMLInputElement> , id: number) => void;
  changeSubjectEcts: (event: number|null, id: number) => void;
  publishPlan: () => void;
  savePlanChanges: () => void;
  deletePlan: () => void;
}

const PlansPage = ({
  plans,
  newPlan,
  currentPlanId,
  isEdited,
  isCoordinator,
  loading,
  switchCurrentPlan,
  changeCurrentPlanName,
  changeSubjectName,
  changeSubjectEcts,
  publishPlan,
  savePlanChanges,
  deletePlan,
}: Props) => {
  const currentPlan: Plan|undefined = currentPlanId === -1
      ? newPlan
      : ( currentPlanId === undefined ? undefined : plans.get(currentPlanId));
  
  return (
    <div id="plan-page-container">
      <div id="plan-list-panel" className="block">
        <h1>Plans:</h1>
        <List
          id="plan-list"
          dataSource={Array.from(plans.values())}
          loading={loading.plans}
          renderItem={item => (
            <List.Item
              onClick={() => {
                switchCurrentPlan(item.id);
              }}
              style={{ display: "block", margin: "0" }}
              key={item.id}
            >
              <h2 style={{ margin: "0" }}>{item.name.trim().length > 0 ? item.name : "(untitlled)"}</h2>
              {/* <p style={{ margin: "0 0.5rem" }}>{item.specialtyId}</p> */}
            </List.Item>
          )}
        />
        {isCoordinator ? 
          ""
        :
          <button id="create-new-plan-button" onClick={() => {switchCurrentPlan(-1);}}>
            Create new plan
          </button>
        }
      </div>
      <div id="plan-subjects-panel" className="block">
        {currentPlan ? (
          <div id="plan" className="block ">
            <div id="plan-headder">
              {isCoordinator ?
                <React.Fragment>
                  <div className="plan-name">
                    {currentPlan.name}
                  </div>
                  <div className="user-full-name">
                    <span>Plan owner: </span>
                    {currentPlan.studentName + " " + currentPlan.studentSurname}
                  </div>
                </React.Fragment>
              :
                <Input
                  className="plan-name-input"
                  placeholder="(untitled plan)"
                  prefix={<EditFilled />}
                  maxLength={100}
                  value={currentPlan.name}
                  onChange={changeCurrentPlanName}
                />
              }
              {isCoordinator ? (
                <div className="plan-buttons-panel">
                  <Button className="accept-button" size="large" type="primary">
                    Accept
                  </Button>
                  <Button className="decline-button" size="large" type="primary">
                    Decline
                  </Button>
                </div>
              ) : (
                <div className="plan-buttons-panel">
                  { currentPlanId == -1 ? 
                    <Button 
                      className="publish-button"
                      size="large"
                      type="primary"
                      onClick={publishPlan}
                      disabled={!isEdited.get(-1)}
                    >
                      Publish new plan
                    </Button>
                   :
                    <React.Fragment>
                      <Button
                        className="save-button"
                        size="large" type="primary"
                        onClick={savePlanChanges}
                        disabled={!isEdited.get(currentPlanId!)}
                      >
                        Save changes
                      </Button>
                      <Button 
                        className="send-button" 
                        size="large" 
                        type="primary"
                      >
                        Send to coordinator
                      </Button>
                      <Button
                        className="delete-button"
                        size="large"
                        type="primary"
                        onClick={deletePlan}
                      >
                        Delete
                      </Button>
                    </React.Fragment>
                  }
                </div>
              )}
            </div>
            <List
              dataSource={currentPlan.subjects}
              loading={loading.subjects}
              renderItem={item => (
                <List.Item className="plan-subject-row" key={item.id}>
                  <div className="plan-subject-home">
                      {item.mappedSubject.name}
                      <span> (ECTS: {item.mappedSubject.ects}) </span>
                  </div>
                  <div className="plan-subject-destination">
                    <Input
                      addonBefore="Subject name:"
                      className="subject-text-input"
                      placeholder="subject"
                      maxLength={100}
                      value={item.name}
                      onChange={event => {changeSubjectName(event, item.id)}}
                      disabled={isCoordinator}
                    />
                    <InputNumber
                      addonBefore="ECTS:"
                      min={1}
                      max={30}
                      defaultValue={1}
                      value={item.ects}
                      onChange={event => {changeSubjectEcts(event, item.id)}}
                      disabled={isCoordinator}
                    />
                  </div>
                </List.Item>
              )}
            />
            {/* {isCoordinator ? (
              <div className="plan-buttons-panel">
                <Button className="accept-button" size="large" type="primary">
                  Accept
                </Button>
                <Button className="decline-button" size="large" type="primary">
                  Decline
                </Button>
              </div>
            ) : (
              <div className="plan-buttons-panel">
                <Button className="save-button" size="large" type="primary">
                  Save changes
                </Button>
                <Button className="send-button" size="large" type="primary">
                  Send to coordinator
                </Button>
                <Button
                  className="delete-button"
                  size="large"
                  type="primary"
                  onClick={() => {
                    // TODO handler
                  }}>
                  Delete
                </Button>
              </div>
            )} */}
          </div>
        ) : (
          <div id="select-plan-info">
            <p>Select plan, from the menu on the left</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansPage;
