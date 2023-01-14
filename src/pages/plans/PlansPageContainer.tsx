// React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Components
import { convertPlanToSend, Plan, PlanSend } from "models/Plan";
import PlansPage from "./PlansPage";
import { getPlans, getUserPlan, postPlan, deletePlan, putPlan } from "api/planApi";

interface Props {
  isCoordinator: boolean;
}

const PlansPageContainer = ({ isCoordinator }: Props) => {
  const { id } = useParams();
  const [plans, setPlans] = useState<Map<number, Plan>>(new Map());
  const [currentPlanId, setCurrentPlanId] = useState<number | undefined>(undefined);
  const [isEdited, setIsEdited] = useState<Map<number, boolean>>(new Map());
  const [newPlan, setNewPlan] = useState<Plan>({
    id: -1,
    name: "",
    studentId: 0,
    studentName: "",
    studentSurname: ""
  });
  const [loading, setLoading] = useState<{ plans: boolean, subjects: boolean }>({
    plans: false,
    subjects: false,
  });

  useEffect(() => {
    if (plans.size === 0) {
      fetchPlans();
    }
    if (currentPlanId === undefined) {
      const idParsed: number|undefined = (id ?
        (id === "new" ?
          -1
        :
          parseInt(id)
        )
      :
        undefined
      );
      switchCurrentPlan(idParsed!);
    }
    if (newPlan.subjects === undefined) {
      fetchUserPlan();
    }
  }, [plans, currentPlanId, id]);

  const fetchPlans = async () => {
    setLoading({ ...loading, plans: true });
    setLoading({ ...loading, subjects: true });
    const newPlans = await getPlans();
    setPlans(() => {
      const newState: Map<number, Plan> = new Map<number, Plan>()
      for (let i = 0; i < newPlans.length; i++) {
        newState.set(newPlans[i].id, newPlans[i])
      }
      return newState;
    });
    setLoading({ ...loading, plans: false });
    setLoading({ ...loading, subjects: false });
  }

  const fetchUserPlan = async () => {
    if(currentPlanId == -1){
      setLoading({ ...loading, subjects: true });
    }
    const subjects = await getUserPlan();
    const newNewPlan: Plan = { ...newPlan };
    newNewPlan.subjects = [];
    for (let i = 0; i < subjects.subjects.length; i++) {
      newNewPlan.subjects.push({ mappedSubject: subjects.subjects[i], ects: 0, id: -i, name: "" })
    }
    setNewPlan(newNewPlan);
    if(currentPlanId == -1){
      setLoading({ ...loading, subjects: false });
    }
  };

  const switchCurrentPlan = (id: number|undefined) => {
    setCurrentPlanId(id);
    if(id){
      window.history.replaceState({}, "", (isCoordinator ? "/plans/coordinator/" : "/plans/") + (id == -1 ? "new" : id));
    }
  }

  const setIsEditedTo = (state: boolean, id: number) => {
    setIsEdited(prevState => {
      const newState: Map<number, boolean> = new Map(prevState);
      newState.set(id, state)
      return newState;
    })
  }

  const changeCurrentPlanName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentPlanId) {
      setIsEditedTo(true, currentPlanId);
      if (currentPlanId === -1) {
        setNewPlan(prevState => {
          const newState: Plan = { ...prevState };
          newState.name = event.target.value;
          return newState;
        })
      }
      else {
        setPlans(prevState => {
          const newState: Map<number, Plan> = new Map(prevState);
          newState.get(currentPlanId)!.name = event.target.value;
          return newState;
        });
      }
    }
  }

  const changeSubjectName = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (currentPlanId) {
      setIsEditedTo(true, currentPlanId);
      if (currentPlanId === -1) {
        setNewPlan(prevState => {
          const newState: Plan = { ...prevState };
          newState!.subjects!.find(subject => { return subject.id === id })!.name = event.target.value;
          return newState;
        })
      }
      else {
        setPlans(prevState => {
          const newState: Map<number, Plan> = new Map(prevState);
          newState.get(currentPlanId)!
            .subjects!.find(subject => { return subject.id === id })!.name = event.target.value;
          return newState;
        });
      }
    }
  }

  const changeSubjectEcts = (event: number | null, id: number) => {
    if (currentPlanId && event) {
      setIsEditedTo(true, currentPlanId);
      if (currentPlanId === -1) {
        setNewPlan(prevState => {
          const newState: Plan = { ...prevState };
          newState!.subjects!.find(subject => { return subject.id === id })!.ects = event;
          return newState;
        })
      }
      else {
        setPlans(prevState => {
          const newState: Map<number, Plan> = new Map(prevState);
          newState.get(currentPlanId)!.subjects!.find(subject => { return subject.id === id })!.ects = event;
          return newState;
        });
      }
    }
  }

  const publishPlan = () => {
    if (currentPlanId && currentPlanId === -1 && newPlan!.subjects) {
      const planSend: PlanSend = convertPlanToSend(newPlan);
      postPlan(planSend)
        .then(response => {
          // const planToAdd = { ...newPlan };
          // planToAdd.id = response.data as number;
          const newPlans: Map<number, Plan> = new Map(plans);
          newPlans.set(response.data as number, newPlan)
          setPlans(newPlans);
          switchCurrentPlan(response.data as number);
          setNewPlan(prevState => {
            const newState = { ...prevState, name: "" }
            for (let i = 0; i < newPlan.subjects!.length; i++) {
              newState.subjects![i].ects = 0;
              newState.subjects![i].name = "";
            }
            return newState;
          });
        });
    }
  }

  const savePlanChanges = () => {
    if(currentPlanId) {
      const planSend: PlanSend = convertPlanToSend(plans.get(currentPlanId)!);
      putPlan(planSend, currentPlanId)
        .then(() => {
          setIsEditedTo(false, currentPlanId);
        });
    }
  }

  // const sendToCoordinator = () => {

  // }

  const deletePlanWrap = () => {
    if(currentPlanId){
      deletePlan(currentPlanId).then(() => {
        setPlans(prevState => {
          const newState: Map<number, Plan> = new Map(prevState);
          newState.delete(currentPlanId);
          return newState;
        })
      })
    }
  }

  return <PlansPage
    plans={plans}
    newPlan={newPlan}
    currentPlanId={currentPlanId}
    isEdited={isEdited}
    isCoordinator={isCoordinator}
    loading={loading}
    switchCurrentPlan={switchCurrentPlan}
    changeCurrentPlanName={changeCurrentPlanName}
    changeSubjectName={changeSubjectName}
    changeSubjectEcts={changeSubjectEcts}
    publishPlan={publishPlan}
    savePlanChanges={savePlanChanges}
    deletePlan={deletePlanWrap}
  />;
}

export default PlansPageContainer;