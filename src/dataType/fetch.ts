import { GenderType, JobPhase, JobType, RoleType, StatusAplicantType } from './khusus';
interface DataOutEmployer {
    id?: number;
    company_name: string;
    company_description?: string | null;
    company_phone_number?: string | null;
    company_address?: string | null;
    company_vision?: string | null;
    company_mission?: string | null;
    employer_name?: string | null;
    employer_phone_number?: string | null;
    employer_email?: string | null;
    employer_position?: string | null;
}
interface DataOutJobseeker {
    id?: number;
    first_name: string;
    last_name?: string | null;
    nis: string;
    graduate_year?: number | null;
    phone_number?: string | null;
    resume?: string | null;
    resume_file?: string | null;
    resume_name?: string | null;
    cv?: string | null;
    cv_file?: string | null;
    cv_name?: string | null;
    portfolio?: string | null;
    portfolio_file?: string | null;
    portfolio_name?: string | null;
    skills?: string | null;
}

interface DataOutUser {
    id?: number;
    username: string;
    password: string;
    email: string | null;
    role: RoleType;
    image?: string | null;
    image_file?: string | null;
    image_name?: string | null;
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
    salary?: number | null;
    type_job?: JobType | null;
    min_age?: number | null;
    max_age?: number | null;
    gender?: GenderType | null;
    open_date: Date;
    close_date?: Date | null;
    description?: string | null;
    result?: string | null,
    result_file?: string | null;
    result_name?: string | null;
    job_phase?: JobPhase | null,
    employer?: {
        id: number
        company_name: string
    } | null;
    applicants?: DataOutApplicant[] | null
}
interface DataLogsRegister {
    id: number
    user_id: number
    action: string
    timestamp: Date
    users: DataOutUser
}

interface DataOutApplicant {
    id?: number;
    job_id?: number;
    jobseeker_id?: number;
    jobletter?: string | null;
    jobletter_file?: string | null;
    jobletter_name?: string | null;
    status: StatusAplicantType;
    applied_at: Date;
    jobseeker?: {
        first_name: string
        last_name: string | null
    } | null
    job?: {
        id: number
        role: string
        job_phase: JobPhase
        result?: string | null,
    } | null
}

interface ForgetPasswordForm {
    username: string
    email: string
    role: RoleType
    new_password: string
    confirm_password: string
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
    DataLogsRegister,
    DataOutApplicant,
    DataOutEmployer,
    DataOutJob,
    DataOutJobseeker,
    DataOutToken,
    DataOutUser,
    ErrorValidation,
    ForgetPasswordForm,
    LoginInterface
};

