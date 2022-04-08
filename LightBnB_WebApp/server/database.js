// const properties = require('./json/properties.json');
const users = require('./json/users.json');
require('dotenv').config();
const { Pool } = require('pg');
const config = {
host: process.env.HOST,
user: process.env.USER,
password: process.env.PASSWORD,
database: process.env.DATABASE
}
const pool = new Pool (config);

// pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response.rows)})


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;
  `;

  return pool
    .query(queryString ,[email])
    .then((result) => {
      if(result.rows.length > 0) {
      return result.rows[0]
      } return null;
    })
    .catch(err => console.log(err.message));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1;
  ;`

  return pool
    .query(queryString,[id])
    .then((result) => {
      if(result.rows.length > 0) {
        return result.rows[0]
        } return null
      })
      .catch(err => console.log(err.message));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  const name = user.name;
  const email = user.email;
  const password = user.password;
  const queryString = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`;

   return pool
    .query(queryString
    , [name, email, password])
    .then(result => result.rows)
    .catch(err => console.log(err.message));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
 const makeReservation = function (reservation) {
  const queryParams = [reservation.start_date, reservation.end_date, reservation.property_id, reservation.guest_id];
  const queryString = `
  INSERT INTO reservations
  (start_date, end_date, property_id, guest_id)
  VALUES
  ($1, $2, $3, $4)
  RETURNING *;
  `;
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams)
    .then((result) => {
      console.log(result.rows)
      return result.rows
    })
    .catch((e) => e.message);
};
exports.makeReservation = makeReservation;

const getAllReservations = function(guest_id, limit = 10) {
  
  const queryString = `
  SELECT reservations.*
      FROM reservations 
      JOIN properties 
      ON reservations.property_id = properties.id 
      JOIN property_reviews ON property_reviews.property_id = properties.id
        WHERE reservations.guest_id = $1
          GROUP BY reservations.id, 
          properties.title, 
          reservations.start_date, 
          properties.cost_per_night
    ORDER BY start_date
    LIMIT $2;
  `;
  return pool
    .query(queryString,[guest_id, limit])
    .then(result => result.rows)
    .catch(err => console.log(err.message));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id`;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `
    WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `
    AND owner_id = $${queryParams.length}`;
  }
  
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    if (queryParams.length === 1) {
    queryString += `
    WHERE cost_per_night >= $${queryParams.length}
    `;   
    } else {
    queryString += `
    AND cost_per_night >= $${queryParams.length}
    `;
    }
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    if (queryParams.length === 1) {
      queryString +=  `
      WHERE cost_per_night <= $${queryParams.length} 
      `;
    } else {
      queryString += `
      AND cost_per_night <= $${queryParams.length} 
      `;
    }
  }
  
  queryString += `
  GROUP BY properties.id`

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `
    HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
  }
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool
  .query(queryString, queryParams)
  .then(result => result.rows)
  .catch(err => console.log(err.message));

}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, country, street, city, province, post_code, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `
  const queryParams = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.country, property.street, property.city, property.province, property.post_code, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms]

  return pool
    .query(queryString, queryParams)
    .then(result => result.rows)
    .catch(err => console.log(err.message));
}
exports.addProperty = addProperty;
