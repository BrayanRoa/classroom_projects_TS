CREATE TABLE person (
  id SERIAL PRIMARY KEY,
  institutional_mail VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  names VARCHAR(30) NOT NULL,
  lastnames VARCHAR(30) NOT NULL,
  code VARCHAR(8) UNIQUE NOT NULL,
  num_document VARCHAR NOT NULL,
  img VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT true,
  role_id INTEGER REFERENCES role(id),
  document_id INTEGER REFERENCES document_type(id)
);

CREATE INDEX ON person (institutional_mail);
CREATE INDEX ON person (code);
CREATE INDEX ON person (num_document);


CREATE TABLE document_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  state BOOLEAN NOT NULL DEFAULT true
);
CREATE INDEX ON document_type (name);


CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE,
  state BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX ON role (name);


CREATE TABLE subject (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  code VARCHAR(8) NOT NULL UNIQUE
);

CREATE INDEX ON subject (name);
CREATE INDEX ON subject (code);



CREATE TABLE group (
  id SERIAL PRIMARY KEY,
  name VARCHAR(2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  subject_code INTEGER NOT NULL,
  FOREIGN KEY (subject_code) REFERENCES subject (id)
);

CREATE INDEX ON group (name);
CREATE INDEX ON group (subject_code);
