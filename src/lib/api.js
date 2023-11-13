const API_URL = import.meta.env.PUBLIC_API_URL;
const username = import.meta.env.username;
const password = import.meta.env.password;

export async function fetchAPI(query = '') {
    const res = await fetch(`${API_URL}/${query}`, {
        headers: {
            Authorization: "Basic " + btoa(username + ":" + password),
        }
    });

    if (res.ok) {
        return res.json();
    } else {
        const error = await res.json();

        throw new Error(
            '❗ Failed to fetch API for ' + query + "\n" +
            'Code: ' + error.code + "\n" +
            'Message: ' + error.message + "\n"
        );
    }
}

export async function getPosts() {
    const data = await fetchAPI('posts/?per_page=20');

    return data;
}

export async function getPages() {
    const data = await fetchAPI('pages/?per_page=20');

    return data;
}