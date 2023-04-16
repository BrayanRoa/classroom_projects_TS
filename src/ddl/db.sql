-- ! 👀 MUY IMPORTANTE LA PALABRA GROUP DEBE IR ENTRE COMILLAS
-- ! SI NO DA ERROR EN LA BASE DE DATOS
-- ! LAS TABLAS ESTAN ORGANIZADAS PARA AGREGARLAS UNA TRAS OTRA


CREATE TABLE document_type (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE,
  state BOOLEAN NOT NULL DEFAULT true
);
CREATE INDEX ON document_type (name);


CREATE TABLE role (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL UNIQUE,
  state BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX ON role (name);


CREATE TABLE subject (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  code VARCHAR(8) NOT NULL UNIQUE
);

CREATE INDEX ON subject (name);
CREATE INDEX ON subject (code);



CREATE TABLE "group" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(2) NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  subject_code UUID NOT NULL,
  FOREIGN KEY (subject_code) REFERENCES subject (id)
);

CREATE INDEX ON "group" (name);
CREATE INDEX ON "group" (subject_code);


CREATE TABLE person (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institutional_mail VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  names VARCHAR(30) NOT NULL,
  lastnames VARCHAR(30) NOT NULL,
  code VARCHAR(8) UNIQUE NOT NULL,
  num_document VARCHAR NOT NULL,
  img VARCHAR(255),
  active BOOLEAN NOT NULL DEFAULT true,
  role_id UUID REFERENCES role(id),
  document_id UUID REFERENCES document_type(id)
);

CREATE INDEX ON person (institutional_mail);
CREATE INDEX ON person (code);
CREATE INDEX ON person (num_document);



CREATE TABLE group_person (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID NOT NULL,
  group_id UUID NOT NULL,
  state VARCHAR(30),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (person_id) REFERENCES person (id),
  FOREIGN KEY (group_id) REFERENCES "group" (id)
);
CREATE INDEX ON group_person (person_id);
CREATE INDEX ON group_person (group_id);


CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(30) NOT NULL,
    description VARCHAR(500) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    state VARCHAR(20) NOT NULL,
    number_of_students INTEGER NOT NULL,
    registered_persons INTEGER DEFAULT 0,
    full_flag BOOLEAN NOT NULL DEFAULT FALSE,
    group_id UUID NOT NULL,
    FOREIGN KEY (group_id) REFERENCES "group" (id)
);
CREATE INDEX ON projects (group_id);


CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(30) NOT NULL,
    description VARCHAR(500) NOT NULL,
    expired_date DATE NOT NULL,
    group_id UUID NOT NULL,
    FOREIGN KEY (group_id) REFERENCES "group" (id)
);

CREATE INDEX ON tasks (group_id);



CREATE TABLE task_project (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state VARCHAR NOT NULL DEFAULT 'undelivered',
  link VARCHAR,
  project_id UUID NOT NULL,
  task_id UUID NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects (id),
  FOREIGN KEY (task_id) REFERENCES tasks (id)
);
CREATE INDEX ON task_project (project_id);
CREATE INDEX ON task_project (task_id);



CREATE TABLE project_person (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID NOT NULL,
  project_id UUID NOT NULL,
  state BOOLEAN NOT NULL,
  FOREIGN KEY (person_id) REFERENCES person (id),
  FOREIGN KEY (project_id) REFERENCES projects (id)
);

CREATE INDEX ON project_person (person_id);
CREATE INDEX ON project_person (project_id);
