import React, {useRef, useState} from 'react';
import {Table} from "react-bootstrap";

function MyTable({className, sortable, columns, data, itemPerPage, currentPage, short}) {
    const refTable = useRef()
    const [shortData, setShortData] = useState(true)

    return (
        <Table ref={refTable} responsive striped bordered hover variant="light" className={className}>
            <thead>
            <tr>
                {columns.map((item, index) => {
                    return item?.sortable ?
                        <th key={index} className={sortable} onClick={e => {
                            short(item?.sortableKey, shortData)
                            setShortData(!shortData)
                        }}>{item.name}</th> :
                        <th key={index}>{item.name}</th>
                })}
            </tr>
            </thead>
            <tbody>

            {data && Array.from(data).map((row, index) => {
                let sl = currentPage > 0 ? index + (currentPage * itemPerPage) : index
                return (
                    <tr key={index}>
                        {columns.map((cItem, cIndex) => <td key={cIndex}
                                                            style={cItem?.style}>{cItem.selector(row, sl)}</td>)}
                    </tr>
                )
            })}
            </tbody>
        </Table>
    );
}

export default MyTable;