import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Col, FormGroup, Label, Row, CustomInput, Container } from 'reactstrap';
import Layout from './../components/Layout';
import { pledgingActions } from '../actions';
import { LoanIdsPage } from './../LoanIdsPage';
import './../app.css';

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
        this.handleSearchChange = this.handleSearchChange.bind(this);
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
        this.props.handleCheckBoxChange(item, isChecked, this.props.searchValue);
    }

    handleUpdatePledging() {
        this.props.handleUpdatePledging([...this.props.filteredCheckedItems.keys()], this.props.date.toDate(), this.props.accountId);
    }

    handleSelectAll(e) {
        this.props.handleSelectAll(e.target.checked, this.props.filteredLoanIds, this.props.searchValue);
    }

    handleDropdownToggle() {
        this.props.handleDropdownToggle();
    }

    onDropdownClick(e) {
        console.log(e.target.id);
        this.props.onDropdownClick(+e.target.id);
    }

    handleSearchChange(e) {
        this.props.handleSearchChange(e.target.value);
    }

    render() {
        const { date, fileName, isValidFile, focused, disabled, selectAllChecked, filteredLoanIds, checkedItems, filteredCheckedItems, dropdownOpen, accountId, searchValue } = this.props;

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
                                            onChange={this.handleFileChange}
                                            accept=".xlsx" />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className="d-flex flex-row justify-content-between">
                                <Button onClick={this.handleViewBla} disabled={!disabled}>View BlaNumbers</Button>
                                <Button onClick={this.handleUpdatePledging} disabled={!disabled}>Update Pledging Loans</Button>
                        </div>
                    </Form>
                    {(filteredLoanIds) && <LoanIdsPage
                        filteredLoanIds={filteredLoanIds}
                        checkedItems={checkedItems}
                        handleSelectAll={this.handleSelectAll}
                        handleSearchChange={this.handleSearchChange}
                        handleCheckBoxChange={this.handleCheckBoxChange}
                        selectAllChecked={selectAllChecked}
                        searchValue={searchValue} />}
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
    onDropdownClick: pledgingActions.onDropdownClick,
    handleSearchChange: pledgingActions.handleSearchChange
};

const connectedLoginPage = connect(mapState, actionCreators)(LoanPledging);
export { connectedLoginPage as PledgingPage }