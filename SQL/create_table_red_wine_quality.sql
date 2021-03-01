-- Table: public.WINE_QUALITY_REDS

-- DROP TABLE public."WINE_QUALITY_REDS";

CREATE TABLE public."WINE_QUALITY_REDS"
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "FIXED_ACIDITY" double precision,
    "VOLITILE_ACIDITY" double precision,
    "CITRIC_ACID" double precision,
    "RESIDUAL_SUGAR" double precision,
    "CHLORIDES" double precision,
    "FREE_SULFUR_DIOXIDE" double precision,
    "TOTAL_SULFUR_DIOXIDE" double precision,
    "DENSITY" double precision,
    "PH" double precision,
    "SULPHATES" double precision,
    "ALCOHOL" double precision,
    "QUALITY" double precision
)

TABLESPACE pg_default;

ALTER TABLE public."WINE_QUALITY_REDS"
    OWNER to postgres;