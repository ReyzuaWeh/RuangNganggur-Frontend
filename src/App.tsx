import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import Auth from "@pages/Auth";
import CompanyListing from "@pages/Company";
import DetailUser from "@pages/DetailUser";
import ForgetPassword from "@pages/ForgetPassword";
import JobAndApplicants from "@pages/JobandApplicants";
import LoginInterface from "@pages/Login";
import Profile from "@pages/Profile";
import Register from "@pages/Register";
import Settings from "@pages/Setting";
import Success from "@pages/Success";
import DetailFormApplicant from "@pages/admin/DetailFormApplicantAdmin";
import DetailFormJobAdmin from "@pages/admin/DetailFormJobAdmin";
import ListApplicantAdmin from "@pages/admin/ListApplicantAdmin";
import ListJobAdmin from "@pages/admin/ListJobAdmin";
import ListUserAdmin from "@pages/admin/ListUserAdmin";
import UserDetailAdmin from "@pages/admin/UserDetailAdmin";
import { default as Applicant } from "@pages/employer/Applicant";
import EmployeeJobPosting from "@pages/employer/JobPosting";
import MyJobList from "@pages/employer/MyJobList";
import Applied from "@pages/jobseeker/Applied";
import Job from "@pages/jobseeker/Job";
import About from "@pages/jobseeker/about/About";
import { ProfileProvider } from "@provider/userProvider";
import OurRoute from "@utils/route";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path={OurRoute.DataRouteApp["Register"]} element={<Auth />} />
        <Route path={OurRoute.DataRouteApp["Login"]} element={<LoginInterface />} />
        <Route path={`${OurRoute.DataRouteApp["Register Role"]}:wanna_be`} element={<Register />} />
        <Route path={OurRoute.DataRouteApp["Success Login"]} element={<Success />} />
        {/* Landing Page */}
        <Route path={OurRoute.DataRouteApp["About"]} element={<About />} />
        <Route path={OurRoute.DataRouteApp["Job List"]} element={<Job />} />
        <Route path={OurRoute.DataRouteApp["Company List"]} element={<CompanyListing />} />
        {/* Employee Dashboard */}
        <Route path={OurRoute.DataRouteApp["Forget Password"]} element={<ForgetPassword />} />
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
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Job Detail Form"]}/:id`} element={<EmployeeJobPosting />} />
                <Route path={OurRoute.DataRouteApp["RequireAuthPath"]["Applier List"]} element={<Applicant />} />
                {/* Admin Dashboard */}
                <Route path={OurRoute.DataRouteApp["RequireAuthPath"]["Admin List User"]} element={<ListUserAdmin />} />
                <Route path={OurRoute.DataRouteApp["RequireAuthPath"]["Admin Create User"]} element={<UserDetailAdmin />} />
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Admin Detail User"]}`} element={<UserDetailAdmin />} />
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Admin List Job"]}`} element={<ListJobAdmin />} />
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Admin Create Job"]}`} element={<DetailFormJobAdmin />} />
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Admin Detail Job"]}`} element={<DetailFormJobAdmin />} />
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Admin List Applicant"]}`} element={<ListApplicantAdmin />} />
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Admin Create Applicant"]}`} element={<DetailFormApplicant />} />
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Admin Detail Applicant"]}`} element={<DetailFormApplicant />} />
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Job and Applicants"]}`} element={<JobAndApplicants />} />
                {/* View User Detail */}
                <Route path={`${OurRoute.DataRouteApp["RequireAuthPath"]["Detail User"]}`} element={<DetailUser />} />
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
