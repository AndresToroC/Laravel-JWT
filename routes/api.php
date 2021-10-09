<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\http\Controllers\Api\AuthController;
use App\http\Controllers\Api\UserController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->prefix('auth')->group(function() {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refreshToken', [AuthController::class, 'refreshToken']);
});

Route::middleware('auth')->group(function() {
});
Route::resource('users', UserController::class);