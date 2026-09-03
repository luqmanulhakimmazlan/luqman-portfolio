<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'short_description', 'description', 'role',
        'project_date', 'github_url', 'live_url', 'thumbnail', 
        'status', 'featured', 'sort_order'
    ];

    protected $casts = [
        'project_date' => 'date',
        'featured' => 'boolean',
    ];

    public function images()
    {
        return $this->hasMany(ProjectImage::class)->orderBy('sort_order');
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }
}
