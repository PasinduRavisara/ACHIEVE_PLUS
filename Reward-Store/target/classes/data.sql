-- Insert sample rewards
INSERT INTO REWARD (name, points_cost, description, image_url) VALUES
('Smartphone', 10000, 'Latest model smartphone', '/images/smartphone.jpg'),
('Movie Ticket', 1000, 'Cinematic experience', '/images/movie-ticket.jpg'),
('Cash Reward', 200, 'Direct cash reward', '/images/cash.jpg');

-- Insert a sample user
INSERT INTO USER (username, total_points) VALUES ('testuser', 12345);