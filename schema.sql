CREATE TABLE IF NOT EXISTS `entries` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

