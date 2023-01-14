// React
import { Link } from "react-router-dom";
// Ant Design
import { Button, Input } from "antd";
// Styles
import "./ListPage.scss";
// Components
import DestSpecialty from "models/DestSpecialty";
import SelectFilter from "./SelectFilter";
import MainList from "./MainList";
import SideList from "./SideList";
import StudyArea from "models/StudyArea";
import DestFiltering from "models/DestFiltering";
// Utilities
import isEqual from "lodash.isequal";

interface Props {
  userLoggedIn: boolean;
  filters: DestFiltering;
  setFilters: React.Dispatch<React.SetStateAction<DestFiltering>>;
  currentFilters: DestFiltering;
  universityNameSearch: string;
  setUniversityNameSearch: React.Dispatch<React.SetStateAction<string>>;
  pageNum: number;
  destinations: DestSpecialty[];
  userPreferencesFilled: boolean;
  recommended: DestSpecialty[] | undefined;
  recommendedByStudent: DestSpecialty[] | undefined;
  countries: string[];
  studyAreas: StudyArea[];
  sortingOptions: { value: string; label: string }[];
  handlePageChange: (page: number, pageSize: number) => void;
  totalAmount: number;
  loading: boolean;
  handleOnClick: (id: number) => void;
  applyFilters: () => Promise<void>;
  handleSearch: () => void;
  favoriteIndicatorClickHandler: (id: number) => void;
}

const { Search } = Input;

const ListPage = ({
  userLoggedIn,
  filters,
  setFilters,
  currentFilters,
  universityNameSearch,
  setUniversityNameSearch,
  pageNum,
  destinations,
  userPreferencesFilled,
  recommended,
  recommendedByStudent,
  countries,
  studyAreas,
  sortingOptions,
  handlePageChange,
  totalAmount,
  loading,
  handleOnClick,
  applyFilters,
  handleSearch,
  favoriteIndicatorClickHandler,
}: Props) => {
  const renderSideListContent = (items: DestSpecialty[] | undefined) => {
    // prettier-ignore
    return userLoggedIn === false || items === undefined 
      ? <p>Log in to see helpful recommendations!</p> 
      : userPreferencesFilled === false 
        ? <p>{`You haven't yet provided your preferences. `}<Link to="/profile">Do it here.</Link></p>
        : items.length === 0 
          ? <p>{`Sorry, we don't have any recommendations for you yet.`}</p> 
          : <SideList destinations={items} loading={loading} handleOnClick={handleOnClick} />;
    // prettier-ignore-end
  };

  return (
    <div className="list-page">
      <div className="block filter-section">
        <p className="header-font">FITLERS</p>
        <div className="filters">
          <SelectFilter
            handleSelect={(value: { value: string; label: string } | undefined) =>
              setFilters(prevState => {
                return {
                  ...prevState,
                  country: value?.label,
                };
              })
            }
            label="Country"
            placeholder="Select country"
            options={countries.map(c => {
              return { value: crypto.randomUUID(), label: c };
            })}
          />
          <SelectFilter
            handleSelect={(value: { value: string; label: string } | undefined) =>
              setFilters(prevState => {
                return {
                  ...prevState,
                  subjectAreaId: value?.value,
                };
              })
            }
            label="Subject area"
            placeholder="Select subject area"
            options={studyAreas.map(s => {
              return { value: s.id.toString(), label: s.areaName };
            })}
          />
          <SelectFilter
            handleSelect={(value: { value: string; label: string } | undefined) =>
              setFilters(prevState => {
                return {
                  ...prevState,
                  orderBy: value?.value,
                };
              })
            }
            label="Sort by"
            placeholder="Select sorting option"
            options={sortingOptions}
          />
          <div className="filter" style={{ marginLeft: "auto" }}>
            <p className="header-font">University name</p>
            <Search
              style={{ width: "350px" }}
              size="large"
              value={universityNameSearch}
              onChange={event => {
                setUniversityNameSearch(event.target.value);
              }}
              placeholder="input search text"
              onSearch={handleSearch}
            />
          </div>
        </div>
        <div className="button-space">
          {isEqual(filters, currentFilters) === false && (
            <Button type="primary" size="large" onClick={() => applyFilters()}>
              Apply filters
            </Button>
          )}
        </div>
      </div>
      <div className="lists">
        <div className="left-section">
          <div className="block list-space side-list">
            <p className="header-font">Recommended destinations</p>
            {renderSideListContent(recommended)}
          </div>
          <div className="block list-space side-list">
            <p className="header-font">Students like you chose</p>
            {renderSideListContent(recommendedByStudent)}
          </div>
        </div>
        <div className="block list-space main-list">
          <MainList
            destinations={destinations}
            loading={loading}
            totalAmount={totalAmount}
            handleOnClick={handleOnClick}
            handlePageChange={handlePageChange}
            pageNum={pageNum}
            favoriteIndicatorClickHandler={favoriteIndicatorClickHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
