DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` char(10) NOT NULL,
  `full_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address1` text,
  `address2` text,
  `city` varchar(20) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `post_code` varchar(9) DEFAULT NULL,
  `country` char(10) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `role` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user` (`username`),
  UNIQUE KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;