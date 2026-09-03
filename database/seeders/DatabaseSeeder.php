<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\SocialLink;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create the single Admin User
        User::create([
            'name' => 'Luqmanul Hakim',
            'email' => 'admin@luqman.test', // Change this in production
            'password' => Hash::make('password123'), // Secure this later
        ]);

        // 2. Profile Data
        Profile::create([
            'name' => 'Luqmanul Hakim',
            'headline' => 'Creative Developer & Graphics Software Engineer',
            'bio' => 'I build digital experiences and practical software solutions. Recent Computer Science graduate specializing in Graphics Software and Multimedia.',
            'email' => 'contact@example.com',
            'location' => 'Malaysia',
        ]);

        // 3. Skills
        $skills = [
            ['name' => 'React', 'category' => 'Frontend'],
            ['name' => 'Laravel', 'category' => 'Backend'],
            ['name' => 'Unity', 'category' => 'Creative'],
            ['name' => 'C#', 'category' => 'Languages'],
            ['name' => 'Python', 'category' => 'Languages'],
            ['name' => 'SQLite', 'category' => 'Database'],
        ];

        $skillModels = [];
        foreach ($skills as $skill) {
            $skillModels[$skill['name']] = Skill::create($skill);
        }

        // 4. Flagship Project: Thesis
        $thesis = Project::create([
            'title' => 'Adaptive Hiragana Stroke Learning System',
            'slug' => Str::slug('Adaptive Hiragana Stroke Learning System'),
            'short_description' => 'An investigation into adaptive UI design for Japanese stroke order learning using Rule-Based AI.',
            'description' => "This thesis project explores adaptive UI/UX utilizing rule-based AI. The system dynamically adjusts hint usage and UI complexity based on user stroke error frequency and task completion time. Validated using A/B testing, SUS (System Usability Scale), UES, and NASA-TLX methodologies.",
            'role' => 'Lead Researcher & Developer',
            'project_date' => '2025-11-01',
            'status' => 'published',
            'featured' => true,
        ]);

        // Attach skills to thesis
        $thesis->skills()->attach([
            $skillModels['Unity']->id,
            $skillModels['C#']->id,
            $skillModels['Python']->id
        ]);

        // 5. Additional Placeholder Project
        $venueProject = Project::create([
            'title' => 'Venue Management System',
            'slug' => Str::slug('Venue Management System'),
            'short_description' => 'A full-stack resource booking and venue management solution.',
            'description' => 'Developed a comprehensive venue management system handling scheduling, conflict resolution, and resource allocation.',
            'role' => 'Full-Stack Developer',
            'project_date' => '2024-06-01',
            'status' => 'published',
            'featured' => true,
        ]);

        $venueProject->skills()->attach([
            $skillModels['Laravel']->id,
            $skillModels['React']->id,
            $skillModels['SQLite']->id
        ]);

        // 6. Experience
        Experience::create([
            'company' => 'Tech Solutions Sdn Bhd',
            'position' => 'Programmer Internship',
            'location' => 'Kuala Lumpur, Malaysia',
            'employment_type' => 'Internship',
            'start_date' => '2023-05-01',
            'end_date' => '2023-08-31',
            'description' => 'Assisted in developing and maintaining web applications. Participated in UI/UX redesigns and database optimization tasks.',
        ]);

        // 7. Social Links
        SocialLink::insert([
            ['platform' => 'GitHub', 'label' => 'GitHub', 'url' => 'https://github.com/luqman', 'sort_order' => 1],
            ['platform' => 'LinkedIn', 'label' => 'LinkedIn', 'url' => 'https://linkedin.com/in/luqman', 'sort_order' => 2],
        ]);
    }
}
