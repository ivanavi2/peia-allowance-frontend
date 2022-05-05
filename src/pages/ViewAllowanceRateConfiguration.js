import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CompetencyAllowanceRate from "../components/ViewAllowanceRateConfiguration/CompetencyAllowanceRate";
import TravelAllowanceRate from "../components/ViewAllowanceRateConfiguration/TravelAllowanceRate";

const ViewAllowanceRateConfiguration = () => {
    const [tabActiveIndex, setTabActiveIndex] = useState(0);

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>View Allowance Rate Configuration</h5>
                    <TabView activeIndex={tabActiveIndex} onTabChange={(e) => setTabActiveIndex(e.index)}>
                        <TabPanel header="Competency">
                            <CompetencyAllowanceRate />
                        </TabPanel>
                        <TabPanel header="Travel">
                            <TravelAllowanceRate />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default ViewAllowanceRateConfiguration;
