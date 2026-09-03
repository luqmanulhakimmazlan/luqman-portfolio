<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'short_description' => $this->short_description,
            'thumbnail' => $this->thumbnail,
            'project_date' => $this->project_date ? $this->project_date->format('M Y') : null,
            'featured' => $this->featured,
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
        ];
    }
}