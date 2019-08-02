export function authHeader(ContentType = null) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.token)
        return {}
    else if (ContentType) {
        return new Headers(
            {
                'Authorization': `Bearer  ${user.token}`,
                'Content-Type': `${ContentType}`
            });
    }

    return { 'Authorization': `Bearer  ${user.token}` };
}