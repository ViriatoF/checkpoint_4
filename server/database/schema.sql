
--
-- Table structure for table `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_project` varchar(45) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `project`
--

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `matricule` int,
  `role` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`));

--
-- Dumping data for table `user`
--

INSERT INTO user (firstname, lastname, phone, email, matricule, role, password) 
VALUES 
("Jean", "Portetrois", "06.07.09.08.44", "jeanportetrois@mail.fr", 00002, "employee", "password"),
("Viriato", "Ferreira", "06.07.09.08.44", "viriato.ferreira44@gmail.fr", 00001, "admin", "password");

--
-- Table structure for table `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nb_team` int NOT NULL,
  `name_team` varchar(45) DEFAULT NULL,
  `lead_team` varchar(45) NOT NULL,
  `user_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `project_id_idx` (`project_id`),
  CONSTRAINT `project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

--
-- Dumping data for table `team`
--
