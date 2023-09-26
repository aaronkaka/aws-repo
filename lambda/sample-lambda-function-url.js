const url = "https://jsonplaceholder.typicode.com/todos/1";

export const handler = async(event) => {
    try {
        // fetch is available with Node.js 18
        const res = await fetch(url);
        console.info("status", res.status);
        return res.json();
    }
    catch (e) {
        console.error(e);
        return 500;
    }
};
