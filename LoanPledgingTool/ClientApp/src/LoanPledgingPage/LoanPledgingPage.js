import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Col, FormGroup, Label, Row, CustomInput, Container, Card, CardHeader, CardBody } from 'reactstrap';
import Layout from './../components/Layout';
import { pledgingActions } from '../actions';
import Checkbox from './../components/Checkbox';

export class LoanPledging extends React.Component {
    constructor(props) {
        super(props);

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleFocusChange = this.handleFocusChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleViewBla = this.handleViewBla.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleUpdatePledging = this.handleUpdatePledging.bind(this);
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
        this.props.handleUpdatePledging([...this.props.checkedItems.keys()]);
    }

    handleSelectAll(e) {
        this.props.handleSelectAll(e.target.checked, this.props.loanIds);
    }

    render() {
        const { date, fileName, isValidFile, focused, disabled, selectAllChecked, loanIds, checkedItems } = this.props;
        return (
            <Layout>
                <Container>
                    <Form className="mb-2">
                        <Row>
                            <Col>
                                <FormGroup row>
                                    <Label for="date" className="col-sm-3 col-form-label"><b>Pledge Date</b></Label>
                                    <Col sm={9}>
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
                                    <Label for="fileBrowser" sm={3}><b>Browse file</b></Label>
                                    <Col sm={9}>
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
                            Select All:  <Checkbox name="selectAll" checked={selectAllChecked} onChange={this.handleSelectAll} />
                        </CardHeader>
                        <CardBody style={{ overflowX: 'auto' }}>
                                <div className="panel panel-default" style={{ display: 'flex', flexFlow: 'column wrap', height: '50vh' }}>
                                    {
                                        loanIds.map(id => (
                                        <div style={{ flexBasis: 'auto' }} key={id}>
                                                <Checkbox name={id} checked={checkedItems.get(id)} onChange={this.handleCheckBoxChange} />
                                                {' '}<label key={id}>
                                                    {id}
                                                </label>
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
    handleSelectAll: pledgingActions.handleSelectAll
};

const connectedLoginPage = connect(mapState, actionCreators)(LoanPledging);
export { connectedLoginPage as PledgingPage }