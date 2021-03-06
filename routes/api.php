<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ClientController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->prefix('auth')->group(function() {
    Route::post('login', [AuthController::class, 'login']);
    Route::get('authAdmin', [AuthController::class, 'authAdmin']);
    Route::get('authVendedor', [AuthController::class, 'authVendedor']);

    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refreshToken', [AuthController::class, 'refreshToken']);
});

Route::middleware('auth')->group(function() {
    Route::resource('users', UserController::class)->except(['create', 'show']);
    Route::resource('clients', ClientController::class)->except(['create', 'show']);
});