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

Route::get('/check-admin', function () {
    // 1. Find the user
    $user = User::where('email', 'luqmanulhakimmazlan@gmail.com')->first();
    
    // 2. If missing, create it
    if (!$user) {
        $user = User::create([
            'name' => 'Luqman',
            'email' => 'luqmanulhakimmazlan@gmail.com',
            'password' => Hash::make('password123')
        ]);
        return "User was missing, but is now created. Email: {$user->email} | Password: password123";
    }

    // 3. If it exists, force reset the password to guarantee we know what it is
    $user->password = Hash::make('password123');
    $user->save();

    return "User verified! Email: {$user->email} | Password has been forcefully reset to: password123";
});