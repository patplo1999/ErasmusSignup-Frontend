// React
import { useEffect, useState } from "react";
// Components
import { UserPlan, UserSubject } from "models/UserSubject";
import SubjectsPage from "./SubjectsPage";
import { getUserPlan, postUserPlan } from "api/planApi";

const SubjectsPageContainer = () => {
  const [subjects, setSubjects] = useState<Map<number, UserSubject>>(new Map());
  const [isPlanEdited, setIsPlanEdited] = useState<boolean>(false);
  const [loading, setLoading] = useState<{ subjects: boolean; }>({
    subjects: false,
  });

  useEffect(() => {
    if (subjects.size === 0) {
      fetchUserPlan();
    }

  }, [subjects]);

  const fetchUserPlan = async () => {
    setLoading({ ...loading, subjects: true });
    const newSubjects = await (await getUserPlan()).subjects;
    setSubjects(() => {
      const newState: Map<number, UserSubject> = new Map();
      for (let i = 0; i < newSubjects.length; i++) {
        newState.set(newSubjects[i].id, newSubjects[i]!)
      }
      return newState;
    });
    setLoading({ ...loading, subjects: false });
  };

  const saveUserPlan = () => {
    const userPlan: UserPlan  = {subjects: Array.from(subjects.values())};
    for(let i = 0; i < userPlan.subjects.length; i++){
      if(userPlan.subjects[i].id < 0){
        userPlan.subjects[i].id = 0;
      }
    }
    postUserPlan(userPlan).then(()=>{
      setIsPlanEdited(false);
    });
  }

  const addSubject = () => {
    setSubjects(prevState => {
      const newState: Map<number, UserSubject> = new Map(prevState);
      newState.set(-(prevState.size), {
        id: -(prevState.size),
        name: "",
        ects: 0,
      })
      return newState;
    });
    setIsPlanEdited(true);
  }

  const deleteSubject = (id: number) => {
    setSubjects(prevState => {
      const newState: Map<number, UserSubject> = new Map(prevState);
      newState.delete(id);
      return newState;
    });
    setIsPlanEdited(true);
  }

  const changeSubjectName = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setSubjects(prevState => {
      const newState: Map<number, UserSubject> = new Map(prevState);
      newState.get(id)!.name = event.target.value;
      return newState;
    });
    setIsPlanEdited(true);
  }

  const changeEcts = (event: number|null, id: number) => {
    setSubjects(prevState => {
      const newState: Map<number, UserSubject> = new Map(prevState);
      newState.get(id)!.ects = event!;
      return newState;
    });
    setIsPlanEdited(true);
  }


  return <SubjectsPage
    subjects={subjects}
    isPlanEdited={isPlanEdited}
    loading={loading}
    saveUserPlan={saveUserPlan}
    addSubject={addSubject}
    deleteSubject={deleteSubject}
    changeSubjectName={changeSubjectName}
    changeEcts={changeEcts}
  />;
}

export default SubjectsPageContainer;