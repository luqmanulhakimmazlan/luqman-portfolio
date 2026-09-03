<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    public function index()
    {
        return response()->json(Experience::orderBy('start_date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'start_date' => 'required|string|max:255',
            'end_date' => 'nullable|string|max:255',
            'description' => 'required|string',
            'order' => 'integer'
        ]);

        return response()->json(Experience::create($validated), 201);
    }

    public function show(Experience $experience)
    {
        return response()->json($experience);
    }

    public function update(Request $request, Experience $experience)
    {
        $validated = $request->validate([
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'start_date' => 'required|string|max:255',
            'end_date' => 'nullable|string|max:255',
            'description' => 'required|string',
            'order' => 'integer'
        ]);

        $experience->update($validated);
        return response()->json($experience);
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return response()->json(['message' => 'Deleted']);
    }
}