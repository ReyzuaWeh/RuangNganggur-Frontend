import Auth from "@pages/Auth";
import LoginInterface from "@pages/Login";
import Register from "@pages/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import Home from './pages/employee/home/Home';
import NotFound from "@components/NotFound";
import Logout from "@pages/Logout";
import Success from "@pages/Success";
// import Landing from './pages/landing/Layout';
import Profile from "@pages/employer/profile/Profile";
import About from "@pages/jobseeker/about/About";
import Applied from "@pages/jobseeker/applied/Applied";
import Job from "@pages/jobseeker/job/Job";
import Settings from "@pages/jobseeker/settings/Setting";
import Applicant from "@pages/landing/jobseeker/applicant/Applicant";
// import Applicant from './pages/employee/applicant/Applicant';
// import Job from './pages/employee/job/Job';

import EmployeeApplicant from "@pages/employer/applicant/Applicant";
import EmployeeCompany from "@pages/employer/company/Company";
import EmployeeJobPosting from "@pages/employer/jobposting/JobPosting";
import EmployeeProfile from "@pages/employer/profile/Profile";
import EmployeeSettings from "@pages/employer/settings/Setting";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}

        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/auth/login" element={<LoginInterface />}></Route>
        <Route path="/auth/register/:wanna_be" element={<Register />}></Route>
        {/* <Route path="/auth/register/employer" element={<EmployeeeRegister />}></Route> */}
        <Route path="/auth/logout" element={<Logout />}></Route>
        <Route path="/auth/success" element={<Success />}></Route>

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />}></Route>

        {/* Landing Job Seeker */}
        <Route path="/" element={<About />}></Route>
        <Route path="/applicant-list" element={<Applicant />}></Route>
        <Route path="/job-listing" element={<Job />}></Route>

        {/* Job Seeker Dashboard */}
        <Route path="/users/profile" element={<Profile />}></Route>
        <Route path="/users/job-applied" element={<Applied />}></Route>
        <Route path="/users/settings" element={<Settings />}></Route>

        {/* Employee Dashboard */}
        <Route path="/users/employee/profile" element={<EmployeeProfile />}></Route>
        <Route path="/users/employee/job-posting" element={<EmployeeJobPosting />}></Route>
        <Route path="/users/employee/job-applicant" element={<EmployeeApplicant />}></Route>
        <Route path="/users/employee/company" element={<EmployeeCompany />}></Route>
        <Route path="/users/employee/settings" element={<EmployeeSettings />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
