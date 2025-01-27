import { GenderType, JobType, RoleType, StatusAplicantType } from './khusus';
interface DataOutEmployer {
    id?: number;
    company_name: string;
    company_description?: string | null;
    company_phone_number?: string | null;
    company_address?: string | null;
    company_vision?: string | null;
    company_mission?: string | null;
}
interface DataOutJobseeker {
    id?: number;
    first_name: string;
    last_name?: string | null;
    nis: string;
    graduate_year?: number | null;
    phone_number?: string | null;
    resume?: string | null;
    cv?: string | null;
    portfolio?: string | null;
    skills?: string | null;
}
interface DataOutUser {
    id?: number;
    username: string;
    password: string;
    email?: string | null;
    role: RoleType;
    image?: string | null;
    registered_at: Date;
    disabled: boolean;
    employer?: DataOutEmployer | null;
    jobseeker?: DataOutJobseeker | null;
}

interface DataOutJob {
    id?: number;
    employer_id?: number;
    role: string;
    location: string;
    salary: number;
    type_job?: JobType | null;
    min_age?: number | null;
    max_age?: number | null;
    gender?: GenderType | null;
    open_date: Date;
    close_date?: Date | null;
    description?: string | null;
}

interface DataOutApplicant {
    id?: number;
    job_id?: number;
    jobseeker_id?: number;
    jobletter?: string | null;
    status: StatusAplicantType;
    applied_at: Date;
}

interface LoginInterface {
    username: string;
    password: string;
}

interface DataOutToken {
    access_token: string;
    token_type: string;
    refresh_token: string;
}
interface Validation422 {
    loc: string[],
    msg: string,
    type: string
}
interface ErrorValidation {
    detail: string | Validation422[]
}

export type {
    DataOutApplicant,
    DataOutEmployer,
    DataOutJob,
    DataOutJobseeker,
    DataOutToken,
    DataOutUser,
    ErrorValidation,
    LoginInterface
};

