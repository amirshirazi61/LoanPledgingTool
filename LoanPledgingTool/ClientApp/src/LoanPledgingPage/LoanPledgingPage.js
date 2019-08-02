import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import React from 'react';
import { moment } from 'moment';
import { connect } from 'react-redux';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Col, FormGroup, Label, Row, CustomInput, Container, Card, CardHeader, CardBody } from 'reactstrap';
import Layout from './../components/Layout';
import { pledgingActions } from '../actions';
import Checkbox from './../components/Checkbox';
import './../app.css'
export class LoanPledging extends React.Component {
    constructor(props) {
        super(props);

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleViewBla = this.handleViewBla.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleUpdatePledging = this.handleUpdatePledging.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleDropdownToggle = this.handleDropdownToggle.bind(this);
        this.onDropdownClick = this.onDropdownClick.bind(this);
    }

    handleDateChange(date) {
        this.props.handleDateChange(date);
    }

    handleFocusChange({ focused }) {
        this.props.handleFocusChange(focused);
    }

    handleFileChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        this.props.handleFileChange(file);
    }

    handleViewBla(e) {
        e.preventDefault();
        this.props.handleViewBla(this.props.file);
    }

    handleCheckBoxChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.props.handleCheckBoxChange(item, isChecked);
    }

    handleUpdatePledging() {
        this.props.handleUpdatePledging([...this.props.checkedItems.keys()], this.props.date.toDate(), this.props.accountId);
    }

    handleSelectAll(e) {
        this.props.handleSelectAll(e.target.checked, this.props.loanIds);
    }

    handleDropdownToggle() {
        this.props.handleDropdownToggle();
    }

    onDropdownClick(e) {
        console.log(e.target.id);
        this.props.onDropdownClick(+e.target.id);
    }

    render() {
        const { date, fileName, isValidFile, focused, disabled, selectAllChecked, loanIds, checkedItems, dropdownOpen, accountId } = this.props;
        return (
            <Layout>
                <Container>
                    <Form className="mb-2">
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Label for="date" className="col-sm-4 col-form-label"><b>Pledge Date</b></Label>
                                    <Col sm={8}>
                                        <SingleDatePicker
                                            id="date" // PropTypes.string.isRequired,
                                            date={date} // momentPropTypes.momentObj or null
                                            onDateChange={this.handleDateChange} // PropTypes.func.isRequired
                                            focused={focused} // PropTypes.bool
                                            onFocusChange={this.handleFocusChange} // PropTypes.func.isRequired 
                                            numberOfMonths={1}
                                            isOutsideRange={() => { return false }}
                                        />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup row>
                                    <Label sm={4}><b>Account</b></Label>
                                    <Dropdown isOpen={dropdownOpen} toggle={this.handleDropdownToggle}>
                                        <DropdownToggle caret>
                                            {accountId ? `${accountId} selected` : `Account`}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem id="97" onClick={this.onDropdownClick}>97</DropdownItem>
                                            <DropdownItem id="102" onClick={this.onDropdownClick}>102</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup row>
                                    <Label for="fileBrowser" sm={4}><b>Browse file</b></Label>
                                    <Col sm={8}>
                                        <CustomInput type="file" id="fileBrowser" name="customFile"
                                            label={fileName || 'choose an image file'}
                                            invalid={!isValidFile}
                                            onChange={this.handleFileChange} />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className="d-flex flex-row justify-content-between">
                                <Button onClick={this.handleViewBla} disabled={!disabled}>View BlaNumbers</Button>
                                <Button onClick={this.handleUpdatePledging} disabled={!disabled}>Update Pledging Loans</Button>
                        </div>
                    </Form>
                    {(loanIds) &&
                        <Card>
                        <CardHeader>
                            <CustomInput type='checkbox' id='selectAll' label='Select All' checked={selectAllChecked || false} onChange={this.handleSelectAll} />
                        </CardHeader>
                        <CardBody style={{ overflowX: 'auto' }}>
                                <div className="panel panel-default" style={{ display: 'flex', flexFlow: 'column wrap', height: '50vh' }}>
                                    {
                                        loanIds.map(id => (
                                        <div style={{ flexBasis: 'auto' }} key={id}>
                                            <CustomInput type='checkbox' id={id} name={id} checked={checkedItems.get(id) || false} label={id} onChange={this.handleCheckBoxChange} />
                                        </div>
                                        ))
                                    }
                                </div>
                        </CardBody> 
                        </Card>
                    }
                </Container>
            </Layout>
        );
    }
}

function mapState(state) {
    return state.pledging;
}

const actionCreators = {
    handleFileChange: pledgingActions.handleFileChange,
    handleFocusChange: pledgingActions.handleFocusChange,
    handleDateChange: pledgingActions.handleDateChange,
    handleViewBla: pledgingActions.handleViewBla,
    handleCheckBoxChange: pledgingActions.handleCheckBoxChange,
    handleUpdatePledging: pledgingActions.handleUpdatePledging,
    handleSelectAll: pledgingActions.handleSelectAll,
    handleDropdownToggle: pledgingActions.handleDropdownToggle,
    onDropdownClick: pledgingActions.onDropdownClick
};

const connectedLoginPage = connect(mapState, actionCreators)(LoanPledging);
export { connectedLoginPage as PledgingPage }