# UD_Kursach
Курсовая по управлению данными на Vue/Nest/Postgres

Для того, чтобы начать
вам понадобится Node.js LTS версия скачать ее можно тут https://nodejs.org/en/

нужно установить Vue
npm i -g @vue/cli

нужно установить Nest
npm i -g @nestjs/cli

так же нужно установить PostgreSQL
и в файле /server/myOrm/repository.ts на 7-ой строчке указать данные к вашей бд

далее нужно создать таблицы в вашей БД
Для этого достаточно запустить скрипт ниже

-------------- СКРИПТ -----------------------------

CREATE TABLE "USER" (
	ID BIGSERIAL PRIMARY KEY NOT NULL,
	FIRST_NAME text,
    LAST_NAME text,
    EMAIL text,
    PHONE text,
    PASSWORD text
);

CREATE TABLE "CONNECTION" (
    USER1_ID BIGINT REFERENCES "USER" (ID),
    USER2_ID BIGINT REFERENCES "USER" (ID),
    PRIMARY KEY (USER1_ID, USER2_ID)
);

CREATE TABLE "SENT_CONNECTION" (
    SENDER_ID BIGINT REFERENCES "USER" (ID),
    RECEIVER_ID BIGINT REFERENCES "USER" (ID),
    PRIMARY KEY (SENDER_ID, RECEIVER_ID)
);

CREATE TABLE "GROUP" (
    ID BIGSERIAL PRIMARY KEY NOT NULL ,
    GROUP_NAME text,
    DESCRIPTION text
);

CREATE TABLE "GROUPS_USERS" (
    GROUP_ID BIGINT REFERENCES "GROUP" (ID) ON DELETE CASCADE ,
    USER_ID BIGINT REFERENCES "USER" (ID) ON DELETE CASCADE ,
    PRIMARY KEY (GROUP_ID, USER_ID)
);



CREATE TABLE "USERS_POST" (
    ID BIGSERIAL PRIMARY KEY  NOT NULL ,
    TITLE TEXT,
    CONTENT TEXT,
    DATE_OF_CREATION BIGINT,
    CREATOR_ID BIGINT,
    FOREIGN KEY (CREATOR_ID) REFERENCES "USER" (ID)
                          ON DELETE CASCADE
                          ON UPDATE CASCADE
);

CREATE TABLE "GROUPS_POST" (
    ID BIGSERIAL PRIMARY KEY  NOT NULL ,
    TITLE TEXT,
    CONTENT TEXT,
    DATE_OF_CREATION BIGINT,
    CREATOR_ID BIGINT,
    FOREIGN KEY (CREATOR_ID) REFERENCES "GROUP" (ID)
                            ON DELETE CASCADE
                            ON UPDATE CASCADE
);

-------------- СКРИПТ -----------------------------



Теперь вы можете открыть 2 терминала (командные строки)
В первом перейти в текущую директорию и далее выполнить команды
1. cd app
2. npm i
3. npm run serve // запуск клиента

Во втором так же перейти в текущую директорию и выполнить следующие команды
1. cd server
2. npm i
3. npm run start:dev // запуск сервера

Теперь можете перейти в браузер и открыть http://localhost:8080 и начать работу.
Удачи!
