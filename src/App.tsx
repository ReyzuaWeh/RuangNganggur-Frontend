import Auth from "@pages/Auth";
import LoginInterface from "@pages/Login";
import Register from "@pages/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Home from './pages/employee/home/Home';
import NotFound from "@components/NotFound";
import Logout from "@pages/Logout";
import Success from "@pages/Success";
// import Landing from './pages/landing/Layout';
import Profile from "@/pages/users/Profile";
import About from "@pages/jobseeker/about/About";
import Applied from "@pages/jobseeker/applied/Applied";
import Job from "@pages/jobseeker/job/Job";
import Settings from "@pages/jobseeker/settings/Setting";
import Applicant from "@pages/landing/jobseeker/applicant/Applicant";
// import Applicant from './pages/employee/applicant/Applicant';
// import Job from './pages/employee/job/Job';

import Loading from "@components/Loading";
import EmployeeApplicant from "@pages/employer/applicant/Applicant";
import EmployeeCompany from "@pages/employer/company/Company";
import EmployeeJobPosting from "@pages/employer/jobposting/JobPosting";
import EmployeeSettings from "@pages/employer/settings/Setting";
import OurRoute from "@utils/route";
import { ProfileProvider } from "./components/provider/userProvider";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path={OurRoute.DataRoute["Register"]} element={<Auth />}></Route>
        <Route path={OurRoute.DataRoute["Login"]} element={<LoginInterface />}></Route>
        <Route path={`${OurRoute.DataRoute["Register Role"]}:wanna_be`} element={<Register />}></Route>
        {/* <Route path="/auth/register/employer" element={<EmployeeeRegister />}></Route> */}
        <Route path={OurRoute.DataRoute["Logout"]} element={<Logout />}></Route>
        <Route path={OurRoute.DataRoute["Success Login"]} element={<Success />}></Route>


        {/* Landing Job Seeker */}
        <Route path={OurRoute.DataRoute["About"]} element={<About />}></Route>
        <Route path="/applicant-list" element={<Applicant />}></Route>
        <Route path={OurRoute.DataRoute["Job List"]} element={<Job />}></Route>
        {/* Job Seeker Dashboard */}
        <Route path={OurRoute.DataRoute["Applied"]} element={<Applied />}></Route>
        <Route path={OurRoute.DataRoute["Setting"]} element={<Settings />}></Route>

        {/* Employee Dashboard */}
        <Route path={OurRoute.DataRoute["Job Posting"]} element={<EmployeeJobPosting />}></Route>
        <Route path="/users/employee/job-applicant" element={<EmployeeApplicant />}></Route>
        <Route path="/users/employee/company" element={<EmployeeCompany />}></Route>
        <Route path="/users/employee/settings" element={<EmployeeSettings />}></Route>
        <Route path="/loading" element={<Loading />}></Route>
        <Route
          path="/users/*"
          element={
            <ProfileProvider>
              <Routes>
                {/* Dashboard All Role */}
                <Route path="/profile" element={<Profile />}></Route>
                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </ProfileProvider>
          }
        />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
