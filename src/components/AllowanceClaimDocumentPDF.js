import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, Canvas } from "@react-pdf/renderer";
import { format } from "date-fns";

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    headerImage: {
        alignSelf: "center",
        height: "150px",
        width: "50vw",
    },
    text: {
        fontSize: 12,
        marginBottom: 2,
    },
    row: {
        flexDirection: "row",
    },
    columnLabel: {
        fontSize: 12,
        flexBasis: "250px",
        border: "1px solid black",
        padding: 4,
    },
    columnContent: {
        padding: 4,
        flexBasis: "100%",
        fontSize: 12,
        border: "1px solid black",
    },
});

const headerImageUrl = "https://res.cloudinary.com/dtqoaflek/image/upload/v1652369243/jpnj_k8nsb8.jpg";

// Create Document Component
const AllowanceClaimDocumentPDF = ({ allowanceClaim, invigilator }) => {
    const createdAtDateTime = new Date(allowanceClaim.createdAt);
    const updatedAtDateTime = new Date(allowanceClaim.updatedAt);
    const statusLabel = {
        0: {
            label: "Rejected",
        },
        1: {
            label: "Pending",
        },
        2: {
            label: "Approved",
        },
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image src={headerImageUrl} style={styles.headerImage} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>
                        <p>
                            {`This is a report to show that the allowance claim with ID: ${allowanceClaim._id} created at ${format(
                                createdAtDateTime,
                                "dd/MM/yyyy hh:mm aa"
                            )} and last updated at ${format(updatedAtDateTime, "dd/MM/yyyy hh:mm aa")}`}
                            {` is ${statusLabel[allowanceClaim.status].label.toLowerCase()}`}
                        </p>
                    </Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.columnLabel}>Allowance Type: </Text>
                        <Text style={styles.columnContent}>{allowanceClaim.allowanceType}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnLabel}>Total Claimed (MYR): </Text>
                        <Text style={styles.columnContent}>{allowanceClaim.totalAllowance}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnLabel}>Applicant Name: </Text>
                        <Text style={styles.columnContent}>{invigilator.teacherName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnLabel}>Applicant Phone Number: </Text>
                        <Text style={styles.columnContent}>{invigilator.teacherPhoneNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnLabel}>Examination: </Text>
                        <Text style={styles.columnContent}>{allowanceClaim.examination.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnLabel}>Examination Year: </Text>
                        <Text style={styles.columnContent}>{allowanceClaim.examination.year}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.columnLabel}>Examination Session: </Text>
                        <Text style={styles.columnContent}>{allowanceClaim.examination.session}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Canvas
                        style={{ height: 30, width: 250 }}
                        paint={(painter) => {
                            painter
                                .moveTo(0, 20) // set the current point
                                .lineTo(230, 20) // draw a line
                                .stroke();
                        }}
                    />
                    <Text style={styles.text}>(Your signature here)</Text>
                    <Text style={styles.text}>Name: </Text>
                    <Text style={styles.text}>Date: </Text>
                </View>
            </Page>
        </Document>
    );
};

export default AllowanceClaimDocumentPDF;
