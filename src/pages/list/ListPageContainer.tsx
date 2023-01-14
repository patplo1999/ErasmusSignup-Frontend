// React
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import ListPage from "./ListPage";
import { useAppDispatch, useAppSelector } from "storage/redux/hooks";
import { RootState } from "storage/redux/store";
import {
  changeObservedStatus,
  fetchCountries,
  fetchDestinations,
  fetchDestinationsRecommended,
  fetchDestinationsRecommendedByStudents,
  fetchStudyAreas,
} from "storage/redux/universitySlice";
import sortingOptions, { SortingOptions } from "api/DTOs/GET/SortingOptions";
import DestFiltering from "models/DestFiltering";

const ListPageContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    destinationList,
    userPreferencesFilled,
    destinationsRecommended,
    destinationsRecommendedByStudents,
    countries,
    studyAreas,
  } = useAppSelector((state: RootState) => state.university);
  const { preferences } = useAppSelector((state: RootState) => state.userCurrent);
  const { userLoggedIn } = useAppSelector((state: RootState) => state.login);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [universityNameSearch, setUniversityNameSearch] = useState<string>("");
  const [filters, setFilters] = useState<DestFiltering>({
    country: undefined,
    subjectAreaId: undefined,
    orderBy: undefined,
  });
  const [currentFilters, setCurrentFilters] = useState<DestFiltering>({
    country: undefined,
    subjectAreaId: undefined,
    orderBy: undefined,
  });
  const sortingOptionsList = useRef(
    Object.keys(sortingOptions).map(key => {
      return {
        value: key,
        label: sortingOptions[key as keyof SortingOptions],
      };
    })
  );

  useEffect(() => {
    handlePageChange(1, 10);
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [userLoggedIn, preferences]);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries());
    }
    if (studyAreas.length === 0) {
      dispatch(fetchStudyAreas());
    }
  }, []);

  const fetchRecommendations = () => {
    if (userLoggedIn) {
      dispatch(fetchDestinationsRecommended());
      dispatch(fetchDestinationsRecommendedByStudents());
    }
  };

  const applyFilters = async () => {
    setLoading(true);
    setPageNum(1);
    setCurrentFilters({ ...filters });
    dispatch(fetchDestinations({ page: 1, pageSize: 10, filters }));
    setLoading(false);
  };

  const handlePageChange = async (page: number, pageSize: number) => {
    setLoading(true);
    setPageNum(page);
    dispatch(fetchDestinations({ page, pageSize, filters: currentFilters }));
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    setPageNum(1);
    dispatch(
      fetchDestinations({ page: 1, pageSize: 10, filters: currentFilters, universityName: universityNameSearch })
    );
    setLoading(false);
  };

  const handleOnClick = (id: number) => {
    navigate(`/list/${id}`);
  };

  const favoriteIndicatorClickHandler = (id: number) => {
    dispatch(changeObservedStatus(id));
  };

  return (
    <ListPage
      userLoggedIn={userLoggedIn}
      filters={filters}
      setFilters={setFilters}
      currentFilters={currentFilters}
      universityNameSearch={universityNameSearch}
      setUniversityNameSearch={setUniversityNameSearch}
      pageNum={pageNum}
      destinations={destinationList.destinations}
      userPreferencesFilled={userPreferencesFilled}
      recommended={destinationsRecommended}
      recommendedByStudent={destinationsRecommendedByStudents}
      countries={countries}
      studyAreas={studyAreas}
      sortingOptions={sortingOptionsList.current}
      handlePageChange={handlePageChange}
      totalAmount={destinationList.totalRows}
      loading={loading}
      handleOnClick={handleOnClick}
      applyFilters={applyFilters}
      handleSearch={handleSearch}
      favoriteIndicatorClickHandler={favoriteIndicatorClickHandler}
    />
  );
};

export default ListPageContainer;
