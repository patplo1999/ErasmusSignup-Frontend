import { TeamOutlined, LineChartOutlined, MessageOutlined } from "@ant-design/icons";
import { List, Rate, Button } from "antd";
import FavoriteStatusIndicator from "components/FavoriteStatusIndicator";
import InlineItems from "components/InlineItems";
import DestSpecialty from "models/DestSpecialty";
import openInNewTab from "utilities/openInNewTab";

interface Props {
  destinations: DestSpecialty[];
  handlePageChange: (page: number, pageSize: number) => void;
  totalAmount: number;
  loading: boolean;
  handleOnClick: (id: number) => void;
  pageNum: number;
  favoriteIndicatorClickHandler: (id: number) => void;
}

const MainList = ({
  destinations,
  loading,
  totalAmount,
  handlePageChange,
  handleOnClick,
  pageNum,
  favoriteIndicatorClickHandler,
}: Props) => {
  return (
    <List
      loading={loading}
      itemLayout="vertical"
      dataSource={destinations}
      pagination={{
        position: "both",
        total: totalAmount,
        current: pageNum,
        pageSize: 10,
        onChange: (page, pageSize) => {
          handlePageChange(page, pageSize);
        },
      }}
      renderItem={item => (
        <List.Item
          key={item.destinationSpecialityId}
          className="university-list-item"
          style={{
            borderBottomColor: "rgb(184, 184, 184)",
            paddingLeft: "0.5rem",
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
                  <h2
                    style={{
                      display: "inline",
                      marginRight: "10px",
                    }}>
                    {item.universityName}
                  </h2>
                  <h3
                    style={{
                      display: "inline",
                      color: "grey",
                    }}>
                    {item.country}
                  </h3>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={item.rating}
                    style={{
                      margin: "0 auto 0 10px",
                      position: "relative",
                      top: "-10px",
                    }}
                  />
                  <FavoriteStatusIndicator
                    onClick={event => {
                      event.stopPropagation();
                      favoriteIndicatorClickHandler(item.destinationSpecialityId);
                    }}
                    active={item.isObserved}
                  />
                </div>

                <p style={{ marginTop: "0.5rem" }}>
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

            <div className="buttons">
              <Button type="primary">Show on map</Button>
              <Button
                type="primary"
                onClick={() => {
                  if (item.link !== null) {
                    openInNewTab(item.link);
                  } else {
                    alert("No website for this university.");
                  }
                }}>
                Visit website
              </Button>
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default MainList;
