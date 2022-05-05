import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CompetencyAllowanceForm from "../components/CreateAllowanceClaim/CompetencyAllowanceForm";
import TravelAllowanceForm from "../components/CreateAllowanceClaim/TravelAllowanceForm";
import OtherAllowanceForm from "../components/CreateAllowanceClaim/OtherAllowanceClaim";
import useAuth from "../CustomHooks/useAuth";

const AddAllowanceClaim = () => {
    const [tabActiveIndex, setTabActiveIndex] = useState(0);
    const { user } = useAuth();
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5 className="mb-4">Create Allowance Claim</h5>
                    <TabView activeIndex={tabActiveIndex} onTabChange={(e) => setTabActiveIndex(e.index)}>
                        <TabPanel header="Competency">
                            <CompetencyAllowanceForm user={user} />
                        </TabPanel>
                        <TabPanel header="Travel">
                            <TravelAllowanceForm user={user} />
                        </TabPanel>
                        <TabPanel header="Others">
                            <OtherAllowanceForm user={user} />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AddAllowanceClaim);
