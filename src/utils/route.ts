const DataRoute = {
    "Home": "/",
    "About": "/",
    "Job List": "/job-listing",
    "Login": "/auth/login",
    "Success Login": "/auth/success",
    "Register": "/auth",
    "Register Role": "/auth/register/",
    "Setting": "/users/settings",
    "Profile": "/users/profile",
    "Detail User": "/users/detail/",
    "My Job Post": "/users/employer/my-jobs",
    "Admin List User": "/users/admin/list-user",
    "Admin Create User": "/users/admin/create-user",
    "Admin Detail User": "/users/admin/detail-user/",
    "Admin List Job": "/users/admin/list-job",
    "Admin Create Job": "/users/admin/create-job",
    "Admin Detail Job": "/users/admin/detail-job/",
    "Admin List Applicant": "/users/admin/list-applicant",
    "Job Posting": "/users/employer/job-posting",
    "Job Detail Form": "/users/employer/job-detail",
    "Applier List": "/users/employer/applier-list",
    "Applied": "/users/jobseeker/job-applied",
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
        "Applied": "/jobseeker/job-applied",
        "Job Posting": "/employer/job-posting",
        "Job Detail Form": "/employer/job-detail",
        "Applier List": "/employer/applier-list",
        "My Job Post": "/employer/my-jobs",
        "Admin List User": "/admin/list-user",
        "Admin Create User": "/admin/create-user",
        "Admin Detail User": "/admin/detail-user/:id",
        "Admin List Job": "/admin/list-job",
        "Admin Create Job": "/admin/create-job",
        "Admin Detail Job": "/admin/detail-job/:id",
        "Admin List Applicant": "/admin/list-applicant",
        "Detail User": "/detail/:id"
    }
}
const OurRoute = {
    DataRoute,
    DataRouteApp
}
export default OurRoute