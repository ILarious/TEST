PGDMP     ;    /                {            db_test    15.3 (Debian 15.3-1.pgdg120+1)    15.3     +           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ,           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            -           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            .           1262    16452    db_test    DATABASE     r   CREATE DATABASE db_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE db_test;
                postgres    false            �            1259    16704    alembic_version    TABLE     X   CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);
 #   DROP TABLE public.alembic_version;
       public         heap    postgres    false            �            1259    16710 	   employees    TABLE     �   CREATE TABLE public.employees (
    id integer NOT NULL,
    full_name character varying NOT NULL,
    "position" character varying NOT NULL
);
    DROP TABLE public.employees;
       public         heap    postgres    false            �            1259    16709    employees_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.employees_id_seq;
       public          postgres    false    216            /           0    0    employees_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;
          public          postgres    false    215            �            1259    16721    tasks    TABLE     �   CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying NOT NULL,
    parent_id integer,
    assignee_id integer,
    deadline date,
    status character varying NOT NULL
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            �            1259    16720    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    218            0           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    217            �           2604    16713    employees id    DEFAULT     l   ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);
 ;   ALTER TABLE public.employees ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    16724    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            $          0    16704    alembic_version 
   TABLE DATA           6   COPY public.alembic_version (version_num) FROM stdin;
    public          postgres    false    214   *       &          0    16710 	   employees 
   TABLE DATA           >   COPY public.employees (id, full_name, "position") FROM stdin;
    public          postgres    false    216   T       (          0    16721    tasks 
   TABLE DATA           T   COPY public.tasks (id, title, parent_id, assignee_id, deadline, status) FROM stdin;
    public          postgres    false    218   �       1           0    0    employees_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.employees_id_seq', 5, true);
          public          postgres    false    215            2           0    0    tasks_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tasks_id_seq', 9, true);
          public          postgres    false    217            �           2606    16708 #   alembic_version alembic_version_pkc 
   CONSTRAINT     j   ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
 M   ALTER TABLE ONLY public.alembic_version DROP CONSTRAINT alembic_version_pkc;
       public            postgres    false    214            �           2606    16717    employees employees_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.employees DROP CONSTRAINT employees_pkey;
       public            postgres    false    216            �           2606    16728    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    218            �           1259    16718    ix_employees_full_name    INDEX     Q   CREATE INDEX ix_employees_full_name ON public.employees USING btree (full_name);
 *   DROP INDEX public.ix_employees_full_name;
       public            postgres    false    216            �           1259    16719    ix_employees_id    INDEX     C   CREATE INDEX ix_employees_id ON public.employees USING btree (id);
 #   DROP INDEX public.ix_employees_id;
       public            postgres    false    216            �           1259    16739    ix_tasks_id    INDEX     ;   CREATE INDEX ix_tasks_id ON public.tasks USING btree (id);
    DROP INDEX public.ix_tasks_id;
       public            postgres    false    218            �           1259    16740    ix_tasks_title    INDEX     A   CREATE INDEX ix_tasks_title ON public.tasks USING btree (title);
 "   DROP INDEX public.ix_tasks_title;
       public            postgres    false    218            �           2606    16729    tasks tasks_assignee_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assignee_id_fkey FOREIGN KEY (assignee_id) REFERENCES public.employees(id);
 F   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_assignee_id_fkey;
       public          postgres    false    3213    216    218            �           2606    16734    tasks tasks_parent_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.tasks(id);
 D   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_parent_id_fkey;
       public          postgres    false    218    218    3219            $      x�K�4J�0J4�L3������ +��      &   |   x�U���P�k{�W�F�.�
i&��	(ha�'�!����y#*(|:�ߝ'�׵��|f�yҒ�C4��E�&i3ĖB�S�ĕL����k:�-q���/>7�2����y|:}a\�A����F��pBX�      (     x�}�QN�@��wO��a���������F㣵^`i�%-�+�s#g ݭ4>@�ݙo���
�t�lᨠ�=��'��C�F-��Uq'�h1��³���*�*P�Xa�Z��C7�/�q�G�O~	�	�\_S������J���5��'�Վ׬#��4Wh:!!N��9 � P�qO�G��
o�R�-Wr0����QN%_%[��<��H�'�4�%���e�����4.`25����׾���|���v�8'�������� 7���:������e7     