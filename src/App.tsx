import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
// Redux
import { useAppSelector } from "storage/redux/hooks";
import { RootState } from "storage/redux/store";
// Ant Design
import { Footer } from "antd/lib/layout/layout";
import { message } from "antd";
// Styles
import "./App.scss";
// Components
import LocationEventHandler from "components/LocationEventHandler";
import Navbar from "components/nav/Navbar";
import Unauthorized from "components/Unauthorized";
import NotFound from "components/NotFound";
import ListPageContainer from "pages/list/ListPageContainer";
import ProfilePageContainer from "pages/profile/ProfilePageContainer";
import HomePage from "pages/home/HomePage";
import DestinationDetailsPageContainer from "pages/destination-details/DestinationDetailsPageContainer";
import NotesPageContainer from "pages/notes/NotesPageContainer";
import NoteViewPageContainer from "pages/note-view/NoteViewPageContainer";
import PlansPageContainer from "pages/plans/PlansPageContainer";
import SubjectsPageContainer from "pages/subjects/SubjectsPageContainer";
import AppContext, { AppContextState } from "storage/context/antContext";
import EasterEggContainer from "pages/easter-egg/EasterEggContainer";

function App() {
  const { userLoggedIn } = useAppSelector((state: RootState) => state.login);
  const [messageApi, contextHolder] = message.useMessage();

  const appContextState: AppContextState = {
    messageApi,
  };

  return (
    <div className="app">
      {contextHolder}
      <AppContext.Provider value={appContextState}>
        <Router>
          <Navbar />
          <div className="layout">
            <Routes>
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/list" element={<ListPageContainer />} />
              <Route path="/list/:id" element={<DestinationDetailsPageContainer />} />
              <Route path="/profile" element={userLoggedIn ? <ProfilePageContainer /> : <Unauthorized />} />
              <Route path="/notes" element={userLoggedIn ? <NotesPageContainer /> : <Unauthorized />} />
              <Route path="/notes/edit" element={userLoggedIn ? <NoteViewPageContainer /> : <Unauthorized />} />
              <Route path="/notes/edit/:id" element={userLoggedIn ? <NoteViewPageContainer /> : <Unauthorized />} />
              <Route path="/plans/" element={userLoggedIn ? <PlansPageContainer isCoordinator={false} /> : <Unauthorized />} />
              <Route path="/plans/:id" element={userLoggedIn ? <PlansPageContainer isCoordinator={false} /> : <Unauthorized />} />
              <Route path="/plans/coordinator/" element={userLoggedIn ? <PlansPageContainer isCoordinator={true} /> : <Unauthorized />} />
              <Route path="/plans/coordinator/:id" element={userLoggedIn ? <PlansPageContainer isCoordinator={true} /> : <Unauthorized />} />
              <Route path="/subjects" element={userLoggedIn ? <SubjectsPageContainer /> : <Unauthorized />} />
              <Route path="/easter-egg" element={userLoggedIn ? <EasterEggContainer /> : <Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer style={{ textAlign: "center" }}>Szampon Inc. Erasmus Sign-up</Footer>
          </div>
          <LocationEventHandler />
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
