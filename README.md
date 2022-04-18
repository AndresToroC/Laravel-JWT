<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

Manual de instalación

El programa por lado del backend fue desarrollado en Laravel utilizando JWT y el frontend se
desarrolló con React JS.
La base de datos que se usa es sqlite.

## Requisitos del sistema
- php 7.4
- node 16.11
- npm 8.0.0

## Pasos para la instalación del proyecto
1. Clonar el proyecto del repositorio
git clone https://github.com/AndresToroC/Laravel-JWT.git
2. Ingresar a la carpeta Laravel-JWT
cd Laravel-JWT
3. Instalar composer
composer install
4. Copiar el archivo .env.example a .env
window: copy .env.example .env
Linux: cp .env.example .env
* Si esta en ubuntu debe de instalar: sudo apt-get install php-sqlite3
5. Generar clave
php artisan key:generate
6. Generar clave del JWT auth
php artisan jwt:secret
7. Ejecutar migraciones y seeders
php artisan migrate --seed
8. Ejecutar el programa con:
php artisan serve
