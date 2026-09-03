<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->name,
            'headline' => $this->headline,
            'bio' => $this->bio,
            'profile_image' => $this->profile_image ? url('storage/' . $this->profile_image) : null,
            'resume_url' => $this->resume_url ? url('storage/' . $this->resume_url) : null,
            'email' => $this->email,
            'location' => $this->location,
        ];
    }
}
