<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = [
        'title', 'issuer', 'issue_date', 'expiry_date', 
        'credential_id', 'credential_url', 'image_url', 'description', 'sort_order'
    ];

    protected $casts = [
        'issue_date' => 'date',
        'expiry_date' => 'date',
    ];
}
