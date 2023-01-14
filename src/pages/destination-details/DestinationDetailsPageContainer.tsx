// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// API
import { createOpinion, getOpinion } from "api/opinionApi";
import { getDestinationDetails } from "api/universityApi";
// Components
import { OpinionResponse } from "models/Opinion";
import DestinationDetailsPage from "./DestinationDetailsPage";
import GetDestinationDetails from "api/DTOs/GET/GetDestinationDetails";

const DestinationDetailsPageContainer = () => {
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState<GetDestinationDetails | undefined>(undefined);
  const [opinions, setOpinions] = useState<OpinionResponse | undefined>(undefined);
  const [selectedDestId, setSelectedDestId] = useState<number>(0);
  const [loading, setLoading] = useState<{ details: boolean; opinions: boolean }>({
    details: false,
    opinions: false,
  });
  const [opinionInput, setOpinionInput] = useState<string>("");
  const [ratingInput, setRatingInput] = useState<number>(0);

  useEffect(() => {
    if (detailsData === undefined) {
      fetchDetailsData();
    }
    if (opinions === undefined) {
      fetchOpinions();
    }
  }, []);

  const fetchDetailsData = async () => {
    setLoading({ ...loading, opinions: true });
    const opinions = await getOpinion(10, 0, id!);
    setOpinions(opinions);
    setLoading({ ...loading, opinions: false });
  };

  const fetchOpinions = async () => {
    setLoading({ ...loading, details: true });
    const details = await getDestinationDetails(parseInt(id!));
    setDetailsData(details);
    setSelectedDestId(details.selectedDestId);
    setLoading({ ...loading, details: false });
  };

  const submitOpinionHandler = async () => {
    await createOpinion({ rating: ratingInput, content: opinionInput, specialityId: selectedDestId });

    const newOpinions = [
      ...opinions!.opinions,
      {
        id: Math.max(...opinions!.opinions.map(o => o.id)) + 1,
        canEdit: false,
        content: opinionInput,
        rating: ratingInput,
      },
    ];
    setOpinions(prevState => {
      return {
        totalRows: prevState!.totalRows,
        opinions: newOpinions,
      };
    });

    setRatingInput(0);
    setOpinionInput("");
  };

  const favoriteIndicatorClickHandler = () => {
    if (detailsData === undefined) {
      return;
    }

    // Thank you TypeScript...
    setDetailsData((prevState: GetDestinationDetails | undefined) => {
      return prevState === undefined
        ? undefined
        : {
            ...prevState,
            destinations: prevState!.destinations.map(d =>
              d.id === selectedDestId ? { ...d, isObserved: !d.isObserved } : d
            ),
          };
    });
  };

  return (
    <DestinationDetailsPage
      detailsData={detailsData}
      selectedDestId={selectedDestId}
      setSelectedDestId={setSelectedDestId}
      opinionInput={opinionInput}
      setOpinionInput={setOpinionInput}
      ratingInput={ratingInput}
      setRatingInput={setRatingInput}
      opinions={opinions ? opinions.opinions : []}
      loading={loading}
      submitOpinionHandler={submitOpinionHandler}
      favoriteIndicatorClickHandler={favoriteIndicatorClickHandler}
    />
  );
};

export default DestinationDetailsPageContainer;
