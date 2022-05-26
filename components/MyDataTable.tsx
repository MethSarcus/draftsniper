import DataTable, { ExpanderComponentProps, TableColumn } from 'react-data-table-component';
import { CombinedDraftPick, DraftPick } from '../interfaces/sleeper_api/DraftPick';
import React from "react";
import { useContext } from "react";
import useSWR from "swr";
import { Context } from "../contexts/Context";
import axios from 'axios';

interface DataRow {
    pick: number;
    player: string;
}

const columns: TableColumn<DataRow>[] = [
    {
        name: 'Pick',
        selector: row => row.pick,
        sortable: true,
    },
    {
        name: 'Player',
        selector: row => row.player,
        sortable: true,
    }
];




const MyDataTable = (): JSX.Element => {
    const fetcher = (url: string) => axios.get(url).then(res => res.data);
    const [context, setContext] = useContext(Context);
    const { data, error } = useSWR(`/api/picks/${context}`, fetcher)
    // data provides access to your row data
    const ExpandedComponent: React.FC<ExpanderComponentProps<DataRow>> = ({ data }) => {
        return <pre>{JSON.stringify(data, ['pick', 'player', 'picked_by', 'draft_id'], 2)}</pre>;
    };
    const conditionalRowStyles = [
        {
          when: (row: any) => row.id.includes(context),
          style: {
            backgroundColor: 'green',
            color: 'white',
            '&:hover': {
              cursor: 'pointer',
            },
          },
        }
      ];
  
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <DataTable
            columns={columns}
            data={data.picks.map((pick: DraftPick) => formatPickForTable(pick))}
            conditionalRowStyles={conditionalRowStyles}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            dense
        />
    );
};

function formatPickForTable(pick: DraftPick): object {
    return {id: pick.picked_by + "_" + pick.player_id + "_" + pick.draft_id,
    pick: pick.pick_no,
    player: pick.metadata.first_name + " " + pick.metadata.last_name,
    picked_by: pick.picked_by,
    draft_id: pick.draft_id};
}

export default MyDataTable;