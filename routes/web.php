<?php

use Illuminate\Support\Facades\Route;

Route::any('/{path?}', function () {
    return view('home');
})->where('path', '.*');
