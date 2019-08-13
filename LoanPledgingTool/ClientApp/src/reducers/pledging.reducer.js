import { pledgingConstants } from '../constants';

export function pledging(state = { isValidFile: true, checkedItems: new Map(), filteredCheckedItems: new Map() }, action) {
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

    function CheckedItemChanged(searchValue) {
        const checkedItemsArray = Array.from(state.checkedItems);

        const filteredCheckedArray = searchValue ?
            checkedItemsArray.filter(item => item[0].toLowerCase().indexOf(searchValue) !== -1) :
            checkedItemsArray;
        return new Map(filteredCheckedArray);
    }

    switch (action.type) {
        case pledgingConstants.DATE_CHANGE:
            return {
                ...state,
                date: action.date
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
                isValidFile: true
            };
        case pledgingConstants.VIEW_BLA_REQUEST:
            return {
                ...state,
                viewing: true
            }
        case pledgingConstants.VIEW_BLA_SUCCESS:
            return {
                ...state,
                loanIds: action.loanIds,
                filteredLoanIds: action.loanIds,
                viewing: false
            }
        case pledgingConstants.VIEW_BLA_FAILURE:
            return {
                ...state,
                viewing: false
            }
        case pledgingConstants.UPDATE_PLEDGING_REQUEST:
            return {
                ...state,
                updating: true
            }
        case pledgingConstants.UPDATE_PLEDGING_FAILURE:
            return {
                ...state,
                updating: false
            }

        case pledgingConstants.CHECKBOX_CHANGE:
            return {
                ...state,
                checkedItems: action.isChecked ?
                    new Map(state.checkedItems.set(action.item, action.isChecked)) :
                    deleteUnchecked(action.item),
                filteredCheckedItems: CheckedItemChanged(action.searchValue)
            }
        case pledgingConstants.UPDATE_PLEDGING_SUCCESS:
            return {
                ...state,
                pledgedCount: action.pledgedCount,
                updating: false
            }

        case pledgingConstants.SELECT_ALL:
            return {
                ...state,
                checkedItems: selectAll(action.isChecked, action.loanIds),
                selectAllChecked: action.isChecked,
                filteredCheckedItems: CheckedItemChanged(action.searchValue)
            }
        case pledgingConstants.TOGGLE_DROPDOWN:
            return {
                ...state,
                dropdownOpen: !state.dropdownOpen
            }
        case pledgingConstants.DROPDOWN_CLICK:
            return {
                ...state,
                accountId: action.accountId
            }
        case pledgingConstants.SEARCH_CHANGE:
            return {
                ...state,
                filteredLoanIds: state.loanIds.filter(
                    loanId => { return loanId.toLowerCase().indexOf(action.searchValue.toLowerCase()) !== -1; }),
                searchValue: action.searchValue,
                filteredCheckedItems: CheckedItemChanged(action.searchValue.toLowerCase())
            }
        default:
            return state
    }
}