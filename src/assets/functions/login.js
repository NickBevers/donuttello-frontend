export async function login(email, password) {
    fetch("https://donuttello-backend.onrender.com/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                localStorage.setItem("jwtToken", data.token);
                return data;
            } else {
                return data;
            }
        });
}
