create table finance_category (
	FinanceCategoryID int(20) not null AUTO_INCREMENT,
	CategoryName varchar(150) not null,
  Discription varchar(250),
  CreatedDate timestamp null default current_timestamp,
  UpdatedDate timestamp null default current_timestamp,
  IsActive tinyint(1) Not null default '1',
  primary key (FinanceCategoryID)
);

INSERT INTO finance_category (CategoryName, Discription)
VALUES ("Food", null), ("Social Life", null), ("Transport", null), ("Household", null), ("Apparel", null),
("Beauty", null), ("Gym Food", null), ("Education", null), ("Gift", null), ("Long Trip", null), ("Other", null), ("Outside Food", null);

create table transaction (
	TransactionID int(20) not null AUTO_INCREMENT,
	Amount varchar(150) not null,
  Description varchar(250),
  FinanceCategoryID integer not null,
  TransactionDate timestamp not null,
  CreatedDate timestamp null default current_timestamp,
  UpdatedDate timestamp null default current_timestamp,
  IsActive tinyint(1) Not null default '1',
  primary key (TransactionID)
);