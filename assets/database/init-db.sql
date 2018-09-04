DROP DATABASE IF EXISTS popchef;
CREATE DATABASE popchef;
USE popchef;

CREATE TABLE meals (
  id INT NOT NULL AUTO_INCREMENT,
  type VARCHAR(30),
  title VARCHAR(128),
  description VARCHAR(254),
  image VARCHAR(254),
  price DECIMAL(5, 2) NOT NULL DEFAULT 0,
  temperature VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=INNODB;

INSERT INTO meals (type, title, description, image, price, temperature) VALUES ('Entrée', 'Burrata crémeuse et antipasti', 'Une burrata crémeuse (à souhait) accompagnée des antipasti traditionnels : lamelles de courgettes grillées, tomates séchées, jambon sec, oignons grelots marinés au balsamique et roquette.', 'https://static.eatpopchef.com/v2/products/HSASoPVfENlBLdmm8sMaVjdbSQg_thumb.jpeg', 11.40, 'Froid');
INSERT INTO meals (type, title, description, image, price, temperature) VALUES ('Plat', 'Risotto de gambas aux épices cajun', 'Direction la Louisiane pour notre risotto de gambas aux épices cajun et poivrons. Ce mélange de saveurs riches mais pas trop relevées réchauffera votre déjeuner !', 'https://static.eatpopchef.com/v2/products/LbleCQdMm02cS0NwMXuyjscINv8.jpeg', 13.60, 'Chaud');
INSERT INTO meals (type, title, description, image, price, temperature) VALUES ('Plat', 'Poulet aux épices, salade fraîche et pennettes', ' Un filet de poulet snacké au piment doux, une salade folle de légumes d\'été (tomates cerises, radis, concombre et roquette), de la féta et des mini pâtes penne. A déguster avec une vinaigrette au miel', 'https://static.eatpopchef.com/v2/products/aBZYGzAHe6ap4y37TIB0ou52B9U.jpeg', 14.30, 'Chaud');
