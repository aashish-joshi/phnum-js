export async function getUserCountry () {
  return await new Promise((resolve, reject) => {
    const getIpUri = new Request('https://ipapi.co/json/', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      referrer: document.location.host,
      cache: 'default'
    });
    fetch(getIpUri)
      .then(async (response) => {
        try {
          if (response.ok) {
            return await response.json()
          } else {
            throw new Error(response.statusText)
          }
        }
        catch (err) {
          console.error(err)
        }
      })
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      });
  });
}