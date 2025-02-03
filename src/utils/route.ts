const DataRoute = {
    "Home": "/",
    "About": "/",
    "Job List": "/job-listing",
    "Login": "/auth/login",
    "Success Login": "/auth/success",
    "Register": "/auth",
    "Register Role": "/auth/register/",
    "Applied": "/users/jobseeker/job-applied",
    "Setting": "/users/settings",
    "Job Posting": "/users/employer/job-posting",
    "Job Detail Form": "/users/employer/job-detail",
    "Applier List": "/users/employer/applier-list",
    "Profile": "/users/profile",
    "My Job Post": "/users/employer/my-jobs",
    "Admin Create User": "/users/admin/create-user",
    "Admin Detail User": "/users/admin/detail-user/"
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
        "Setting": "/settings",
        "Job Posting": "/employer/job-posting",
        "Job Detail Form": "/employer/job-detail",
        "Applier List": "/employer/applier-list",
        "Applied": "/jobseeker/job-applied",
        "My Job Post": "/employer/my-jobs",
        "Admin Create User": "/admin/create-user",
        "Admin Detail User": "/admin/detail-user/:id"
    }
}
const OurRoute = {
    DataRoute,
    DataRouteApp
}
export default OurRoute