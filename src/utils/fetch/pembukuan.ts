import api_route from "@api/api";
import { HttpMethod } from "@dataType/basic";
import fetchUser from "./users";

const getPembukuan = async (tahun_awal: number, tahun_akhir: number) => {
    const response = await fetchUser.handleRequest({
        route: `${api_route.pembukuan_route}/job/${tahun_awal}/${tahun_akhir}`,
        method: HttpMethod.GET,
    }, true);
    if (!response.ok) throw response;
    return response;
}

const fetchPembukuan = {
    getPembukuan
}
export default fetchPembukuan