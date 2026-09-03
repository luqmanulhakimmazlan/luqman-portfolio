<?php

use Illuminate\Support\Facades\Route;

// Public Endpoints
Route::prefix('public')->group(function () {
    Route::get('/profile', [\App\Http\Controllers\Api\PublicApiController::class, 'profile']);
    Route::get('/projects', [\App\Http\Controllers\Api\PublicApiController::class, 'projects']);
    Route::get('/projects/{slug}', [\App\Http\Controllers\Api\PublicApiController::class, 'projectDetail']);
    Route::get('/experiences', [\App\Http\Controllers\Api\PublicApiController::class, 'experiences']);
    Route::get('/certificates', [\App\Http\Controllers\Api\PublicApiController::class, 'certificates']);
    Route::get('/skills', [\App\Http\Controllers\Api\PublicApiController::class, 'skills']);
    Route::get('/social-links', [\App\Http\Controllers\Api\PublicApiController::class, 'socialLinks']);
});

// Protected Admin Endpoints
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/user', [\App\Http\Controllers\Api\AuthController::class, 'user']);
    
    // Project CMS
    Route::apiResource('projects', \App\Http\Controllers\Api\Admin\ProjectController::class);
    
    // Experience CMS
    Route::apiResource('experiences', \App\Http\Controllers\Api\Admin\ExperienceController::class);

    // Experience CMS
    Route::apiResource('experiences', \App\Http\Controllers\Api\Admin\ExperienceController::class);
    
    // Skills CMS
    Route::apiResource('skills', \App\Http\Controllers\Api\Admin\SkillController::class);
});