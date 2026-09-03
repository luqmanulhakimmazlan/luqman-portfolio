<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Artisan;

Route::get('/create-symlink', function () {
    Artisan::call('storage:link');
    return 'Storage linked successfully!';
});

// 1. Session-based Authentication Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// 2. Catch-all route: Send all other web traffic to the React application
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::middleware('auth')->group(function () {
    Route::post('/change-password', [AuthController::class, 'changePassword']);
});