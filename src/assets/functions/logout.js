export function logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
}