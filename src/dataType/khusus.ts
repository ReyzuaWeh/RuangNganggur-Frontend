enum RoleType {
    admin = "admin",
    employer = "employer",
    jobseeker = "jobseeker"
}
enum JobType {
    full_time = "full_time",
    part_time = "part_time",
    internship = "internship",
    contract = "contract"
}
enum GenderType {
    male = "male",
    female = "female",
}
enum StatusAplicantType {
    process = "process",
    hold = "hold",
    accepted = "accepted",
    rejected = "rejected"
}
type handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void
const ValidRequireMSG = "Field required"
const ValidValueError = "Value error, "
export { GenderType, JobType, RoleType, StatusAplicantType, ValidRequireMSG, ValidValueError };
export type { handleChangeType };

