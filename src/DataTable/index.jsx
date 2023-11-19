import React, {useEffect, useState} from 'react';
import {Card, Col, Pagination, Row, Table} from "react-bootstrap";
import MyTable from "./MyTable.jsx";
import Style from "./index.module.css"
import ReactPaginate from 'react-paginate';
import {PaginationContainer} from './PaginationStyles';

function Index({name, columns, data, dataViewRangeArray, itemPerPage}) {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemAtPage, setItemAtPage] = useState(itemPerPage)
    const [paginatedData, setPaginatedData] = useState([])
    const [offset, setOffset] = useState(currentPage * itemAtPage)
    const [tableData, setTableData] = useState(data)
    const [isShort, setShort] = useState(false)

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
        setOffset(selected * itemAtPage)
    };

    const searchHandler = (query) => {
        columns.map(column => {
            if (column?.searchableKey) {
                let resultArray = searchData(column.searchableKey, query)
                if (resultArray.length > 0) {
                    setTableData(resultArray)
                }
            }
        })
    }

    const searchData = (key, query) => {
        return data.filter((item) => {
            let itemKeyValue = item[key].toString().toLowerCase()
            return itemKeyValue.includes(query.toLowerCase())
        });
    }

    const sortData = (key, shortData) => {
        setShort(shortData)
        let result = tableData.sort(function (a, b) {
            let firstKey = a[key].toString()
            let lastKey = b[key].toString()
            if(shortData) {
                return lastKey.localeCompare(firstKey);
            } else {
                return firstKey.localeCompare(lastKey);
            }
        });
        setTableData(result)
    }


    useEffect(() => {
        let offsetIndex = parseInt(offset)
        let itemAtPageIndex = parseInt(itemAtPage)
        setPaginatedData(tableData.slice(offsetIndex, offsetIndex + itemAtPageIndex))
    }, [tableData, currentPage, itemAtPage, offset, isShort])

    useEffect(() => {
        setTableData(data)
    }, [data])

    return (
        <Card>
            <Card.Header>
                <Row>
                    <Col sm={6}><h3>{name}</h3></Col>
                    <Col sm={6} className={Style.searchWraper}>
                        <input type="text" className={Style.searchBox} placeholder="Search by keyword....."
                               onChange={e => searchHandler(e.target.value)}/>
                        <div className={Style.searchIcon}>&#128269;</div>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body className={Style.tableWraper}>
                <MyTable
                    className={Style.table}
                    columns={columns}
                    data={paginatedData}
                    sortable={Style.sortableIcon}
                    currentPage={currentPage}
                    itemPerPage={itemAtPage}
                    short={sortData}
                />
            </Card.Body>
            <Card.Footer>
                <div className={Style.footerContainer}>
                    <select className={Style.footerCountOfSelect} value={itemAtPage && itemAtPage} onChange={e => {
                        setItemAtPage(e.target.value)
                    }}>
                        {dataViewRangeArray.map((vItem, index) => <option key={index} value={vItem}>{vItem}</option>)}
                    </select>
                    <span
                        className={Style.footerCountOfItem}>{`${currentPage + 1} of ${Math.ceil(tableData.length / itemAtPage)}`}</span>
                    <PaginationContainer>
                        <ReactPaginate
                            previousLabel={<span>&larr;</span>}
                            nextLabel={<span>&rarr;</span>}
                            breakLabel={'...'}
                            pageCount={Math.ceil(tableData.length / itemAtPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                        />
                    </PaginationContainer>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default Index;