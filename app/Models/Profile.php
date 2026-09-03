<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name', 'headline', 'bio', 'profile_image', 'resume_url', 'email', 'location'
    ];
}
