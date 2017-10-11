import iData from "./idata.js";
import mData from "./mdata.js";

// create app instance with an authorized app handle
export default (handle, auth) => {

    return Object.freeze({
        meta: {},
        handle: handle,
        auth: auth,
        idata: iData(handle),
        mdata: mData(handle)
    });
};
