import Auth from "@pages/Auth";
import LoginInterface from "@pages/Login";
import Register from "@pages/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Home from './pages/employee/home/Home';
import NotFound from "@components/NotFound";
import Logout from "@pages/Logout";
import Success from "@pages/Success";
// import Landing from './pages/landing/Layout';
import Profile from "@pages/Profile";
import About from "@pages/jobseeker/about/About";
import Applied from "@pages/jobseeker/applied/Applied";
import Job from "@pages/jobseeker/job/Job";
import Settings from "@pages/users/Setting";
// import Applicant from './pages/employee/applicant/Applicant';
// import Job from './pages/employee/job/Job';

import Loading from "@components/Loading";
import MyJobList from "@pages/employer/MyJobList";
import EmployeeApplicant from "@pages/employer/applicant/Applicant";
import EmployeeCompany from "@pages/employer/company/Company";
import EmployeeJobPosting from "@pages/employer/jobposting/JobPosting";
import EmployeeSettings from "@pages/employer/settings/Setting";
import { ProfileProvider } from "@provider/userProvider";
import OurRoute from "@utils/route";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path={OurRoute.DataRouteApp["Register"]} element={<Auth />} />
        <Route path={OurRoute.DataRouteApp["Login"]} element={<LoginInterface />} />
        <Route path={`${OurRoute.DataRouteApp["Register Role"]}:wanna_be`} element={<Register />} />

        {/* <Route path="/auth/register/employer" element={<EmployeeeRegister />}/> */}
        <Route path={OurRoute.DataRouteApp["Logout"]} element={<Logout />} />
        <Route path={OurRoute.DataRouteApp["Success Login"]} element={<Success />} />

        {/* Landing Job Seeker */}
        <Route path={OurRoute.DataRouteApp["About"]} element={<About />} />
        <Route path={OurRoute.DataRouteApp["Job List"]} element={<Job />} />


        {/* Employee Dashboard */}
        <Route path="/users/employee/job-applicant" element={<EmployeeApplicant />} />
        <Route path="/users/employee/company" element={<EmployeeCompany />} />
        <Route path="/users/employee/settings" element={<EmployeeSettings />} />
        <Route path="/loading" element={<Loading />} />
        {/* Require Login */}
        <Route
          path={OurRoute.DataRouteApp["Auth Require Route Parent"]}
          element={
            <ProfileProvider>
              <Routes>
                {/* Dashboard All Role */}
                <Route path={OurRoute.DataRouteApp["RequireAuthPath"]["Profile"]} element={<Profile />} />
                {/* Job Seeker Dashboard */}
                <Route path={OurRoute.DataRouteApp["RequireAuthPath"]["Applied"]} element={<Applied />} />
                <Route path={OurRoute.DataRouteApp["RequireAuthPath"]["Setting"]} element={<Settings />} />
                {/* Employer Dashboard */}
                <Route path={OurRoute.DataRouteApp["RequireAuthPath"]["My Job Post"]} element={<MyJobList />} />
                <Route path={OurRoute.DataRouteApp["RequireAuthPath"]["Job Posting"]} element={<EmployeeJobPosting />} />
                {/* 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProfileProvider>
          }
        />
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
