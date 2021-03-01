-- Table: public.WINE_MAG

-- DROP TABLE public."WINE_MAG";

CREATE TABLE public."WINE_MAG"
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "COUNTRY" character varying(30) COLLATE pg_catalog."default",
    "DESCRIPTIPTION" character varying(3000) COLLATE pg_catalog."default",
    "DESIGNATION" character varying(100) COLLATE pg_catalog."default",
    "POINTS" integer,
    "PRICE" integer,
    "PROVINCE" character varying(100) COLLATE pg_catalog."default",
    "REGION_1" character varying(200) COLLATE pg_catalog."default",
    "REGION_2" character varying(200) COLLATE pg_catalog."default",
    "TASTER_NAME" character varying(50) COLLATE pg_catalog."default",
    "TASTER_TWITTER_HANDLE" character varying(100) COLLATE pg_catalog."default",
    "TITLE" character varying(200) COLLATE pg_catalog."default",
    "VARIETY" character varying(100) COLLATE pg_catalog."default",
    "WINERY" character varying(200) COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public."WINE_MAG"
    OWNER to postgres;