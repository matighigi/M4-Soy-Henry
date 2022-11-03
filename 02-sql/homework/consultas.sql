-- 1. Buscá todas las películas filmadas en el año que naciste.
select * from movies where year = 1976 limit 10;

-- 2. Cuantas películas hay en la DB que sean del año 1982?
select count(*) from movies where year = 1982 limit 20;

-- 3. Buscá actores que tengan el substring stack en su apellido.
select * from actors where last_name like '%stack%';

-- 4. Buscá los 10 nombres y apellidos más populares entre los actores. Cuantos actores tienen cada uno de esos nombres y apellidos?
select first_name, last_name, count(*) as total 
from actors
group by lower(first_name), lower(last_name)
order by total desc
limit 10;

-- 5. Listá el top 100 de actores más activos junto con el número de roles que haya realizado.
-- actors -- roles
select a.first_name, a.last_name, count(*) as total_roles
from actors as a
join roles as r on a.id = r.actor_id
group by a.id
order by total_roles desc
limit 100;

-- 6. Cuantas películas tiene IMDB por género? Ordená la lista por el género menos popular.
-- movies_genres  --   genre
select genre, count(*) as total
from movies_genres
group by genre
order by total; -- lo dejamos asin pone ascendente

-- 7. Listá el nombre y apellido de todos los actores que trabajaron en la película "Braveheart" de 1995, ordená la lista alfabéticamente por apellido.
-- actors -- roles -- movies
select a.first_name, a.last_name
from actors as a -- traemos nombre y apellido de los actores
join roles as r on a.id = r.actor_id -- unimos roles con actores
join movies as m on r.movie_id = m.id -- unimos movies con roles
where m.name = 'Braveheart' and m.year = 1995 --solo de esta peli
order by a.last_name; -- no hace falta elñ ascendente xq es por default

-- 8. Listá todos los directores que dirigieron una película de género 'Film-Noir' en un año bisiesto (para reducir la complejidad, asumí que cualquier año divisible por cuatro es bisiesto). Tu consulta debería devolver el nombre del director, el nombre de la peli y el año. Todo ordenado por el nombre de la película.
-- directors -- movies_directors -- movies -- movies_genres
select d.first_name, d.last_name, m.name, m.year -- lo que necesitamos
from directors as d 
join movies_directors as md on md.director_id = d.id -- director unimos con movie_dir
join movies as m on m.id = md.movie_id --  movie_director con movie 
join movies_genres as mg on m.id = mg.movie_id -- movie con generos
where mg.genre = 'Film-Noir' and m.year % 4 = 0 -- las condiciones
order by m.name; -- ordenado por nombre

-- 9. Listá todos los actores que hayan trabajado con Kevin Bacon en películas de Drama (incluí el título de la peli). Excluí al señor Bacon de los resultados.
--usamos uns subQuery 
-- actors -- roles -- movies -- movies_genre
select m.id
from movies as m
join roles as r on m.id = r.movie_id
join actors as a on r.actor_id = a.id
where a.first_name = 'Kevin' and a.last_name = 'Bacon';

select distinct a.first_name, a.last_name, m.name
from actors as a 
join roles as r on a.id = r.actor_id
join movies as m on r.movie_id = m.id
join movies_genres as mg on m.id = mg.movie_id
where mg.genre = 'Drama' and m.id in (
    select m.id
from movies as m
join roles as r on m.id = r.movie_id
join actors as a on r.actor_id = a.id
where a.first_name = 'Kevin' and a.last_name = 'Bacon'
)
and (a.first_name || ' ' || a.last_name != 'Kevin Bacon')
order by a.last_name;

-- 10. Qué actores actuaron en una película antes de 1900 y también en una película después del 2000?
select r.actor_id
from roles as r
join movies as m on r.movie_id = m.id
where m.year < 1900 limit 20;

select * from actors
where id in (
   select r.actor_id
from roles as r
join movies as m on r.movie_id = m.id
where m.year < 1900 
) and id in (
    select r.actor_id
from roles as r
join movies as m on r.movie_id = m.id
where m.year > 2000
) limit 20;

-- 11. Buscá actores que actuaron en cinco o más roles en la misma película después del año 1990. Noten que los ROLES pueden tener duplicados ocasionales, sobre los cuales no estamos interesados: queremos actores que hayan tenido cinco o más roles DISTINTOS (DISTINCT cough cough) en la misma película. Escribí un query que retorne los nombres del actor, el título de la película y el número de roles (siempre debería ser > 5).
select  a.first_name, a.last_name, m.name, count(distinct (role)) as total_roles
from actors as a 
join roles as r on a.id = r.actor_id
join movies as m on r.movie_id = m.id
where m.year > 1990 
group by a.id, m.id
having total_roles > 5;

-- 12. Para cada año, contá el número de películas en ese años que sólo tuvieron actrices femeninas.
select r.movie_id
from roles as r
join actors as a on r.actor_id = a.id
where a.gender = 'M'

select year, count(id) as total
from movies
where id not in (
    select r.movie_id
from roles as r
join actors as a on r.actor_id = a.id
where a.gender = 'M'
)
group by year limit 30;