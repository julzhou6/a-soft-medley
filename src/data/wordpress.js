const username = import.meta.env.USERNAME;
const password = import.meta.env.PASSWORD;

export async function wpquery(query) {
    const res = await fetch("https://caffeinated-bird.localsite.io/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(username + ":" + password),
        },
        body: JSON.stringify({
            query
        }),
    });
    const { data } = await res.json();
    return data;
}

export async function getAllPosts() {
    const query = `
    {
    posts {
        nodes {
            content
            date
            modified
            slug
            tags {
                nodes {
                    name
                }
            }
            categories {
            nodes {
                name
            }
            }
            title
        }
        }
    }
    `;
    const data = await wpquery(query);

    return data;
}

export async function getAllPages() {
    const query = `
    {
        pages {
            nodes {
              slug
              title
              content
            }
          }
    }
    `;
    const data = await wpquery(query);

    return data;
}