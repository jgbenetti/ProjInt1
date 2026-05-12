async function checkAuth() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return null;
    }

    try {
        const res = await fetch('http://localhost:5055/api/login/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`  // ✅ send token in header
            }
        });

        if (!res.ok) {
            sessionStorage.removeItem('token');
            window.location.href = 'login.html';
            return null;
        }

        return await res.json();

    } catch (err) {
        console.error('Auth check failed:', err);
        window.location.href = 'login.html';
        return null;
    }
}

async function logout() {
    sessionStorage.removeItem('token');  // ✅ clear token
    window.location.href = 'login.html';
}