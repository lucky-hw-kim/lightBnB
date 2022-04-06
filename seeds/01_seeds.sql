INSERT INTO users (name, email, password)
VALUES ('Karen Smith', 'abc123@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Tree Friend', 'def123@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Daisy Dove', 'hij123@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Ellie Heiken', 'klm123@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
       ('Rosalie Garza', 'jacksondavid@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active ) VALUES (1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 9300, 6, 4, 8, 'Canada', 'Namsub Highway', 'Sotboske', 'Quebec', 28142, 'true'),

(3, 'Blank corner', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 85234, 6, 6, 7, 'Canada', 'Nami Road', 'Bohbatev', 'Alberta', 83680, true),

(2, 'Habit mix', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 46058, 0, 5, 6, 'Canada' , 'Hejto Center', 'Genwezuj', 'Newfoundland And Labrador', 44583, true),

(4, 'Headed know', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',82640, 0, 5, 5, 'Canada', 'Powov Grove', 'Jaebvap', 'Ontario', 38051, true),

(5, 'Haunted House', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-12029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1429599.jpeg',82640, 4, 2, 1, 'USA', 'Ghostly Grove', 'monster', 'Washington', 38051, false);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2020-02-22', '2021-03-01', 1, 1),
       ('2019-01-11', '2020-01-21', 2, 2),
       ('2003-04-07', '2003-04-11', 3, 3),
       ('2021-03-13', '2021-03-31', 4, 4),
       ('2011-07-13', '2011-07-18', 5, 5);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (4, 2, 2, 3, 'messages'),
       (3, 4, 1, 4, 'messages'),
       (2, 1, 2, 4, 'messages'),
       (1, 2, 3, 4, 'messages'),
       (5, 1, 2, 2, 'messages');
 
