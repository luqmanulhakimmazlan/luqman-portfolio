<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        // Order by category first, then alphabetically by name
        return response()->json(Skill::orderBy('category')->orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
        ]);

        return response()->json(Skill::create($validated), 201);
    }

    public function show(Skill $skill)
    {
        return response()->json($skill);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
        ]);

        $skill->update($validated);
        return response()->json($skill);
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();
        return response()->json(['message' => 'Deleted']);
    }
}