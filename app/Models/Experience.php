<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = [
        'company', 'position', 'location', 'employment_type', 
        'start_date', 'end_date', 'description', 'logo', 'sort_order'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}