import { authHeader } from '../helpers/AuthHeader';
import { userService } from './user.service';
import { serviceConstants } from './serviceConstants';

export const pledgingService = {
    getBlaNumbers,
    updatePledging,
    getFile
}

function getBlaNumbers(file) {
    let formData = new FormData();
    formData.append(file.name, file);
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: formData
    };

    return fetch('api/Pledging/GetBlaNumbers', requestOptions)
    .then(handleResponse)
        .then(response => {
            return response;
        })
}

function updatePledging(loanIds, date, accountId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(serviceConstants.JsonContentType),
        body: JSON.stringify({ loanIds, date, accountId })
    }

    return fetch('api/Pledging/UpdateLoans', requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
}

function getFile() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(serviceConstants.JsonContentType),
    }

    return fetch('api/Pledging/GetFile', requestOptions)
        .then(response => response.blob()
            .then(blob => {
                if (!response.ok) {
                    if (response.status === 401) {
                        userService.logout();
                        window.location.reload(true);
                    }

                    const error = response.Message || response.statusText || response.status;
                    return Promise.reject(error);
                }

                return blob;
            }));
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                window.location.reload(true);
            }

            const error = (data && data.Message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}