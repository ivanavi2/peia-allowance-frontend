import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CompetencyAllowanceForm from "../components/CreateAllowanceClaim/CompetencyAllowanceForm";
import TravelAllowanceForm from "../components/CreateAllowanceClaim/TravelAllowanceForm";
import OtherAllowanceForm from "../components/CreateAllowanceClaim/OtherAllowanceClaim";
import UnlockAccess from "../components/UnlockAccess";

const AddAllowanceClaim = () => {
    const [tabActiveIndex, setTabActiveIndex] = useState(0);
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5 className="mb-4">Create Allowance Claim</h5>
                    <TabView activeIndex={tabActiveIndex} onTabChange={(e) => setTabActiveIndex(e.index)}>
                        <TabPanel header="Competency">
                            <CompetencyAllowanceForm />
                        </TabPanel>
                        <TabPanel header="Travel">
                            <TravelAllowanceForm />
                        </TabPanel>
                        <TabPanel header="Others">
                            <OtherAllowanceForm />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AddAllowanceClaim);
