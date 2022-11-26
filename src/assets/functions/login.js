export function login(jwtToken, email, password) {
    console.log(jwtToken);
    fetch("https://donuttello-backend.onrender.com/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authentication": `Bearer ${jwtToken}`
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
