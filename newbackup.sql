--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Ubuntu 12.1-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg16.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id integer NOT NULL,
    company_name character varying(64),
    website character varying(64),
    email character varying(255),
    phone character varying(64),
    address character varying(64)
);


ALTER TABLE public.client OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.client_id_seq OWNER TO postgres;

--
-- Name: client_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    project_name character varying(64),
    start_date date,
    end_date date,
    tech_stack character varying(255),
    category character varying(64),
    status character varying(64)
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO postgres;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    user_name character varying(64),
    first_name character varying(64),
    last_name character varying(64),
    email character varying(255),
    password character varying(64),
    phone character varying(64),
    designation character varying(64),
    is_sketch_brahma boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: client id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id, company_name, website, email, phone, address) FROM stdin;
1	XL Pros	xlpros.com	sugatha@xlpros.com	9876543210	2, 2nd street, HSR, Bangalore
2	Gyanamite	gyanamite.com	user@xlpros.com	9876543210	3, 3rd street, HBR, Bangalore
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, project_name, start_date, end_date, tech_stack, category, status) FROM stdin;
1	new project	2019-01-02	2019-01-04	React, Node	Development	Init
3	start	2019-12-12	2019-12-12	qwer	awer	asdf
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, user_name, first_name, last_name, email, password, phone, designation, is_sketch_brahma) FROM stdin;
18	MohanHustler	Mohan	Hustler	mohan@gmail.com	$2a$10$9cuQAdP3IgYTZhWL.WBqwuSc/Nu/3Sk8oCqVFPm9wECdBSq.l3AiS	\N	\N	\N
19	ElangoKp	Elango	Kp	elango@gmail.com	$2a$10$0CmQIBaJCHsY6/j3zVVqZePJuoxcMRyOjrPsXlSYB.4YBcjD4sJGe	\N	\N	\N
20	Vino123	Vino	123	vino@gmail.com	$2a$10$JDuGlcWQOTRZ1iQh5nrAv.jQftgzQLSiP9PUrxT7XhqI.dcfrwFva	\N	\N	\N
21	Test1	test	123	test@gmail.com	$2a$10$hPCUKon1/KQmU/JiDVAlfeBuWw5UEe.6JA/v2J6N55FSPZtak3PTG	\N	\N	\N
22	Test2	test2	123	test2@gmail.com	$2a$10$5mNJT1dbF6VHBJR3ePbJXOdYdonD8O7RAFPE6Swdb4FGmbeDm.lQC	\N	\N	\N
23	VjaySachin	Vijat	Sachin	vijay@gmail.com	$2a$10$dXfZ0f218.cI5sy6/zULsuyeE0dEfGFxN/ULqEVhuY1oKpIWnMDoO	\N	\N	\N
24	VjaySachin2	Vijat2	Sachin2	vijay2@gmail.com	$2a$10$W.FwvfWwBITywD2aDA1KneiL/pmfvDYLy1G0WzyRxbVZ3lDp7UuyS	\N	\N	\N
25	test	test	sdt	sdf	$2a$10$ZQLiJmQthAyKUsEenyo0XOg9b8SHaro8K466Fi3BAs7HyHZ3Pngy2	\N	\N	\N
26	test	test	sdt	sdf	$2a$10$4aPfiFmZebqsIF1RPqPMU.Mp.e7h251kbNRtVQfNMH99W6mcJWSoq	\N	\N	\N
27	Vijay	Sachin	Sachin	test@gmail.com	$2a$10$.JX1ecfeFw/AdMrkG23Xe.tkzwR/ww3zrRyGRO8cvhf.YLMoTw8sm	\N	\N	\N
28					$2a$10$cM5J1kgS1n8qGy6hbo1vg.Ow5HdMLCEo1ScWqD97htK0/sz5/R5Be	\N	\N	\N
29	Vijaysachin	sachiin	vijay	12@gmail.com	$2a$10$vRnOl1Uj7ALH53KK6R1qJO61kihLaDMrF9h68YeSkNuWIZxBSuyDK	\N	\N	\N
30	test	s	s	s	$2a$10$xU0R1Dhgo/1qJzNN.tQJ3eUsaXmfhPkaHt7VKdnfJrIXOAHjVoIMm	\N	\N	\N
31	mohan	23e	s	df	$2a$10$YkT0yippP.8QKPseYJ5UMeQM63bWJQM3rVdXUq.jpCvtK14zl93EW	\N	\N	\N
\.


--
-- Name: client_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_id_seq', 3, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 31, true);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

