import FileUploadService from "../service/FileUploadService";

const handleAttachmentUpload = async (files) => {
    try {
        const acceptedFileExtensions = ["png", "jpeg", "jpg", "pdf"];

        if (files.length > 3) {
            return {
                status: false,
                summary: "Exceeded maximum files uploaded",
                detail: "Only a maximum of 3 files can be uploaded",
            };
        }

        const {
            data: { timestamp, signature },
        } = await FileUploadService.getSignature();

        /* onst {
            data: { timestamp, signature, userId },
        } = await FileUploadService.getSignature(); */

        const uploadedAttachments = await Promise.all(
            files.map((file) => {
                return new Promise(async (resolve, reject) => {
                    const extension = file.name.split(".")[1];
                    if (!acceptedFileExtensions.includes(extension.toLowerCase())) {
                        return {
                            status: false,
                            summary: "Please upload files with the supported format",
                            detail: "Only .jpeg, .jpg, .png, .pdf files are supported",
                        };
                    }
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("signature", signature);
                    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
                    formData.append("timestamp", timestamp);
                    //formData.append("folder", userId);

                    FileUploadService.uploadToCloudinary(formData)
                        .then(({ data }) => {
                            resolve(data);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            })
        );

        return {
            status: true,
            attachments: uploadedAttachments,
        };
    } catch (error) {
        throw error;
    }
};

export default handleAttachmentUpload;
