import type { setDispatch } from "../types/global";
import ax from "./axiosInterceptor";

const getInfo = <T = unknown,>(setInfo:setDispatch<T>,link:string) => () => {

    const getData = async () => {
      const res:T = await ax.get(link);

      setInfo(res);
    }

    getData();

    return getData;
}

export default getInfo;