<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Skill;
use Illuminate\Http\Request;

class PublicApiController extends Controller
{
    public function projects()
    {
        return response()->json(Project::where('status', 'published')->orderBy('created_at', 'desc')->get());
    }

    public function projectDetail($slug)
    {
        // Finds the specific project by slug, or returns a 404 error if it doesn't exist
        $project = Project::where('slug', $slug)->where('status', 'published')->firstOrFail();
        return response()->json($project);
    }

    public function experiences()
    {
        return response()->json(Experience::orderBy('start_date', 'desc')->get());
    }

    public function skills()
    {
        return response()->json(Skill::orderBy('category')->orderBy('name')->get());
    }
}