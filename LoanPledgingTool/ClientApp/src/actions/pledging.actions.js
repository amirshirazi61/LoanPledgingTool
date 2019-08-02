import { pledgingConstants } from '../constants';
import { alertActions } from './';
import { pledgingService } from '../services';

export const pledgingActions = {
    handleDateChange,
    handleFocusChange,
    handleFileChange,
    handleViewBla,
    handleCheckBoxChange,
    handleUpdatePledging,
    handleSelectAll
};
function handleDateChange(date) {
    return { type: pledgingConstants.DATE_CHANGE, date };
}

function handleFocusChange(focused) {
    return { type: pledgingConstants.FOCUS_CHANGE, focused };
}

function handleCheckBoxChange(item, isChecked) {
    return { type: pledgingConstants.CHECKBOX_CHANGE, item: item, isChecked: isChecked };
}

function handleFileChange(file) {
    return dispatch => {
        dispatch(request({ file }));
        const ext = file.name.split('.').pop();
        if (ext !== 'xlsx' && ext !== 'csv') {
            dispatch(alertActions.error(`invalid file extension for file: ${file.name}`));
            dispatch(validateFileChange(false))
        }
        else {
            dispatch(alertActions.clear());
            return dispatch(success(file));
        }

    };

    function request(file) { return { type: pledgingConstants.FILE_UPLOAD_REQUEST, fileName: file.name } }
    function validateFileChange(isValidFile) { return { type: pledgingConstants.VALIDATE_FILE_NAME, isValidFile: isValidFile } }
    function success(file) { return { type: pledgingConstants.FILE_CHANGE_SUCCESS, fileName: file.name, file: file } }
}

function handleViewBla(file) {
    return dispatch => {
        dispatch(request());

        pledgingService.getBlaNumbers(file)
            .then((loanIds) => {
                    dispatch(success(loanIds));
                },
                error => {
                    dispatch(failure());
                    dispatch(alertActions.error(error.toString()));
                });
    };

    function request() { return { type: pledgingConstants.VIEW_BLA_REQUEST } }
    function success(loanIds) { return { type: pledgingConstants.VIEW_BLA_SUCCESS, loanIds: loanIds } }
    function failure() { return { type: pledgingConstants.VIEW_BLA_FAILURE } }
}

function handleUpdatePledging(loanIds) {
    return dispatch => {
        dispatch(request());

        pledgingService.updatePledging(loanIds)
            .then((pledgedCount) => {
                dispatch(success(pledgedCount));
                dispatch(alertActions.success(`${pledgedCount} loans updated successfully!`));
            },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                });
    };

    function request() { return { type: pledgingConstants.UPDATE_PLEDGING_REQUEST } }
    function success(pledgedCount) { return { type: pledgingConstants.UPDATE_PLEDGING_SUCCESS, pledgedCount: pledgedCount } }
    function failure() { return { type: pledgingConstants.UPDATE_PLEDGING_FAILURE } }
}

function handleSelectAll(isChecked, loanIds) {
    return { type: pledgingConstants.SELECT_ALL, isChecked: isChecked, loanIds: loanIds }
}

