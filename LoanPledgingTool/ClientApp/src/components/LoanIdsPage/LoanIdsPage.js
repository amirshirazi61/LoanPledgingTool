import React from 'react';
import { Input, Col, Row, CustomInput, Card, CardHeader, CardBody } from 'reactstrap';

export function LoanIdsPage(props) {
    return  (<Card>
            <CardHeader>
                <Row>
                    <Col sm={4}>
                    <CustomInput type='checkbox' id='selectAll' label='Select All' checked={props.selectAllChecked || false} onChange={props.handleSelectAll} />
                    </Col>
                    <Col sm={4}>
                        <Input placeholder='Search Loan ID (BLA Number)' onChange={props.handleSearchChange} value={props.searchValue} />
                    </Col>
                </Row>
            </CardHeader>
            <CardBody style={{ overflowX: 'auto' }}>
                <div className="panel panel-default" style={{ display: 'flex', flexFlow: 'column wrap', height: '50vh' }}>
                    {
                        props.filteredLoanIds.map(id => (
                            <div style={{ flexBasis: 'auto' }} key={id}>
                            <CustomInput type='checkbox' id={id} name={id} checked={props.checkedItems.get(id) || false} label={id} onChange={props.handleCheckBoxChange} />
                            </div>
                        ))
                    }
                </div>
            </CardBody>
        </Card>);    
}