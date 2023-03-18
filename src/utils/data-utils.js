export const getData = async (url, email, password) => {
  const res = await fetch(url, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return await res.json();
}

export const getSymbols = async (url) => {
  const res = await fetch(url, {
    headers: {
      'Content-type': 'application/json'
    },
  });

  return await res.json();
}
