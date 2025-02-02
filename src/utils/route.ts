const DataRoute = {
    "Home": "/",
    "About": "/",
    "Job List": "/job-listing",
    "Login": "/auth/login",
    "Success Login": "/auth/success",
    "Register": "/auth",
    "Register Role": "/auth/register/",
    "Applied": "/users/job-applied",
    "Setting": "/users/settings",
    "Job Posting": "/users/employer/job-posting",
    "Job Detail Form": "/users/employer/job-detail",
    "Applier List": "/users/employer/applier-list",
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
    "Auth Require Route Parent": "/users/*",
    "RequireAuthPath": {
        "Profile": "/profile",
        "Job Posting": "/employer/job-posting",
        "Job Detail Form": "/employer/job-detail",
        "Applier List": "/employer/applier-list",
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