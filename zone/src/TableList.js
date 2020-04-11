import React, { Component } from 'react';
import * as moment from 'moment-timezone';
import styled from 'styled-components';
let interval;

class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.formatTableContent()
        }
    }

    componentDidMount() {
        interval = setInterval(() => {
            this.setState({ data: this.formatTableContent() })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    formatTableContent = () => {
        const { area } = this.props
        let parsedData = [];
        area.forEach(item => {
            const time = moment().tz(item.timeZone);
            let ist_difference = (moment.tz(item.timeZone).utcOffset() - moment.tz("Asia/Kolkata").utcOffset()) / 60;
            parsedData.push({
                name: item.name,
                tagg: item.tag,
                date: time.format("MMMM d, Y"),
                _24Hrs: time.format("H:mm:ss"),
                _12Hrs: time.format("h:mm:ss A"),
                ist_difference: Math.abs(ist_difference).toString().replace('.5', ':30'),
                plus_minus: ist_difference.toString().startsWith('-') ? '-' : '+'
            });
        })
        return parsedData;
    }

    getColums = () => {
        return [{
            Header: 'Name',
            accessor: 'name'
        }, {
            Header: 'Tagging',
            accessor: 'tagg'
        }, {
            Header: 'Date',
            accessor: 'date'
        }, {
            Header: '24hrs Time',
            accessor: '_24Hrs'
        }, {
            Header: '12hrs Time',
            accessor: '_12Hrs'
        }, {
            Header: 'IST Difference',
            accessor: 'ist_difference'
        }, {
            Header: 'Plus/Minus',
            accessor: 'plus_minus'
        }];
    }

    render() {
        const { data } = this.state;
        return (
            <TableSection>
                <Table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Tagging</td>
                            <td>Date</td>
                            <td>24hrs Time</td>
                            <td>12hrs Time</td>
                            <td>IST Difference</td>
                            <td>Plus/Minus</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => {
                            return (
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.tagg}</td>
                                    <td>{item.date}</td>
                                    <td>{item._24Hrs}</td>
                                    <td>{item._12Hrs}</td>
                                    <td>{item.ist_difference}</td>
                                    <td>{item.plus_minus}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </Table>
            </TableSection>
        )
    }
}

export default TableList;

const TableSection = styled.div`
    width: 100%;

    thead {
        margin-top: 30px;
        background-color: #0e1921;
        display: table-header-group;
        break-inside: avoid;

        td {
            color: #ffffff;
            font-weight: 400;
        }
    }
    
    tr td {
        height: 30px;
    }
    
    th,  td {
        border: 1px solid #0e1921;
        color: #183247;
        width: 200px;
        text-align: center;
    }
    
    th {
        padding: 8px;
    }
    
    tr {
        height: auto;
    }
`;

const Table = styled.table`
    width: 100%;
    border-spacing: 0px;
`;