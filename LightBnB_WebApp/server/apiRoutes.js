module.exports = function(router, database) {

  router.get('/properties', (req, res) => {
    database.getAllProperties(req.query, 20)
    .then(properties => res.send({properties}))
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  router.get('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getAllReservations(userId)
    .then(reservations => res.send({reservations}))
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.post('/reservations/:property_id', (req, res) => {
    const { property_id } = req.params;
    const guest_id = req.session.userId;
    const reservationDetails = {
      ...req.body,
      property_id,
      guest_id,
    };
    // console.log(req.body);

    database.makeReservation(reservationDetails)
      .then((reservation) => {
        const { start_date, end_date } = reservation[0];
        res.send(`
        You have successfuly booked a reservation. 
        Your booking starts on ${start_date} and ends on ${end_date.toDateString()}.
        Enjoy Your Trip! 
        `);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });



  router.post('/properties', (req, res) => {
    const userId = req.session.userId;
    database.addProperty({...req.body, owner_id: userId})
      .then(property => {
        res.send(property);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}