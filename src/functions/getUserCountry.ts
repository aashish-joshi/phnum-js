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
        if (response.ok) {
          return await response.json()
        } else {
          if(
            response.status.toString().startsWith('4') || 
            response.status.toString().startsWith('5')
            ){
            // Failed response
            return ''
          }
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