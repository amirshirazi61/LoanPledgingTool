import { authHeader } from '../helpers/AuthHeader';
import { userService } from './user.service';
import { serviceConstants } from './serviceConstants';

export const pledgingService = {
    getBlaNumbers,
    updatePledging
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

function updatePledging(loanIds) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(serviceConstants.JsonContentType),
        body: JSON.stringify(loanIds)
    }

    return fetch('api/Pledging/UpdateLoans', requestOptions)
        .then(handleResponse)
        .then(response => {
            return response;
        })
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