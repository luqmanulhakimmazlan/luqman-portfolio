<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperienceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'company' => $this->company,
            'position' => $this->position,
            'location' => $this->location,
            'employment_type' => $this->employment_type,
            'start_date' => $this->start_date->format('M Y'),
            'end_date' => $this->end_date ? $this->end_date->format('M Y') : 'Present',
            'description' => $this->description,
            'logo' => $this->logo ? url('storage/' . $this->logo) : null,
        ];
    }
}
