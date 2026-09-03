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

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;

Route::get('/setup-production-db', function () {
    // 1. If you have Seeders, this will run them:
    Artisan::call('db:seed', ['--force' => true]);

    // 2. This will ensure your Admin account is created so you can log into the CMS:
    if (!User::where('email', 'luqmanulhakimmazlan@gmail.com')->exists()) {
        User::create([
            'name' => 'Luqman',
            'email' => 'luqmanulhakimmazlan@gmail.com',
            'password' => Hash::make('password123') // Change this later in your CMS!
        ]);
    }

    return 'Database seeded and Admin user created successfully!';
});