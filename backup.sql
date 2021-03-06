PGDMP         	                x            project_management     12.1 (Ubuntu 12.1-1.pgdg16.04+1)     12.1 (Ubuntu 12.1-1.pgdg16.04+1)     e           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            f           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            g           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            h           1262    24578    project_management    DATABASE     x   CREATE DATABASE project_management WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_IN' LC_CTYPE = 'en_IN';
 "   DROP DATABASE project_management;
                postgres    false            �            1259    32797    client    TABLE     �   CREATE TABLE public.client (
    id integer NOT NULL,
    company_name character varying(64),
    website character varying(64),
    email character varying(255),
    phone character varying(64),
    address character varying(64)
);
    DROP TABLE public.client;
       public         heap    postgres    false            �            1259    32795    client_id_seq    SEQUENCE     �   CREATE SEQUENCE public.client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.client_id_seq;
       public          postgres    false    205            i           0    0    client_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.client_id_seq OWNED BY public.client.id;
          public          postgres    false    204            �            1259    32808    projects    TABLE     �   CREATE TABLE public.projects (
    id integer NOT NULL,
    project_name character varying(64),
    start_date date,
    end_date date,
    tech_stack character varying(255),
    category character varying(64),
    status character varying(64)
);
    DROP TABLE public.projects;
       public         heap    postgres    false            �            1259    32806    projects_id_seq    SEQUENCE     �   CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.projects_id_seq;
       public          postgres    false    207            j           0    0    projects_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;
          public          postgres    false    206            �            1259    24594    users    TABLE     S  CREATE TABLE public.users (
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
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24592    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            k           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            �
           2604    32800 	   client id    DEFAULT     f   ALTER TABLE ONLY public.client ALTER COLUMN id SET DEFAULT nextval('public.client_id_seq'::regclass);
 8   ALTER TABLE public.client ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �
           2604    32811    projects id    DEFAULT     j   ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);
 :   ALTER TABLE public.projects ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    24597    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            `          0    32797    client 
   TABLE DATA           R   COPY public.client (id, company_name, website, email, phone, address) FROM stdin;
    public          postgres    false    205   1       b          0    32808    projects 
   TABLE DATA           h   COPY public.projects (id, project_name, start_date, end_date, tech_stack, category, status) FROM stdin;
    public          postgres    false    207   �       ^          0    24594    users 
   TABLE DATA           |   COPY public.users (id, user_name, first_name, last_name, email, password, phone, designation, is_sketch_brahma) FROM stdin;
    public          postgres    false    203   $       l           0    0    client_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.client_id_seq', 3, true);
          public          postgres    false    204            m           0    0    projects_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.projects_id_seq', 3, true);
          public          postgres    false    206            n           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 31, true);
          public          postgres    false    202            �
           2606    32805    client client_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public            postgres    false    205            �
           2606    32813    projects projects_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.projects DROP CONSTRAINT projects_pkey;
       public            postgres    false    207            �
           2606    24602    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            `   u   x�3��Q(�/��) Rz����ť�%�HB��f�&�F��F:
Fy)
�%E��%:
�A:
N�y�9�E�\F�y���%���0؈���"F�(!�bd�  44�      b   ^   x�3��K-W((��JM.�420��50�50B0M8�R�Kt��SR9]R�Rs�rS�J8=�2K��9�K��Z���YX�Zę&�SҸb���� ��      ^   K  x�u�ɖ�H���s�H�]��� ��x�!�Af��۩�8���l�/�0�V&A!uM��� ?Q���9�A��a�#�D��o6�L.2�����OE=�:;�6F�g�\T�h��\D�]�ɥ6�g�z� �,��8���-���O�	����y!5>��ț�V{h�]y5k�O���2��љχ'a��+�#p�M��sG���O�,t�,�L}k�Aj&TQs=z2��x3U;5Xé���.��h�� ���-lZ�����y�OLb,�, ����ɩ�rY��(g	QZ氞��E���o�3ilW��Ow�?�	���A�]��-y�G~T��-N4��=D����P���\L@������$-�;-��{0~�]��c0h�����n��t#\��2^�����M:�[��
M(�	p6/"���O�_��Cš���_o�A �JS��q/��V�w���ݓ�p�;�8�E�z��4������ʹ�&ܨ8�c���#{`l)�KF�Ѵ��<�̥QړFq��5��ֳ��S1��CլE`��9�vA�<!(p>l��5�&��G���e5��?�3�4��}�Py`Cq��H��+��A�=��V[��ҙ�Ob�W�r;0M>a1��z��%���S�F:9��?��@I��.�%�C��y�*8��(̢���Ⱦo^	?������g�U�pNsN�(RQhT�N�s�����"�Ќ�����+ow����H�]�����:���Xbw��f���LB�	vy��@j��\�w:'��r�M
B�׹�$���6�?o�1�\�1���L945�<x�����
=]}���-cɥ����������     