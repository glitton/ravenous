// Yelp credentials
const clientId = 'CAllHO-oISUHh4B6rc74Xg';
const secret = 'Ii9Her4prkNAULldWZV39DWYwHDapf8F0F5tI7tzpFU04YBOsB7l93PsGblxRxVg';
const accessToken = '';

// functionality that interacts with the Yelp API
let Yelp = {
  // Method used to authenticate the Yelp API
  getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch('https://cors-anywhere.herokuapp.com/api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + secret, 
        { method: 'POST'}).then(response => 
          {
            return response.json();
          }).then(jsonResponse => {
            accessToken = jsonResponse.access_token;
          })
  }, // end of getAccessToken

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch('https://cors-anywhere.herokuapp.com/api.yelp.com/v3/businesses/search?term=' + term + '&location=' + location + '&sort_by=' + sortBy, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonReponse.businesses) {
        return jsonResponse.businesses.map(business => (
          {             
            id: business.id, 
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
        
          }));//end of then jsonResponse.businesses.map
        }
    })
  } //end of search method
}; //end of Yelp functionality

export default Yelp;
