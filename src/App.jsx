import VirtualDataTable from "./DataTable/index.jsx";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";


function App() {
    const [data, setData] = useState([])

    const columns = [
        {
            name: 'SL',
            selector: (row, index) => index + 1,
            sortable: false,
        },
        {
            name: 'Title',
            selector: row => row?.title,
            sortable: true,
            sortableKey: "title",
            searchableKey: 'title',
            style: {textTransform: "capitalize"}
        },
        {
            name: 'Status',
            selector: row => row?.completed ? "ok": "Processing",
            sortable: true,
            sortableKey: "completed",
            searchableKey: 'completed',
        },
        {
            name: 'Action',
            selector: row => <Button>Action</Button>,
            sortable: false,
        },
    ]

    useEffect(()=>{
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("https://jsonplaceholder.typicode.com/todos/", requestOptions)
            .then(response => response.text())
            .then(result => setData(JSON.parse(result)))
            .catch(error => console.log('error', error));
    },[])
  return (
      <div style={{width: "900px", margin: "0 auto", marginTop: "30px"}}>
          <VirtualDataTable
              name="Data Table"
              columns={columns}
              data={data}
              dataViewRangeArray={[10, 20, 30, 50, 100]}
              itemPerPage={10}
          />
      </div>
  )
}

export default App
