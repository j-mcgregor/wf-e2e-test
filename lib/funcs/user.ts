const authenticate = async (email: string, password: string) => {
  const res = await fetch(
    'https://api.saggio-credito.co.uk/api/v1/login/access-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: new URLSearchParams({
        username: email,
        password: password
      })
    }
  );

  if (res.ok) {
    const json = await res.json();
    return { token: json.access_token };
  }
  return null;
};

const getUser = async (token: string) => {
  if (!token) {
    return false;
  }
  const res = await fetch('https://api.saggio-credito.co.uk/api/v1/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Bearer ${token}`
    }
  });

  if (res.ok) {
    const user = await res.json();
    return { ...user, token };
  }
  return null;
};

const User = { authenticate, getUser };

export default User;
