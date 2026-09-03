<?php

namespace App\Http\Resources;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'role' => $this->role,
            'project_date' => $this->project_date ? $this->project_date->format('F Y') : null,
            'github_url' => $this->github_url,
            'live_url' => $this->live_url,
            'thumbnail' => $this->thumbnail ? url('storage/' . $this->thumbnail) : null,
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
            'images' => $this->whenLoaded('images', function () {
                return $this->images->map(fn($img) => [
                    'url' => url('storage/' . $img->image_url),
                    'caption' => $img->caption
                ]);
            }),
        ];
    }
}
