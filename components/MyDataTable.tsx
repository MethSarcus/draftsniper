import DataTable, { TableColumn } from 'react-data-table-component';
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
            data={data.picks.map((pick: DraftPick) => {
                return {id: pick.picked_by + "_" + pick.player_id + "_" + pick.draft_id,
                 pick: pick.pick_no, player: pick.metadata.first_name + " " + pick.metadata.last_name};
            })}
            conditionalRowStyles={conditionalRowStyles}
        />
    );
};

export default MyDataTable;