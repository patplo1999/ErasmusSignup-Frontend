import { TeamOutlined, LineChartOutlined, MessageOutlined, StarFilled } from "@ant-design/icons";
import { List } from "antd";
import InlineItems from "components/InlineItems";
import DestSpecialty from "models/DestSpecialty";

interface Props {
  destinations: DestSpecialty[];
  loading: boolean;
  handleOnClick: (id: number) => void;
}

const SideList = ({ destinations, loading, handleOnClick }: Props) => {
  return (
    <List
      loading={loading}
      itemLayout="vertical"
      dataSource={destinations}
      renderItem={item => (
        <List.Item
          key={item.destinationSpecialityId}
          className="university-list-item"
          style={{
            borderBottomColor: "rgb(184, 184, 184)",
          }}
          onClick={() => {
            handleOnClick(item.destinationSpecialityId);
          }}>
          <div className="university-list-item-content">
            <div className="country-flag-space">
              <img src={item.flagUrl} alt="country flag" />
            </div>
            <div className="university-data-space">
              <div className="university-information">
                <div className="top-row">
                  <h3
                    style={{
                      display: "inline",
                      marginRight: "10px",
                    }}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={event => {
                        event.stopPropagation();
                      }}>
                      {item.universityName}
                    </a>
                  </h3>
                  <div className="rating-micro">
                    <InlineItems>
                      <p>{`${item.rating}/5`}</p>
                      <StarFilled style={{ fontSize: "1.2rem", color: "#FADB14" }} />
                    </InlineItems>
                  </div>
                </div>

                <p>
                  {item.subjectAreaName} | {item.subjectAreaId}
                </p>
              </div>

              <div className="text-icons">
                <InlineItems>
                  <TeamOutlined />
                  {item.vacancies}
                </InlineItems>

                <InlineItems>
                  <LineChartOutlined />
                  {item.average}
                </InlineItems>

                <InlineItems>
                  <MessageOutlined />
                  {item.opinions}
                </InlineItems>
              </div>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default SideList;
