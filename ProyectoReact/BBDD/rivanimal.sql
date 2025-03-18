CREATE DATABASE rivanimal;
USE rivanimal;

CREATE TABLE 'animal'(
    id_animal int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    clase varchar(50) NOT NULL,
    raza varchar(50) NOT NULL,
    sexo varchar(15) NOT NULL,
    id int(11) NOT NULL UNIQUE,
    tamaño varchar(15) NOT NULL,
    situacion varchar(50) NOT NULL,
    fecha_nacimiento date NOT NULL,
    fecha_entrada date NOT NULL,
    nivel int(11) NOT NULL,
    peso float NOT NULL,
    descripcion varchar(255) NOT NULL,
    foto varchar(100),
    comportamiento varchar(255) NOT NULL
);
CREATE TABLE 'usuario'(
    id_usuario int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    apellido1 varchar(25) NOT NULL,
    apellido2 varchar(25) NOT NULL,
    password varchar(50) NOT NULL,
    nombre_usuario varchar(25) NOT NULL UNIQUE,
    roles varchar(255),
    dni varchar(15) NOT NULL UNIQUE,
    telefono varchar(15) UNIQUE,
    email varchar(50) NOT NULL UNIQUE,
    direccion varchar(255) NOT NULL,
    foto varchar(100)
);

CREATE TABLE 'chenil'(
    id_chenil int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    numero int(11) NOT NULL,
    guillotina boolean NOT NULL
);

CREATE TABLE 'chenil_animal'(
    id_chenil_animal int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    animal int(11) NOT NULL,
    chenil int(11) NOT NULL,
    activo boolean NOT NULL
);

CREATE TABLE 'reporte_diario'(
    id_reporte_diario int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario int(11) NOT NULL,
    rol varchar(30),
    fecha date NOT NULL,
    horario varchar(30) NOT NULL
);

CREATE TABLE 'reporte_tarea'(
    id_tarea int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reporte_diario int(11) NOT NULL,
    descripcion varchar(255) NOT NULL,
    fecha_hora_inicio datetime NOT NULL,
    fecha_hora_fin datetime NOT NULL
);

CREATE TABLE 'reporte_paseo'(
    id_paseo int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    animal int(11) NOT NULL,
    usuario int(11) NOT NULL,
    reporte_diario int(11) NOT NULL,
    fecha_hora_inicio datetime NOT NULL,
    fecha_hora_fin datetime NOT NULL,
    descripcion varchar(255) NOT NULL,
    caca_nivel int(11) NOT NULL,
    ubicaciones varchar(255) NOT NULL
);

CREATE TABLE 'reporte_gatos'(
    id_rep_gatos int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    reporte_diario int(11) NOT NULL,
    usuario int(11) NOT NULL,
    gato int(11) NOT NULL,
    descripcion varchar(255) NOT NULL,
    fecha_hora_inicio datetime NOT NULL,
    fecha_hora_fin datetime NOT NULL
);

CREATE TABLE 'tratamiento'(
    id_tratamiento int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    animal int(11) NOT NULL,
    descripcion varchar(255) NOT NULL,
    fecha date NOT NULL,
    tipo varchar(50) NOT NULL,
    peso_kg float NOT NULL,
    activo boolean NOT NULL
);

ALTER TABLE chenil_animal ADD FOREIGN KEY (animal) REFERENCES animal(id_animal);
ALTER TABLE chenil_animal ADD FOREIGN KEY (chenil) REFERENCES chenil(id_chenil);
ALTER TABLE reporte_diario ADD FOREIGN KEY (usuario) REFERENCES usuario(id_usuario);
ALTER TABLE reporte_tarea ADD FOREIGN KEY (reporte_diario) REFERENCES reporte_diario(id_reporte_diario);
ALTER TABLE reporte_paseo ADD FOREIGN KEY (animal) REFERENCES animal(id_animal);
ALTER TABLE reporte_paseo ADD FOREIGN KEY (usuario) REFERENCES usuario(id_usuario);
ALTER TABLE reporte_paseo ADD FOREIGN KEY (reporte_diario) REFERENCES reporte_diario(id_reporte_diario);
ALTER TABLE reporte_gatos ADD FOREIGN KEY (reporte_diario) REFERENCES reporte_diario(id_reporte_diario);
ALTER TABLE reporte_gatos ADD FOREIGN KEY (usuario) REFERENCES usuario(id_usuario);
ALTER TABLE reporte_gatos ADD FOREIGN KEY (gato) REFERENCES animal(id_animal);
ALTER TABLE tratamiento ADD FOREIGN KEY (animal) REFERENCES animal(id_animal);
