import { pledgingConstants } from '../constants';

export function pledging(state = { isValidFile: true, checkedItems: new Map() }, action) {
    function deleteUnchecked(item) {
        state.checkedItems.delete(item);
        return new Map(state.checkedItems);
    }
    function selectAll(isChecked, loanIds) {
        if (isChecked) {
            for (let loanId of loanIds) {
                state.checkedItems.set(loanId, true);
            }
            return new Map(state.checkedItems);
        }
        else {
            state.checkedItems.clear();
            return new Map(state.checkedItems);
        }
    }
    switch (action.type) {
        case pledgingConstants.DATE_CHANGE:
            return {
                ...state,
                date: action.date,
                disabled: state.isValidFile && state.fileName !== undefined
            }
        case pledgingConstants.FILE_CHANGE:
            return {
                fileName: action.fileName,
                invalidFile: action.invalidFile
            }
        case pledgingConstants.FOCUS_CHANGE:
            return {
                ...state,
                focused: action.focused
            }
        case pledgingConstants.FILE_UPLOAD_REQUEST:
            return {
                ...state,
                fileName: action.fileName
            };
        case pledgingConstants.VALIDATE_FILE_NAME:
            return {
                ...state,
                isValidFile: action.isValidFile
            };
        case pledgingConstants.FILE_CHANGE_SUCCESS:
            return {
                ...state,
                fileName: action.fileName,
                file: action.file,
                isValidFile: true,
                disabled: state.date !== undefined
            };
        case pledgingConstants.VIEW_BLA_SUCCESS:
            return {
                ...state,
                loanIds: action.loanIds
            }
        case pledgingConstants.CHECKBOX_CHANGE:
            return {
                ...state,
                checkedItems: action.isChecked ?
                    new Map(state.checkedItems.set(action.item, action.isChecked)) :
                    deleteUnchecked(action.item)
            }
        case pledgingConstants.UPDATE_PLEDGING_SUCCESS:
            return {
                ...state,
                pledgedCount: action.pledgedCount
            }

        case pledgingConstants.SELECT_ALL:
            return {
                ...state,
                checkedItems: selectAll(action.isChecked, action.loanIds),
                selectAllChecked: action.isChecked
            }

        default:
            return state
    }
}