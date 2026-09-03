<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// 1. Session-based Authentication Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// 2. Catch-all route: Send all other web traffic to the React application
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');