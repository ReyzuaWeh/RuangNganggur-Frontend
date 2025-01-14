import { RoleType } from "./khusus";

interface UserFormInterface {
    username: string,
    email?: string | null,
    password: string,
    role: RoleType,
}
interface EmployerFormInterface extends UserFormInterface {
    company_name: string,
}

interface JobSeekerFormInterface extends UserFormInterface {
    first_name: string,
    last_name?: string | null,
    nis: string,
}
export type { EmployerFormInterface, JobSeekerFormInterface, UserFormInterface };
