import { serverClient } from "./AxiosUtils";

const getDistanceBetweenOriginAndDestination = ({ originPlaceId, destinationPlaceId }) => {
    return serverClient({
        url: "/googlePlaces/getDistanceBetweenOriginAndDestination",
        method: "GET",
        params: {
            originPlaceId,
            destinationPlaceId,
        },
    });
};

export default {
    getDistanceBetweenOriginAndDestination,
};
