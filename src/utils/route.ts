const DataRoute = {
    "Home": "/",
    "About": "/",
    "Job List": "/job-listing",
    "Login": "/auth/login",
    "Success Login": "/auth/success",
    "Register": "/auth",
    "Register Role": "/auth/register/",
    "Logout": "/auth/logout",
    "Applied": "/users/job-applied",
    "Setting": "/users/settings",
    "Job Posting": "/users/employer/job-posting",
    "Profile": "/users/profile",
    "My Job Post": "/users/my-jobs"
}
const DataRouteApp = {
    "Home": "/",
    "About": "/",
    "Job List": "/job-listing",
    "Login": "/auth/login",
    "Success Login": "/auth/success",
    "Register": "/auth",
    "Register Role": "/auth/register/",
    "Logout": "/auth/logout",
    "Auth Require Route Parent": "/users/*",
    "RequireAuthPath": {
        "Profile": "/profile",
        "Job Posting": "/employer/job-posting",
        "Setting": "/settings",
        "Applied": "/job-applied",
        "My Job Post": "/my-jobs"
    }
}
const OurRoute = {
    DataRoute,
    DataRouteApp
}
export default OurRoute