<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

// 1. Session-based Authentication Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// 2. DIAGNOSTIC ROUTE (Must be ABOVE the catch-all)
Route::get('/check-admin', function () {
    $user = User::where('email', 'luqmanulhakimmazlan@gmail.com')->first();
    
    if (!$user) {
        $user = User::create([
            'name' => 'Luqman',
            'email' => 'luqmanulhakimmazlan@gmail.com',
            'password' => Hash::make('password123')
        ]);
        return "User was missing, but is now created. Email: {$user->email} | Password: password123";
    }

    $user->password = Hash::make('password123');
    $user->save();

    return "User verified! Email: {$user->email} | Password has been forcefully reset to: password123";
});

// 3. Catch-all route (Must always be at the VERY BOTTOM)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');