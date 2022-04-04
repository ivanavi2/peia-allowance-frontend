import GooglePlacesService from "../service/GooglePlacesService";

const fetchDistance = async (placesId, fieldName) => {
    try {
        const results = [];
        const [homePlaceId, schoolPlaceId, invigilationCenterPlaceId, examinationVaultPlaceId] = placesId;
        if (fieldName === "homeAddress.address") {
            if (invigilationCenterPlaceId) {
                const {
                    data: { distance },
                } = await GooglePlacesService.getDistanceBetweenOriginAndDestination({ originPlaceId: homePlaceId, destinationPlaceId: invigilationCenterPlaceId });
                results.push({
                    setDistanceFieldName: "distanceBetweenHomeAndInvigilationCenter",
                    distance,
                });
            }
            if (examinationVaultPlaceId) {
                const {
                    data: { distance },
                } = await GooglePlacesService.getDistanceBetweenOriginAndDestination({ originPlaceId: homePlaceId, destinationPlaceId: examinationVaultPlaceId });
                results.push({
                    setDistanceFieldName: "distanceBetweenHomeAndExaminationVault",
                    distance,
                });
            }
            return results;
        }
        if (fieldName === "schoolAddress.address") {
            if (invigilationCenterPlaceId) {
                const {
                    data: { distance },
                } = await GooglePlacesService.getDistanceBetweenOriginAndDestination({ originPlaceId: schoolPlaceId, destinationPlaceId: invigilationCenterPlaceId });
                results.push({
                    setDistanceFieldName: "distanceBetweenSchoolAndInvigilationCenter",
                    distance,
                });
            }
            if (examinationVaultPlaceId) {
                const {
                    data: { distance },
                } = await GooglePlacesService.getDistanceBetweenOriginAndDestination({ originPlaceId: schoolPlaceId, destinationPlaceId: examinationVaultPlaceId });
                results.push({
                    setDistanceFieldName: "distanceBetweenSchoolAndExaminationVault",
                    distance,
                });
            }
            return results;
        }
        if (fieldName === "invigilationCenterAddress.address") {
            if (homePlaceId) {
                const {
                    data: { distance },
                } = await GooglePlacesService.getDistanceBetweenOriginAndDestination({ originPlaceId: homePlaceId, destinationPlaceId: invigilationCenterPlaceId });
                results.push({
                    setDistanceFieldName: "distanceBetweenHomeAndInvigilationCenter",
                    distance,
                });
            }
            if (schoolPlaceId) {
                const {
                    data: { distance },
                } = await GooglePlacesService.getDistanceBetweenOriginAndDestination({ originPlaceId: schoolPlaceId, destinationPlaceId: invigilationCenterPlaceId });
                results.push({
                    setDistanceFieldName: "distanceBetweenSchoolAndInvigilationCenter",
                    distance,
                });
            }
            return results;
        }
        if (fieldName === "examinationVaultAddress.address") {
            if (homePlaceId) {
                const {
                    data: { distance },
                } = await GooglePlacesService.getDistanceBetweenOriginAndDestination({ originPlaceId: homePlaceId, destinationPlaceId: examinationVaultPlaceId });
                results.push({
                    setDistanceFieldName: "distanceBetweenHomeAndExaminationVault",
                    distance,
                });
            }
            if (schoolPlaceId) {
                const {
                    data: { distance },
                } = await GooglePlacesService.getDistanceBetweenOriginAndDestination({ originPlaceId: schoolPlaceId, destinationPlaceId: examinationVaultPlaceId });
                results.push({
                    setDistanceFieldName: "distanceBetweenSchoolAndExaminationVault",
                    distance,
                });
            }
            return results;
        }
        return [];
    } catch (error) {
        console.log(error?.message);
    }
};

export default fetchDistance;
