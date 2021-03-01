-- Table: public.COUNTRY_LOCATION

-- DROP TABLE public."COUNTRY_LOCATION";

CREATE TABLE public."COUNTRY_LOCATION"
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "CODE" character(2) COLLATE pg_catalog."default",
    "LATITUDE" double precision,
    "LONGITUDE" double precision,
    "NAME" character varying(75) COLLATE pg_catalog."POSIX"
)

TABLESPACE pg_default;

ALTER TABLE public."COUNTRY_LOCATION"
    OWNER to postgres;