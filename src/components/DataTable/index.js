import React from "react";

import { DataTable as PrimeReactDataTable } from "primereact/datatable";

const DataTable = ({ data, columns, header }) => {
    return (
        <PrimeReactDataTable value={data} paginator rows={10} responsiveLayout="scroll" header={header}>
            {columns}
        </PrimeReactDataTable>
    );
};

export default React.memo(DataTable, (prevProps, nextProps) => {
    return prevProps.data === nextProps.data;
});
