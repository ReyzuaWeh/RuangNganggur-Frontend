import { RouterPATHType } from '@dataType/basic';
const isHTTPS: boolean = window.location.protocol === 'https:';
const main_route: RouterPATHType = isHTTPS ? 'https://ruang-nganggur-fast-api.vercel.app' : 'http://localhost:8000';

const api_route = {
    main_route,
    users_route: `${main_route}/users`,
    auth_route: `${main_route}/auth`,
    profile_route: `${main_route}/users/profile`,
    jobs_route: `${main_route}/jobs`,
    applicants_route: `${main_route}/applicants`,
    pembukuan_route: `${main_route}/pembukuan`,
};
export default api_route;
