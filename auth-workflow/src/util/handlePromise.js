// export default async function handleApiCall(axiosInstance, config) {
//     try {
//         const res = await axiosInstance(config);
//         return {ok: true, res}
//     } catch (err) {
//         return {ok: false, err}
//     }
   
// }

export default async function handlePromise(promise) {
    try {
        const response = await promise;
        return {ok: true, response}
    } catch (error) {
        return {ok: false, error}
    }
}